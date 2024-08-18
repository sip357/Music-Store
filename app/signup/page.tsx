'use client';

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Layout from "../components/layout";
import styles from "./Signup.module.css";
import PurpleButton from "../components/purpleButton";
import "../styles/globals.css";
import ReCAPTCHA from "react-google-recaptcha";
import { Session } from "next-auth";
import { generateVerificationToken } from "../lib/createToken";

function ValidateEmail(email: string): boolean {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;
  return validRegex.test(email);
}


function ValidatePassword(password: string): boolean{
  const validRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$()%^&*.-{}_]).{8,}$/;
  return validRegex.test(password);
}

const SignIn: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [nameError, setNameError] = useState<string>(''); 
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');  
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
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
  
    if(!ValidatePassword(password)){
      setPasswordError("At least 8 characters; Must contain at least 1 of each: a-z, A-Z, 0-9, #?!@$()_%^{}&*.-")
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

  if (!recaptchaToken) {
    setError('*Please complete the reCAPTCHA.');
    return;
  }
  
  if (name.length <= 3 || !name) {
    setNameError('*Name is required and must be longer than 3 characters');
    return;
  }
  
  if (!email) {
    setEmailError('*Email is required to create a user');
    return;
  }

  if (!ValidateEmail(email)) {
    setEmailError('*Invalid email address');
    return;
  }

  if (!ValidatePassword(password)) {
    setPasswordError('*Enter a password');
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
  const verificationToken = generateVerificationToken(email);
};

  const handleBackClick = () =>{
    router.back(); //Navigate to the previous page
  }

  //Confirms script loaded
  const asyncScriptOnLoad = () => {
    console.log('Google recaptcha loaded just fine')
  }

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  return (
    // <Layout>
      <html>
        <body>
          <span className={styles.arrow} onClick={handleBackClick} style={{ cursor: 'pointer' }}>
            &#8592;
          </span>
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
              <ReCAPTCHA
                sitekey="6Ld0KygqAAAAAP_3HnKNPU4DVliG50nFTqUyTmT3"
                onChange={handleRecaptchaChange}
                asyncScriptOnLoad={asyncScriptOnLoad}
              />
              {/* Added the styles here because they would only be implemented once */}
              <p style={{color : 'white', fontWeight: "bold"}} className={`${styles.text_align_center}`}>
                Already have an account? <a href="/login" className={`${styles.loginLink}`}>Login</a>
              </p>
              {error && <p style={{ color: 'red', fontWeight: "bold"}}>{error}</p>}
              <div className={`${styles.onepb} ${styles.text_align_center}`}>
                <PurpleButton param1="Sign up" param2={isButtonDisabled}/>
              </div>
            </form>
          </div>
        </body>
      </html>
      
    // </Layout> 
  );
};

export default SignIn;
