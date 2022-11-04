import React, { useState } from "react";
import { SignInButton } from "../SignInButton";

import styles from "./styles.module.scss";

export const Header = () => {
  const [selectedPage, setSelectedPage] = useState("");


  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <a
            href="#"
            className={selectedPage==='Home'?styles.active:''}
            onClick={() => setSelectedPage("Home")}
          >
            Home
          </a>
          <a
            href="#"
            className={selectedPage==='Posts'?styles.active:''}
            onClick={() => setSelectedPage("Posts")}
          >
            Posts
          </a>
        </nav>
        <SignInButton/>
      </div>
    </header>
  );
};
