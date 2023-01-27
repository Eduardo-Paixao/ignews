import { signIn, useSession } from "next-auth/react";
import styles from "./styles.module.scss";
interface SubscribeButtonProps {
  priceId: string;
}
export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data } = useSession();

  function handleSbscribe() {
    if (!data) {
      signIn("github");
      return;
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
