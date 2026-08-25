/** Shown on the result screen after a passing attempt. */
export const quizMotivationalQuotes: string[] = [
  "Every expert was once a beginner who refused to give up.",
  "Small daily improvements lead to stunning results.",
  "You don't have to be great to start, but you have to start to be great.",
  "Consistency beats intensity — keep showing up.",
  "The best React developers are the ones who kept practicing.",
  "Progress, not perfection.",
  "One quiz at a time, one concept at a time.",
  "Your future self is built by what you learn today.",
  "Confidence comes from repetition — go again.",
  "Every completed quiz is a rep for your brain.",
  "Great things take time. You're already on your way.",
  "Mastery is just consistency wearing a disguise.",
];

/** Shown on the result screen after a failing attempt, to nudge a retry. */
export const quizEncouragementQuotes: string[] = [
  "So close — review the explanations and try again.",
  "Every attempt sharpens your understanding. Go again.",
  "Falling short today just means you're one step closer.",
  "Review, reflect, retry — that's how mastery happens.",
  "You're building real knowledge. Keep pushing.",
  "Not a fail — just a rep. Try this category again.",
];

export function pickRandomQuote(quotes: string[]): string {
  return quotes[Math.floor(Math.random() * quotes.length)];
}
