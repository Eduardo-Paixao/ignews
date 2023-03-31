import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { RichText } from "prismic-dom";
import { ParsedUrlQuery } from "querystring";
import { getPrismicClient } from "../../services/prismic";

import styles from './post.module.scss'

interface IParams extends ParsedUrlQuery {
  slug: string;
}

type IContent = {
  type?: string;
  text?: string;
};
interface IPostData {
  title: string;
  content: IContent[];
  last_publication_date: string | number | Date;
}

interface Post {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    updatedAt: string;
  };
}

interface ISessions extends Session{
  activeSubscription: string | null;
}

export default function Post({ post }: Post) {
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div dangerouslySetInnerHTML={{ __html: post.content }} className={styles.postContent} />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req }) as ISessions;
  const { slug } = params as IParams;

  if (!session?.activeSubscription) {
    return{
      redirect:{
        destination:`/posts/preview/${slug}`,
        permanent:false
      }
    }
  }

  const prismic = getPrismicClient(req);
  const response = await prismic.getByUID<IPostData>("publication", slug, {});

  const post = {
    slug,
    title: response.data.title,
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date!).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };
  return {
    props: { post },
  };
};