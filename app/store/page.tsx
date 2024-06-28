import React from 'react';
import Layout from "../components/layout";
import styles from '../styles/Store.module.css';

const Store: React.FC = () => {
  return (
    <Layout>
      <section className={styles.body}>
        <div className={`${styles.fourpi} ${styles.container}`}>
        <span className={styles.onep}><button className={styles.button_34} role="button">Instrumentals</button></span>
        <span className={styles.onep}><button className={styles.button_34} role="button">Soundkits</button></span>
      </div>
      <div className={`${styles.div} ${styles.container} ${styles.fourpi}`}>
        <p className={styles.divP}>Browse through our selection of beats and sound kits.</p>
      </div>
      <div className={styles.productsContainer}>
        <div className={styles.product}>
          <p className={styles.productName}>Beat 1</p>
        </div>
      </div>
      </section>
    </Layout>
  );
};

export default Store;
