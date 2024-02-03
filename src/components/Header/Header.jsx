import React from 'react';
import styles from './header.module.css';



export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>TasksManager</div>
        <button className={styles.button}>Выйти</button>
      </div>
    </header>
  );
};
export default Header;
