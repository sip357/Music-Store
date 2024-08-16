'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../components/layout";
import styles from "./Signup.module.css";
import PurpleButton from "../components/purpleButton";
import "../styles/globals.css";

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
  const [nameError, setNameError] = useState<string>(''); 
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');  
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    let isValid = true;
  
    if (name.length <= 3) {
      setNameError("Name must be longer than 3 characters");
      isValid = false;
    } else {
      setNameError(""); // Clear name error if validation passes
    }
  
    if (!ValidateEmail(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError(""); // Clear email error if validation passes
    }
  
    if (password.length <= 10) {
      setPasswordError("Password must be longer than 10 characters");
      isValid = false;
    } else {
      setPasswordError(""); // Clear password error if validation passes
    }
  
    setIsButtonDisabled(!isValid); // Enable button if all validations pass
    setError(""); // Clear general error if specific errors are handled
  
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

// Used to get all the users
const getUsers = async () => {
  const response = await fetch('/api/userAPI', {
    method: 'GET',
  });
  return response.json();
}

async function userExists(): Promise<boolean> {
  const users = await getUsers();

  // Check if any user matches the given username or email
  return users.some((user: { name: string; email: string }) => 
    user.name === name || user.email === email
  );
}

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  
  if (name.length <= 3 || !name) {
    setError('Name is required and must be longer than 3 characters');
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

  if (!password) {
    setError('Enter a password');
    return;
  }

  // Check if the user already exists asynchronously
  const exists = await userExists();
  if (exists) {
    setError('User already exists');
    return;
  }

  setError(''); // Clear any existing error
  createUser(); // Call your createUser function
};

  return (
    // <Layout>
      <html>
        <body>
          <div className={`${styles.div} ${styles.mg_auto} ${styles.padding_top}`}>
        <form onSubmit={handleSubmit} className={`${styles.twopb}`}>
          <div className={`${styles.twopb}`}>
            <label htmlFor="name" className={`${styles.required}`}>Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter a name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.inputField}`}
              required
            />
            {nameError && <span style={{ color: 'red', padding:0 }}>{nameError}</span>}
          </div>
          
          <div className={`${styles.twopb}`}>
            <label htmlFor="email" className={`${styles.required}`}>Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.inputField}`}
              required
            />
            {emailError && <span style={{ color: 'red', padding:0 }}>{emailError}</span>}
          </div>
          
          <div className={`${styles.twopb}`}>
            <label htmlFor="password" className={`${styles.required}`}>Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${styles.inputField}`}
              required
            />
            {passwordError && <span style={{ color: 'red', padding:0 }}>{passwordError}</span>}
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className={`${styles.twopb} ${styles.text_align_center}`}>
            <PurpleButton param1="Sign up" param2={isButtonDisabled}/>
          </div>
        </form>
      </div>
        </body>
      </html>
      
    // </Layout> 
  );
};

export default Home;
