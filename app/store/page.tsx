import React from 'react';
import Layout from "../components/layout";
import styles from '../styles/Store.module.css';

const Store: React.FC = () => {
  return (
    <Layout>
      <div className={`${styles.div} ${styles.mainContainer} ${styles.fivep}`}>
        <h1 className={styles.divH1}>Welcome to the Store</h1>
        <p className={styles.divP}>Browse through our selection of beats and sound kits.</p>
      </div>
      <div className={styles.productsContainer}>
        <div className={styles.product}>
          <p className={styles.productName}>Beat 1</p>
        </div>
      </div>
    </Layout>
  );
};

export default Store;
