import { Session } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";
interface SubscribeButtonProps {
  priceId: string;
}
interface ISessions extends Session {
  activeSubscription: string | null;
}
export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data } = useSession();
  const router = useRouter();
  const session = data as ISessions;

  async function handleSbscribe() {
    if (!session.activeSubscription) {
      signIn("github");
      return;
    }

    if (session.activeSubscription) {
      router.push("/posts");
      return;
    }

    try {
      const { data } = await api.post("/subscribe");

      const { sessionId } = data;
      const stripe = await getStripeJs();
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      alert(error);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSbscribe}
    >
      Subscrime now
    </button>
  );
}
