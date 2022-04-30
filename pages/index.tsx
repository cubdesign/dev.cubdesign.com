import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>dev.cubdesign.com</title>
        <meta name="description" content="dev.cubdesign.com" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/static/favicon/site.webmanifest" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to dev.cubdesign.com</h1>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://cubdesign.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image
              src="/static/cubdesign-logo-circle.png"
              alt="cubdesign Logo"
              width={16}
              height={16}
            />
          </span>
          cubdesign
        </a>
      </footer>
    </div>
  );
};

export default Home;
