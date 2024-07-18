'use client';

import React, { useState } from "react";
import Layout from "../components/layout";
import styles from "./Signup.module.css";
import "../styles/globals.css";

function ValidateEmail(input) {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (input.value.match(validRegex)) {
    alert("Valid email address!");
    return true;
  } else {
    alert("Invalid email address!");
    return false;
  }

}

const Home: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const createUser = async () => {
      const response = await fetch('/api', {
        method: 'POST',
        body: JSON.stringify({ name, email }),
      });
    }

  return (
    <Layout>
      <div className={`${styles.div} ${styles.mg_auto}`}>
        <form className={`${styles.twopb}`}>
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
          <div className={`${styles.twopb} ${styles.text_align_center}`}>
            <button type="submit" onClick={createUser} className={`${styles.button_3}`}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Home;
