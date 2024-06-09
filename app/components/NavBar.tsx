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
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/shop">Shop</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
