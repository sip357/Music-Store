import React from 'react';
import Layout from "../components/layout";
import styles from "./Store.module.css";
import SearchBox from '../components/searchBox';
import Beat from '../types/beatType';

async function getBeats(){
  const res = await fetch("http://localhost:3000/api/beatsAPI", {
    //next: { revalidate: 60 }, // Revalidate every 60 seconds
  })

  if(!res.ok){
    throw new Error("Failed to fetch data")
  }

  return res.json();
}

export default async function Store() {
    // const response = await fetch("http://localhost:3000/api")


    await getBeats();
    // if(!response.ok){
    //   throw new Error(`Response status: ${response.status}`)
    // }

    const beats: Beat[] = await getBeats();
  

  return (
    <Layout>
      <div className={`${styles.twopb} ${styles.secondNavContainer} ${styles.padding_top}`}>
        <button className={`${styles.paraFonts} ${styles.productTypes}`}>Instrumentals</button>
        <button className={`${styles.paraFonts} ${styles.productTypes}`}>Sound Kits</button>
      </div>
      <div >
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
      <div className={`${styles.flexContainer} ${styles.fourpb}`}>
        {beats.map(beatObj =>
        <div key={beatObj._id} className={`${styles.productsContainer}`}>
          <div className={`${styles.product}`}>
            <img src="studio.jpg" alt="picture" className={styles.productImage}/>
              <a href={`/store/${beatObj._id}`} key={beatObj._id.toString()} 
              className={`${styles.productName} ${styles.a}`}>
                {beatObj.Title}
              </a>
            <div className={styles.iconContainer}>
              <span className={styles.playB}>
                <span className={styles.gg_play_button}></span>
              </span>
              <span key={beatObj._id.toString()}>
                {beatObj.BPM}
              </span>
            </div>
          </div>
        </div>
        )} 
      </div>
      
    </Layout>
  );
};

