import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { quizCategoryMeta } from "../../data/quiz/categories";
import { getQuizQuestions } from "../../data/quiz";
import { quizMotivationalQuotes, quizEncouragementQuotes, pickRandomQuote } from "../../data/quiz/quotes";
import { useConfirm } from "../../hooks/useConfirm";
import { useQuizHistory } from "../../hooks/useQuizHistory";
import { useQuizSession } from "../../hooks/useQuizSession";
import { shuffleArray } from "../../utils/array";
import { Badge } from "../../components/atoms/Badge/Badge";
import { Button } from "../../components/atoms/Button/Button";
import { ProgressBar } from "../../components/atoms/ProgressBar/ProgressBar";
import { QuizCategoryIcon } from "../../components/atoms/QuizCategoryIcon/QuizCategoryIcon";
import { Celebration } from "../../components/molecules/Celebration/Celebration";
import { QuizTimerRing } from "../../components/molecules/QuizTimerRing/QuizTimerRing";
import { QUIZ_PASS_PERCENT, QUIZ_SECONDS_PER_QUESTION } from "../../types/quiz";
import styles from "./QuizPlayPage.module.css";

type QuizPhase = "intro" | "playing" | "result";

const OPTION_LETTERS = ["A", "B", "C", "D"];

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

interface QuizResultState {
  correct: number;
  total: number;
  percent: number;
  passed: boolean;
  answers: (number[] | null)[];
  isNewBest: boolean;
  previousBestPercent?: number;
  durationSec: number;
}

