import React from 'react';
import styles from './skeleton.module.css';

const Skeleton = () => {
  return (
    <div className={styles.block__loading}>
      <div className={styles.loading}></div>
      <span className={styles.loading__text}>Загрузка...</span>
    </div>
  );
};
export default Skeleton;
