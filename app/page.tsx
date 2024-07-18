'use client';
import Layout from "./layout";
import App from "next/app";


export default function Home() {
  const callApi = async () =>{
    await fetch('/api/users/route', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }
  return (
    <div>
      <h1>Welcome to my Music Store</h1>
      <p>Discover a variety of beats at unbeatable prices</p>
      <button onClick={callApi}>Call API</button>
    </div>
  );
}


