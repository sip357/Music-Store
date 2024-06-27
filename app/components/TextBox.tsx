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
      <div className={styles.text_align_center}>Subscribe to receive updates!</div>
      <div className={styles.text_align_center}>
        <label htmlFor="textInput"></label>
        <input
          type="text"
          id="textInput"
          value={inputValue}
          onChange={handleChange}
          className={styles.inputField}
        />
      </div>
      <button type="submit" className={styles.submitButton}>Submit</button>
    </form>
  );
};

export default TextBox;
