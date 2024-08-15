// components/ProductClientComponent.tsx
"use client";

import React, { useState } from 'react';
import Beat from '../types/beatType';
import Layout from './layout';
import styles from '../styles/product.module.css';

interface ProductProps{
    beat: Beat;
}

const Product: React.FC <ProductProps> = (props: ProductProps) =>{
    const [selectedPrice, setSelectedPrice] = useState<number>(10);

  const handleAddToCart = async (chosenPrice: number, productId: string) => {
    const res = await fetch('/api/add-to-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chosenPrice, productId }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log('Cart updated:', data.cart);
    } else {
      console.error('Failed to add item to cart');
    }
  };

  console.log(props);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    let price = 10; // Default price

    if (value === "Second Form") {
      price = 13;
    } else if (value === "Third Form") {
      price = 15; // Example price for "Third Form"
    } else if (value === "Exclusive") {
      price = 20; // Example price for "Exclusive"
    }

    setSelectedPrice(price);
  };

  return (
    <div>
        <div className={`${styles.imageContainer} ${styles.padding_top}`}>
            <img src="\studio.jpg" alt="picture" className={`${styles.productImage}`} />
            <div className="onep">
                <select
                  name="Pick Lease"
                  id="SelectLease"
                  className={`${styles.select} ${styles.button_31}`}
                  onChange={handleSelectChange}
                >
                    <option value="First Form">First Form</option>
                    <option value="Second Form">Second Form</option>
                    <option value="Third Form">Third Form</option>
                    <option value="Exclusive">Exclusive</option>
                </select>
            </div>
        </div> 
        <div className={`${styles.detailContainer}`}>
          <div className={`${styles.songTitle}`}>
            {props.beat.Title}
          </div>
          <div className={`${styles.details}`}>
            {props.beat.BPM} BPM
          </div>
          <div className={`${styles.details}`}>
            {selectedPrice}
          </div>
          <div className={`${styles.details} ${styles.tagContainer}`}>
            {props.beat.Tags.map((tag) => 
              <span className={`${styles.onep}`} key={tag}>
                <button className={`${styles.button_34}`}>{tag}</button>
              </span>
            )}
          </div>
          <div className={styles.addToCart}>
            <button
              className={styles.addToCart}
              onClick={() => handleAddToCart(selectedPrice, props.beat._id)}
            >
              Add to Cart
            </button>
          </div>
        </div>
    </div>
  );
};

export default Product;

// export default function ProductClientComponent({ beat }: { beat: Beat }) {
//   const [selectedPrice, setSelectedPrice] = useState<number>(10);

//   const handleAddToCart = async (chosenPrice: number, productId: string) => {
//     const res = await fetch('/api/add-to-cart', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ chosenPrice, productId }),
//     });

//     if (res.ok) {
//       const data = await res.json();
//       console.log('Cart updated:', data.cart);
//     } else {
//       console.error('Failed to add item to cart');
//     }
//   };

//   const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = event.target.value;
//     let price = 10; // Default price

//     if (value === "Second Form") {
//       price = 13;
//     } else if (value === "Third Form") {
//       price = 15; // Example price for "Third Form"
//     } else if (value === "Exclusive") {
//       price = 20; // Example price for "Exclusive"
//     }

//     setSelectedPrice(price);
//   };

//   return (
//     <Layout>
//         <div className={`${styles.imageContainer} ${styles.padding_top}`}>
//             <img src="\studio.jpg" alt="picture" className={`${styles.productImage}`} />
//             <div className="onep">
//                 <select
//                   name="Pick Lease"
//                   id="SelectLease"
//                   className={`${styles.select} ${styles.button_31}`}
//                   onChange={handleSelectChange}
//                 >
//                     <option value="First Form">First Form</option>
//                     <option value="Second Form">Second Form</option>
//                     <option value="Third Form">Third Form</option>
//                     <option value="Exclusive">Exclusive</option>
//                 </select>
//             </div>
//         </div> 
//         <div className={`${styles.detailContainer}`}>
//           <div className={`${styles.songTitle}`}>
//             {beat.Title}
//           </div>
//           <div className={`${styles.details}`}>
//             {beat.BPM} BPM
//           </div>
//           <div className={`${styles.details}`}>
//             {selectedPrice}
//           </div>
//           <div className={`${styles.details} ${styles.tagContainer}`}>
//             {beat.Tags.map((tag) => 
//               <span className={`${styles.onep}`} key={tag}>
//                 <button className={`${styles.button_34}`}>{tag}</button>
//               </span>
//             )}
//           </div>
//           <div className={styles.addToCart}>
//             <button
//               className={styles.addToCart}
//               onClick={() => handleAddToCart(selectedPrice, beat._id)}
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//     </Layout>
//   );
// }
