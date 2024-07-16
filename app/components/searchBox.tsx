// ShoppingCartIcon.js
import React from 'react';
import styles from "../styles/searchBox.module.css";
import { Providers } from '../GlobalRedux/provider';

const SearchBox = () => {
    return(
        <Providers>
            <div className={styles.frame}>
                <input type="text" id='search' className={styles.box} placeholder='Search for any genre or instrumental'/>
            </div>
        </Providers>
    )
};

export default SearchBox;
