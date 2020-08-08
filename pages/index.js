import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Controls from '../client/components/Controls';
import ClusterRenderer from '../client/components/ClusterRenderer';
import ClusterProvider from '../client/context/ClusterContext';

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
        <ClusterProvider>
          <div className={styles.leftContainer}>
            <Controls />
          </div>
          <div className={styles.rightContainer}>
            <ClusterRenderer />
          </div>
        </ClusterProvider>
      </main>
    </div>
  );
}
