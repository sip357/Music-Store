'use client';

import React, { useState } from "react";
import Layout from "../components/layout";
import styles from "./Signup.module.css";

function ValidateEmail(email: string): boolean {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validRegex.test(email);
}

const Home: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const createUser = async () => {
    await fetch('/api', {
      method: 'POST',
      body: JSON.stringify({ name, email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  if(name.length <= 3 || !ValidateEmail(email)){
    var isButtondisabled = true;
  } else{
    var isButtondisabled = false;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(name.length <= 3 || !name){
      setError('Name is required to create a user');
      return;
    }
    if (!email) {
      setError('Email is required to create a user');
      return;
    }
    if (!ValidateEmail(email)) {
      setError('Invalid email address');
      return;
    }
    setError(''); // Clear any existing error
    createUser();
  };

  return (
    <Layout>
      <div className={`${styles.div} ${styles.mg_auto}`}>
        <form onSubmit={handleSubmit} className={`${styles.twopb}`}>
          <div className={`${styles.twopb}`}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter a name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.inputField}`}
              required
            />
          </div>
          <div className={`${styles.twopb}`}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.inputField}`}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className={`${styles.twopb} ${styles.text_align_center}`}>
            <button type="submit" disabled={isButtondisabled} className={`${styles.button_3}`}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Home;