export function QuizPlayPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = quizCategoryMeta.find((c) => c.id === categoryId);
  const questions = category ? getQuizQuestions(category.id) : [];

  const { bestByCategory, recordAttempt } = useQuizHistory();
  const { registerActiveTest } = useQuizSession();
  const confirm = useConfirm();

  const [phase, setPhase] = useState<QuizPhase>("intro");
  const [activeQuestions, setActiveQuestions] = useState(questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(QUIZ_SECONDS_PER_QUESTION);
  const [answers, setAnswers] = useState<(number[] | null)[]>([]);
  const [result, setResult] = useState<QuizResultState | null>(null);
  const [celebrate, setCelebrate] = useState(false);
  const [quote, setQuote] = useState("");
  const startTimeRef = useRef(0);
  const finalizeRef = useRef<() => void>(() => {});

  useEffect(() => {
    finalizeRef.current = finalizeCurrentAttempt;
  });

  useEffect(() => {
    if (phase !== "playing") return;
    if (secondsLeft <= 0) {
      setLocked(true);
      return;
    }
    const timeout = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timeout);
  }, [phase, secondsLeft]);

  useEffect(() => {
    if (phase !== "playing") {
      registerActiveTest(null);
      return;
    }
    registerActiveTest(() => finalizeRef.current());
    return () => registerActiveTest(null);
  }, [phase, registerActiveTest]);

  if (!category || questions.length === 0) {
    return <Navigate to="/not-found" replace />;
  }

  const currentQuestion = activeQuestions[currentIndex];
  const introBest = bestByCategory.get(category.id);

  function startQuiz() {
    setActiveQuestions(shuffleArray(questions));
    setAnswers(Array(questions.length).fill(null));
    setCurrentIndex(0);
    setSelected([]);
    setLocked(false);
    setSecondsLeft(QUIZ_SECONDS_PER_QUESTION);
    setResult(null);
    setCelebrate(false);
    startTimeRef.current = Date.now();
    setPhase("playing");
  }

  function toggleOption(idx: number) {
    if (locked) return;
    if (currentQuestion.type === "single") {
      setSelected([idx]);
      return;
    }
    setSelected((prev) =>
      prev.includes(idx) ? prev.filter((v) => v !== idx) : [...prev, idx].sort((a, b) => a - b),
    );
  }

  function finishQuiz(finalAnswers: (number[] | null)[]) {
    let correct = 0;
    activeQuestions.forEach((q, i) => {
      const given = finalAnswers[i] ?? [];
      const isCorrect =
        given.length === q.correctIndexes.length && given.every((v) => q.correctIndexes.includes(v));
      if (isCorrect) correct += 1;
    });

    const total = activeQuestions.length;
    const percent = Math.round((correct / total) * 100);
    const passed = percent >= QUIZ_PASS_PERCENT;
    const durationSec = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
    const previousBest = bestByCategory.get(category!.id);

    recordAttempt({
      categoryId: category!.id,
      total,
      correct,
      percent,
      passed,
      completedAt: new Date().toISOString(),
      durationSec,
    });

    setResult({
      correct,
      total,
      percent,
      passed,
      answers: finalAnswers,
      isNewBest: !previousBest || percent > previousBest.percent,
      previousBestPercent: previousBest?.percent,
      durationSec,
    });
    setQuote(pickRandomQuote(passed ? quizMotivationalQuotes : quizEncouragementQuotes));
    setPhase("result");

    if (passed) {
      setCelebrate(true);
      window.setTimeout(() => setCelebrate(false), 4000);
    }
  }

  function handleNext() {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = selected.length > 0 ? selected : null;
    setAnswers(updatedAnswers);

    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex((i) => i + 1);
      setSelected([]);
      setLocked(false);
      setSecondsLeft(QUIZ_SECONDS_PER_QUESTION);
    } else {
      finishQuiz(updatedAnswers);
    }
  }

  function finalizeCurrentAttempt() {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = selected.length > 0 ? selected : null;
    finishQuiz(updatedAnswers);
  }

  async function handleEndTest() {
    const remaining = activeQuestions.length - (currentIndex + 1);
    const confirmed = await confirm({
      title: "End this test?",
      message:
        remaining > 0
          ? `The ${remaining} remaining question${remaining === 1 ? "" : "s"} will count as incorrect.`
          : "You're on the last question — this will submit your answers now.",
      confirmLabel: "End test",
    });
    if (!confirmed) return;
    finalizeCurrentAttempt();
  }

  return (
    <div className={styles.page}>
      {phase === "intro" && (
        <div className={styles.introCard}>
          <span className={styles.introIcon} aria-hidden="true">
            <QuizCategoryIcon categoryId={category.id} />
          </span>
          <p className={styles.eyebrow}>{category.title} quiz</p>
          <h1 className={styles.introTitle}>Ready to test your knowledge?</h1>
          <p className={styles.introDescription}>{category.description}</p>
          {introBest && (
            <p className={styles.introBest}>
              Your best: <strong>{introBest.percent}%</strong> — {introBest.passed ? "Passed" : "Not passed yet"}
            </p>
          )}
          <ul className={styles.rules}>
            <li>{questions.length} questions, drawn from this category</li>
            <li>{QUIZ_SECONDS_PER_QUESTION} seconds to answer each question</li>
            <li>Some questions allow more than one correct answer</li>
            <li>Score {QUIZ_PASS_PERCENT}% or higher to pass</li>
          </ul>
          <div className={styles.introActions}>
            <Button variant="primary" onClick={startQuiz}>
              Start quiz
            </Button>
            <Link to="/quiz" className={styles.backLink}>
              Back to dashboard
            </Link>
          </div>
        </div>
      )}

      {phase === "playing" && currentQuestion && (
        <div className={styles.playCard}>
          <div className={styles.playHeader}>
            <div className={styles.playHeaderLeft}>
              <span className={styles.playIcon} aria-hidden="true">
                <QuizCategoryIcon categoryId={category.id} />
              </span>
              <div>
                <p className={styles.eyebrow}>{category.title}</p>
                <p className={styles.progressLabel}>
                  Question {currentIndex + 1} of {activeQuestions.length}
                </p>
              </div>
            </div>
            <div className={styles.playHeaderRight}>
              <Button variant="ghost" size="sm" onClick={handleEndTest} className={styles.endTestButton}>
                End test
              </Button>
              <QuizTimerRing secondsLeft={secondsLeft} totalSeconds={QUIZ_SECONDS_PER_QUESTION} />
            </div>
          </div>

          <ProgressBar
            percent={(currentIndex / activeQuestions.length) * 100}
            label="Quiz progress"
          />

          <div className={styles.questionBlock}>
            <Badge tone="accent" className={styles.typeBadge}>
              {currentQuestion.type === "multi" ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="4" y="4" width="16" height="16" rx="4" />
                  <path d="M8 12.5l2.5 2.5L16 9" />
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="8" />
                  <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
                </svg>
              )}
              {currentQuestion.type === "multi" ? "Select all that apply" : "Select one answer"}
            </Badge>
            <h2 className={styles.questionText}>{currentQuestion.question}</h2>
          </div>

          <div className={styles.options}>
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selected.includes(idx);
              return (
                <button
                  key={idx}
                  type="button"
                  className={[
                    styles.option,
                    isSelected ? styles.optionSelected : "",
                    locked ? styles.optionLocked : "",
                  ].join(" ")}
                  onClick={() => toggleOption(idx)}
                  disabled={locked}
                  aria-pressed={isSelected}
                >
                  <span
                    className={[
                      styles.optionIndicator,
                      currentQuestion.type === "multi" ? styles.indicatorSquare : "",
                    ].join(" ")}
                  >
                    {isSelected ? (
                      currentQuestion.type === "multi" ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      ) : (
                        <span className={styles.radioDot} />
                      )
                    ) : (
                      OPTION_LETTERS[idx]
                    )}
                  </span>
                  <span className={styles.optionText}>{option}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.playFooter}>
            <p className={styles.hint}>
              {locked
                ? "Time's up for this question."
                : selected.length === 0
                  ? "No answer selected yet — skipping counts as incorrect."
                  : " "}
            </p>
            <Button variant="primary" onClick={handleNext} className={styles.nextButton}>
              {currentIndex + 1 < activeQuestions.length ? "Next question" : "Finish quiz"}
            </Button>
          </div>
        </div>
      )}

      {phase === "result" && result && (
        <div className={styles.resultWrap}>
          <Celebration active={celebrate} />
          <div className={styles.resultCard}>
            <div className={styles.scoreRing}>
              <svg width="128" height="128" viewBox="0 0 128 128">
                <circle className={styles.scoreTrack} cx="64" cy="64" r={54} />
                <circle
                  className={[
                    styles.scoreFill,
                    result.passed ? styles.scoreFillPass : styles.scoreFillFail,
                  ].join(" ")}
                  cx="64"
                  cy="64"
                  r={54}
                  strokeDasharray={2 * Math.PI * 54}
                  strokeDashoffset={2 * Math.PI * 54 * (1 - result.percent / 100)}
                />
              </svg>
              <div className={styles.scoreValue}>
                <span className={styles.scorePercent}>{result.percent}%</span>
                <span className={styles.scoreFraction}>
                  {result.correct}/{result.total}
                </span>
              </div>
            </div>

            <Badge tone={result.passed ? "success" : "neutral"} className={result.passed ? "" : styles.failBadge}>
              {result.passed ? "Passed" : "Not passed"}
            </Badge>

            {result.isNewBest && result.percent > 0 ? (
              <p className={styles.bestNote}>New personal best for {category.title}!</p>
            ) : result.previousBestPercent !== undefined ? (
              <p className={styles.bestNote}>Personal best: {result.previousBestPercent}%</p>
            ) : null}

            <p className={styles.durationNote}>Completed in {formatDuration(result.durationSec)}</p>

            <p className={styles.quote}>&ldquo;{quote}&rdquo;</p>

            <div className={styles.resultActions}>
              <Button variant="primary" onClick={startQuiz}>
                Retry quiz
              </Button>
              <Link to="/quiz" className={styles.backLink}>
                Back to dashboard
              </Link>
            </div>
          </div>

          <details className={styles.review}>
            <summary className={styles.reviewSummary}>
              <svg className={styles.reviewChevron} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
              Review your answers ({result.total})
            </summary>
            <div className={styles.reviewList}>
              {activeQuestions.map((q, i) => {
                const given = result.answers[i] ?? [];
                const isCorrect =
                  given.length === q.correctIndexes.length &&
                  given.every((v) => q.correctIndexes.includes(v));
                return (
                  <div
                    key={q.id}
                    className={[
                      styles.reviewItem,
                      isCorrect ? styles.reviewCorrect : styles.reviewIncorrect,
                    ].join(" ")}
                  >
                    <div className={styles.reviewHeader}>
                      <span className={styles.reviewIcon} aria-hidden="true">
                        {isCorrect ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M18 6 6 18M6 6l12 12" />
                          </svg>
                        )}
                      </span>
                      <p className={styles.reviewQuestion}>
                        {i + 1}. {q.question}
                      </p>
                    </div>
                    {given.length === 0 && <p className={styles.reviewSkipped}>You skipped this question.</p>}

                    <div className={styles.reviewOptions}>
                      {q.options.map((option, idx) => {
                        const isCorrectOption = q.correctIndexes.includes(idx);
                        const wasSelected = given.includes(idx);
                        const state = isCorrectOption ? "correct" : wasSelected ? "wrong" : "neutral";
                        return (
                          <div
                            key={idx}
                            className={[
                              styles.reviewOption,
                              state === "correct" ? styles.reviewOptionCorrect : "",
                              state === "wrong" ? styles.reviewOptionWrong : "",
                            ].join(" ")}
                          >
                            <span className={styles.reviewOptionIndicator} aria-hidden="true">
                              {state === "correct" ? (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                  <path d="M20 6 9 17l-5-5" />
                                </svg>
                              ) : state === "wrong" ? (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                  <path d="M18 6 6 18M6 6l12 12" />
                                </svg>
                              ) : (
                                OPTION_LETTERS[idx]
                              )}
                            </span>
                            <span className={styles.reviewOptionText}>{option}</span>
                            {wasSelected && <span className={styles.reviewOptionTag}>Your answer</span>}
                            {isCorrectOption && !wasSelected && (
                              <span className={styles.reviewOptionTag}>Correct answer</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <p className={styles.reviewExplanation}>{q.explanation}</p>
                  </div>
                );
              })}
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
