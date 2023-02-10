import Head from "next/head";
import React from "react";

import { GetStaticProps } from "next";
import Prismic from "@prismicio/client";
import { getPrismicClient } from "../../services/prismic";

import styles from "./styles.module.scss";

type IContent = {
  type?: string;
  text?:string;
};
interface IPostData {
  title: string;
  content: IContent[];
  last_publication_date: string | number | Date;
}
type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
}

export default function posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <a key={post.slug} href="#">
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query<IPostData>(
    [Prismic.predicates.at("document.type", "publication")],
    {
      fetch: ["publication.title", "publication.content"],
      pageSize: 100,
    }
  );

  console.log(JSON.stringify(response,null,2))

  const posts = response.results.map((post) => {
    return {
      slug: post.id,
      title: post.data.title,
      excerpt:
        post.data.content.find(
          (content: IContent) => content.type === "paragraph"
        )?.text ?? "",
      updatedAt: new Date(post.last_publication_date!).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: { posts },
  };
};
