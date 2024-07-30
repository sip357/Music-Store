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
          <Link href="/store" prefetch={false}>Shop</Link>
        </li>
        {/* <li>
          <Link href="#about" scroll={true}>
            About
          </Link>
        </li> */}
        <li>
          <Link href="/signup" className={styles['button-3']} role="button">
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
