'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../components/layout";
import styles from "./Signup.module.css";
import PurpleButton from "../components/purpleButton";

function ValidateEmail(email: string): boolean {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validRegex.test(email);
}

// function ValidatePassword(password: string): boolean{
//   const validRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+$/;
//   return validRegex.test(password);
// }

const Home: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (name.length <= 3) {
      setError("Name must be longer than 3 characters");
      setIsButtonDisabled(true);
    } else if (!ValidateEmail(email)) {
      setError("Invalid email address");
      setIsButtonDisabled(true);
    } else if (password.length <= 10) {
      setError("Password must be longer than 10 characters");
      setIsButtonDisabled(true);
    } else {
      setError("");
      setIsButtonDisabled(false);
    }
    if(name.length <= 3 || !ValidateEmail(email) || !password || password.length <= 10){
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [name, email, password]);

  const createUser = async () => {
    try {
      const response = await fetch('/api/userAPI', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response.ok){
        setError(''); // Clear any existing error
        router.push('/login');
      } else{
        const data = await response.json();
        setError(data.message || 'Error creating user')
      }
    } catch (error) {
      setError('Error creating user');
    }
  }

  //Used to get all the users
  const getUsers = async () => {
    const response = await fetch('/api/userAPI', {
      method: 'GET',
    })
  }

  function userExists(uname: string, mail: string) : boolean{
    if(uname === name){

    }
    return false;
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
    if(!password){
      setError("Enter password");
      return;
    }
    setError(''); // Clear any existing error
    createUser();
  };

  return (
    <Layout>
      <div className={`${styles.div} ${styles.mg_auto} ${styles.padding_top}`}>
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
          <div className={`${styles.twopb}`}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${styles.inputField}`}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className={`${styles.twopb} ${styles.text_align_center}`}>
            <PurpleButton param1="Sign up" param2={isButtonDisabled}/>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Home;
