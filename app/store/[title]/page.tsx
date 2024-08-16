//I have to create the cart on the database because this can only be client side.
import { GetStaticPropsContext } from "next";
import React from "react"
import "../../../public/studio.jpg"
import Layout from '../../components/layout';
import Product from "../../components/product";
import Beat from "../../types/beatType";
import styles from '../../styles/product.module.css';

async function fetchBeatData(title: string) {
  const res = await fetch(`http://localhost:3000/api/products/${title}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function getBeats(){
  const res = await fetch("http://localhost:3000/api/beatsAPI", {
    //next: { revalidate: 60 }, // Revalidate every 60 seconds
  })

  if(!res.ok){
    throw new Error("Failed to fetch data")
  }

  return res.json();
}

export async function generateStaticParams() {
    const beats = await getBeats();

    // Generate a list of paths with `id` as the parameter
    return beats.map((beat: { Title: string }) => ({
      title: beat.Title,
  }));
}

export default async function ProductPage({ params }: GetStaticPropsContext<{ title: string }>) {
  const { title } = params;
  await fetchBeatData(title);
  const beat = await fetchBeatData(title);

  if (!beat) {
    console.error("Beat doesn't exist");
    return (
      <Layout>
        <div>Error loading product</div>
      </Layout>
    );
  }
  
  var realPrice = [];

  // const [selectedPrice, setSelectedPrice] = useState<number>(10);
  //problems arises due to no state management in 

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

    realPrice.push(price);
    // setSelectedPrice(price);
  };

  return (
    <Layout>
        <div className={`${styles.imageContainer} ${styles.padding_top}`}>
            <img src="\studio.jpg" alt="picture" className={`${styles.productImage}`} />
            <div className="onep">
                <select
                  name="Pick Lease"
                  id="SelectLease"
                  className={`${styles.select} ${styles.button_31}`}
                  // onChange={handleSelectChange}
                  //CHANGE: Due to complexity, the model will now change to only 'Lease' and 'Exlusive
                  //Lease: 10-20 USD (may be different)
                  //Exclusive will have a separate 
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
            {beat.Title}
          </div>
          <div className={`${styles.details}`}>
            {beat.BPM} BPM
          </div>
          <div className={`${styles.details}`}>
            {realPrice[0]}
          </div>
          <div className={`${styles.details} ${styles.tagContainer}`}>
            {beat.Tags.map((tag) => 
              <span className={`${styles.onep}`} key={tag}>
                <button className={`${styles.button_34}`}>{tag}</button>
              </span>
            )}
          </div>
          <div className={styles.addToCart}>
            <button
              type="submit"
              className={styles.addToCart}
              // onClick={() => handleAddToCart(select, beat._id)}
            >
              Add to Cart
            </button>
          </div>
        </div>
    </Layout>
  );

  // return (
  //   <Layout>
  //     <Product beat={beat}/>
  //   </Layout>
  // );
}
