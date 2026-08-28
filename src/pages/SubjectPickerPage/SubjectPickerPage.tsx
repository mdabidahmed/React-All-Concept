import { Link } from "react-router-dom";
import { subjects, getTopicsForSubject } from "../../data/subjects";
import styles from "./SubjectPickerPage.module.css";

export function SubjectPickerPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <h1 className={styles.title}>
          What do you want to <span className={styles.accent}>learn</span> today?
        </h1>
        <p className={styles.subtitle}>
          Pick a subject to see topic explanations, runnable examples, and a quiz to test what you know.
        </p>
      </header>

      <div className={styles.grid}>
        {subjects.map((subject) => {
          const topicCount = getTopicsForSubject(subject.id).length;
          const card = (
            <>
              <div className={styles.cardTop}>
                <h2 className={styles.cardTitle}>{subject.name}</h2>
                {subject.comingSoon && <span className={styles.badge}>Coming soon</span>}
              </div>
              <p className={styles.cardTagline}>{subject.tagline}</p>
              <p className={styles.cardDescription}>{subject.description}</p>
              {!subject.comingSoon && (
                <span className={styles.cardMeta}>{topicCount} topics</span>
              )}
            </>
          );

          return subject.comingSoon ? (
            <div key={subject.id} className={[styles.card, styles.cardDisabled].join(" ")}>
              {card}
            </div>
          ) : (
            <Link key={subject.id} to={`/${subject.id}`} className={styles.card}>
              {card}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
