"use client";

import React, { useState } from 'react';
import styles from '../styles/TextBox.module.css';

const TextBox: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    //Change it so that when submitted it is added to the subsciber list
    alert(`Submitted: ${inputValue}`);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={`${styles.text_align_center} ${styles.zerop}`}>Subscribe to receive updates!</div>
      <div className={styles.onepi}> 
        <div className={styles.text_align_center}>
          <label htmlFor="textInput"></label>
          <input
            type="email"
            id="textInput"
            value={inputValue}
            onChange={handleChange}
            className={styles.inputField}
            placeholder='Enter email'
          />
        </div>
      </div>
      
      <button type="submit" className={styles.submitButton}>Submit</button>
    </form>
  );
};

export default TextBox;
