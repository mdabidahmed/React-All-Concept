import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export function NotFoundPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <span className={styles.code} aria-hidden="true">
          404
        </span>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.description}>
          The topic or page you're looking for doesn't exist. It may have been renamed or moved.
        </p>
        <Link to="/" className={styles.cta}>
          Back to all topics
        </Link>
      </div>
    </div>
  );
}
