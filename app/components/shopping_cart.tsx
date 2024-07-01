// ShoppingCartIcon.js
import React from 'react';
import styles from "../styles/shopCarticon.module.css";

const ShoppingCartIcon = () => {
    return(
        <img src="cart.png" alt="add" className={styles.cart} />
    )
};

export default ShoppingCartIcon;
