// components/NavBar.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/NavBar.module.css';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`${styles.navbar} ${isOpen ? styles.active : ''}`}>
      <div className={styles.logo}>
        <Link href="/">Music Store</Link>
      </div>
      <div className={styles.toggleButton} onClick={toggleNav}>
        ☰
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href="/store">Shop</Link>
        </li>
        <li>
          <Link href="#about" scroll={true} className={styles.dropdown}>
            About
            <div className={styles.dropdown_content}>
              <a href="/">Instrumentals</a>
              <a href="/">Soundkits</a>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/">
            <button className={styles['button-3']} role="button">Sign Up</button> {/* Apply button-3 class */}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
