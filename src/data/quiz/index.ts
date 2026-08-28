import type { QuizQuestion } from "../../types/quiz";
import { gettingStartedQuestions } from "./gettingStarted";
import { jsxQuestions } from "./jsx";
import { componentsQuestions } from "./components";
import { formsQuestions } from "./forms";
import { advancedQuestions } from "./advanced";
import { stylingQuestions } from "./styling";
import { hooksQuestions } from "./hooks";
import { performanceQuestions } from "./performance";
import { compositionQuestions } from "./composition";
import { advancedPatternsQuestions } from "./advancedPatterns";
import { testingQuestions } from "./testing";

export const quizQuestionsByCategory: Record<string, QuizQuestion[]> = {
  "getting-started": gettingStartedQuestions,
  jsx: jsxQuestions,
  components: componentsQuestions,
  forms: formsQuestions,
  advanced: advancedQuestions,
  styling: stylingQuestions,
  hooks: hooksQuestions,
  performance: performanceQuestions,
  composition: compositionQuestions,
  "advanced-patterns": advancedPatternsQuestions,
  testing: testingQuestions,
};

export function getQuizQuestions(categoryId: string): QuizQuestion[] {
  return quizQuestionsByCategory[categoryId] ?? [];
}
