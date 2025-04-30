import React from 'react';
import styles from './SpecificLoaderPart.css'; // Import the styles

const SpecificLoaderPart = () => (
  <div className={styles.loaderWrapper}>
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
    </div>
  </div>
);

export default SpecificLoaderPart;
