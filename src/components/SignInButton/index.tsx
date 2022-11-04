import React from "react";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";

export const SignInButton = () => {
  const isUserLoggedIn = true;

  return isUserLoggedIn ? (
    <button type="button" title="SignInButton" className={styles.signInButton}>
      <FaGithub color="#04d361" />
      User name
      <FiX color="#737380" className={styles.closeIcon}/>
    </button>
  ) : (
    <button type="button" title="SignInButton" className={styles.signInButton}>
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
};
