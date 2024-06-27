import React from 'react';
import Layout from "../components/layout";
import styles from '../styles/Store.module.css';
import NavBar from '../components/NavBar';

const Store: React.FC = () => {
  return (
    <Layout>
      <NavBar />
      <div className={styles.container}>
        <h1>Welcome to the Store</h1>
        <p>Browse through our selection of beats and sound kits.</p>
      </div>
      <div className={styles.productsContainer}>
        <div className={styles.product}>
          <p className={styles.productName}>Beat 1</p>
        </div>
        <div className={styles.product}>
          <p className={styles.productName}>Beat 2</p>
        </div>
        <div className={styles.product}>
          <p className={styles.productName}>Beat 3</p>
        </div>
      </div>
    </Layout>
  );
};

export default Store;
