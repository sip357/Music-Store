import React from "react"
import Layout from "../../components/layout"
import styles from "../[id]/detail.module.css";

async function fetchBeatData(id) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function ProductPage({ params }) {
  const { id } = params;
  await fetchBeatData(id);
  // const beat: Beat[] = await fetchBeatData(id);
  const beat = await fetchBeatData(id);

  if (!beat) {
    console.error("Beat doesn't exist");
    return (
      <Layout>
        <div>Error loading product</div>
      </Layout>
    );
  }
  //console.log(beat.Audio)
  
  return (
    <Layout>
      <div className={`${styles.detailContainer}`}>
        <div className={`${styles.title}`}>
          {beat.Title}
        </div>
        <div className={`${styles.details}`}>
          BPM: {beat.BPM}
        </div>
        <div className={`${styles.details} ${styles.tagContainer}`}>
          {beat.Tags.map((tag) => 
          <span className={`${styles.onep}`} key={tag.id}><button className={`${styles.button_34}`}>{tag}</button></span>
          )}
        </div>
        <select name="Pick Lease" id="SelectLease">
          <option value="First Form">First Form</option>
          <option value="Second Form">Second Form</option>
          <option value="Third Form">Third Form</option>
          <option value="Exclusive">Exclusive</option>
        </select>
        <span className={styles.addToCart}>
          <button className={styles.addToCart}>
            Add to Cart
          </button>
        </span>
      </div>
      
      <div className={`${styles.imageContainer} ${styles.padding_top}`}>
        Image
      </div>
      <div>
        Title: {beat.Title}
      </div>
      
    </Layout>
  );
}