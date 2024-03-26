import React from 'react';
import styles from './header.module.css';
import { useNavigate, Link } from 'react-router-dom';
import headerLogo from '../../img/list1.png';

export const Header = ({ setIsVisibleModal, isVisibleModal, isAdmin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/login">
          <div className={styles.block__logo}>
            <img src={headerLogo} alt="logo" width={56} height={56} />
            <div className={styles.logo}>
              <h1>TRACKER TASKS</h1>
              <span className={styles.logo__subtitle}>
                самый лучший менеджер задач во вселенной
              </span>
            </div>
          </div>
        </Link>
        {isAdmin && (
          <button onClick={() => setIsVisibleModal(!isVisibleModal)} className={styles.button__add}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                className={styles.path}
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="none"
              />
            </svg>
            <span>Добавить</span>
          </button>
        )}
        <button onClick={handleLogout} className={styles.button__logout}>
          Выйти
        </button>
      </div>
    </header>
  );
};
export default Header;
