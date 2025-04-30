// components/Loader.js

import styles from './Loader.module.css'; // Assuming you will use CSS modules

const Loader = () => (
  <div className={styles.loaderContainer}>
    <div className={styles.spinner}></div>
  </div>
);

export default Loader;
