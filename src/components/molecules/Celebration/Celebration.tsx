import { useState } from "react";
import styles from "./Celebration.module.css";

interface CelebrationProps {
  active: boolean;
}

const COLORS = ["var(--accent)", "var(--accent-strong)", "var(--success)", "#f5b93b", "#f472b6", "#60a5fa"];
const PIECE_COUNT = 42;

function generatePieces() {
  return Array.from({ length: PIECE_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2.2 + Math.random() * 1.8,
    color: COLORS[i % COLORS.length],
    wide: i % 3 === 0,
  }));
}

/** A burst of falling ribbon pieces, shown over the result screen on a passing quiz. */
export function Celebration({ active }: CelebrationProps) {
  const [pieces] = useState(generatePieces);

  if (!active) return null;

  return (
    <div className={styles.field} aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className={[styles.ribbon, piece.wide ? styles.wide : ""].join(" ")}
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            backgroundColor: piece.color,
          }}
        />
      ))}
    </div>
  );
}
