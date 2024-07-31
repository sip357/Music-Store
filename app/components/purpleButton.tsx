"use client";

import React from "react";
import styles from "../styles/button.module.css";

interface PurpleButtonProps {
  param1: string;
  param2: boolean;
}

const PurpleButton: React.FC<PurpleButtonProps> = ({ param1, param2 }) => {
  return (
    <div>
      <button type="submit" disabled={param2} className={styles.button_3}>
        {param1}
      </button>
    </div>
  );
};

export default PurpleButton;
