// ShoppingCartIcon.js
import React from 'react';
import styles from "../styles/searchBox.module.css";

const SearchBox = () => {
    return(
        <div className={styles.frame}>
            <input type="text" id='search' className={styles.box} placeholder='Search for any genre or instrumental'/>
        </div>
    )
};

export default SearchBox;
