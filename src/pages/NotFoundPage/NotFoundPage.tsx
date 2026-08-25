import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export function NotFoundPage() {
  return (
    <div className={styles.page}>
      <h1>404</h1>
      <p>That topic doesn't exist.</p>
      <Link to="/" className={styles.link}>
        Back to all topics
      </Link>
    </div>
  );
}
