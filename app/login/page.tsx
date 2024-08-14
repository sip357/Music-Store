'use client';

import React, { useState } from "react";
import Layout from "../components/layout";
import styles from "../login/login.module.css";
import { useRouter } from "next/navigation";

function ValidateEmail(email: string): boolean {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validRegex.test(email);
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const checkHash = async () => {
    try {
      const response = await fetch("/api/authen", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        router.push("/store");
      } else {
        const data = await response.json();
        if (response.status === 403) {
          setError("Invalid password");
        } else if (response.status === 404) {
          setError("User not found");
        } else {
          setError(data.error || "Unknown error occurred");
        }
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setError("Internal server error");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!ValidateEmail(email)) {
      setError("Invalid email address");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    setError(null); // Clear previous errors
    checkHash();
  };

  return (
    <Layout>
      <div className={`${styles.div} ${styles.mg_auto} ${styles.padding_top}`}>
        <form onSubmit={handleSubmit}>
          <div className={styles.twopb}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.twopb}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className={`${styles.twopb} ${styles.text_align_center}`}>
            <button type="submit" className={styles.button_3}>
              Login
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
