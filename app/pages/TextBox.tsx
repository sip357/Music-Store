"use client";

import React, { useState } from 'react';
import styles from './TextBox.module.css';

const TextBox: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`Submitted: ${inputValue}`);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div>
        <label htmlFor="textInput">Enter text:</label>
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
