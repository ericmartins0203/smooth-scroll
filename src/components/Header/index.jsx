import styles from './style.module.css';

export default function Index({menuIsActive, setMenuIsActive}) {
  return (
    <div className={styles.header}>
        <div 
          onClick={() => {setMenuIsActive(!menuIsActive)}} 
          className={`${styles.burger} ${menuIsActive ? styles.burgerActive : ""}`}
        >
        </div>
    </div>
)}