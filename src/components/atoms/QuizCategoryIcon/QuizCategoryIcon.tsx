interface QuizCategoryIconProps {
  categoryId: string;
}

/** A small line-icon glyph per quiz category, for scanability across the dashboard, intro, and play screens. */
export function QuizCategoryIcon({ categoryId }: QuizCategoryIconProps) {
  switch (categoryId) {
    case "getting-started":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 16V8m-3 3 3-3 3 3" />
        </svg>
      );
    case "jsx":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6 4 12l5 6" />
          <path d="M15 6l5 6-5 6" />
        </svg>
      );
    case "components":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="8" height="8" rx="1.5" />
          <rect x="13" y="3" width="8" height="8" rx="1.5" />
          <rect x="3" y="13" width="8" height="8" rx="1.5" />
          <rect x="13" y="13" width="8" height="8" rx="1.5" />
        </svg>
      );
    case "forms":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      );
    case "advanced":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3 3 8l9 5 9-5-9-5Z" />
          <path d="M3 13l9 5 9-5" />
          <path d="M3 18l9 5 9-5" />
        </svg>
      );
    case "styling":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z" />
        </svg>
      );
    case "hooks":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 3v10a4 4 0 0 0 8 0V9" />
          <circle cx="9" cy="3" r="1.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "performance":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M13 2 5 14h5l-1 8 8-12h-5l1-8Z" />
        </svg>
      );
    case "composition":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="12" r="6" />
          <circle cx="15" cy="12" r="6" />
        </svg>
      );
    default:
      return null;
  }
}
