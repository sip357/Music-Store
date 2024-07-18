'use client';

import React from 'react';
import Layout from "../components/layout";
import styles from "./Store.module.css";
import SearchBox from '../components/searchBox';
import "../styles/globals.css";



const Store: React.FC = () => {
  return (
    <Layout>
      <div className={`${styles.twopb} ${styles.secondNavContainer}`}>
        <button className={`${styles.paraFonts} ${styles.prodTypes}`}>Instrumentals</button>
        <button className={`${styles.paraFonts} ${styles.prodTypes}`}>Sound Kits</button>
      </div>
      <div><SearchBox /></div>
      <div className={`${styles.twopb} ${styles.mainContainer}`}>
        <span className={styles.onep}><button className={styles.button_34} role="button">Emo</button></span>
        <span className={styles.onep}><button className={styles.button_34} role="button">Guitar</button></span>
        <span className={styles.onep}><button className={styles.button_34} role="button">LoFi</button></span>
        <span className={styles.onep}><button className={styles.button_34} role="button">Pop Punk</button></span>
        <span className={styles.onep}><button className={styles.button_34} role="button">Trap</button></span>
        <span className={styles.onep}><button className={styles.button_34} role="button">Pop</button></span>
        <span className={styles.onep}><button className={styles.button_34} role="button">Piano</button></span>
      </div>
      <section className={styles.fourpb}>
        <div className={styles.productsContainer}>
          <div className={styles.product}>
            <img src="studio.jpg" alt="picture" className={styles.productImage}/>
            <a href="/" className={`${styles.productName} ${styles.a}`}>Euphoria</a>
            <div className={styles.iconContainer}>
              <span className={styles.playB}>
                <span className={styles.gg_play_button}></span>
              </span>
              <span className={styles.spc}>
              </span>
            </div>
          </div>
        </div>
      </section>
      
    </Layout>
  );
};

export default Store;
