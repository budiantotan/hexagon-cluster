import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Controls from '../client/components/Controls';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Hexagonal Cluster</title>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.leftContainer}>
          <Controls />
        </div>
        <div className={styles.rightContainer}>right</div>
      </main>
    </div>
  );
}
