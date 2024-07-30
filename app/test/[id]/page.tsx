import React from "react"
import Layout from "../../components/layout";
import { get } from "mongoose";

export async function generateStaticParams() {
  try {
    const res = await fetch('http://localhost:3000/api/beatsAPI');
    const products = await res.json();

    return products.map(product => ({
      id: product.id,
    }));
  } catch (error) {
    console.error('Error fetching product IDs:', error);
    return [];
  }
}

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
      <div>
        Id: {beat._id}
      </div>
      <div>
        Title: {beat.Title}
      </div>
      
    </Layout>
  );
}