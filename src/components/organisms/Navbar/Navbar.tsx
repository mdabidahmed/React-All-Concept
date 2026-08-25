import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export function Navbar() {
  return (
    <header className={styles.navbar}>
      <Link to="/" className={styles.brand}>
        <span className={styles.logo}>⚛</span>
        <span>React All Concepts</span>
      </Link>
      <a
        className={styles.repoLink}
        href="https://github.com/mdabidahmed/react-all-concept"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    </header>
  );
}
