import { signIn, useSession } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";
interface SubscribeButtonProps {
  priceId: string;
}
export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data } = useSession();

  async function handleSbscribe() {
    if (!data) {
      signIn("github");
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
