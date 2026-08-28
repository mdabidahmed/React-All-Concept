import type { QuizQuestion } from "../../types/quiz";
import { jsBasicsQuestions } from "./jsBasics";
import { jsControlFlowQuestions } from "./jsControlFlow";
import { jsFunctionsQuestions } from "./jsFunctions";
import { jsObjectsArraysQuestions } from "./jsObjectsArrays";
import { jsStringsNumbersQuestions } from "./jsStringsNumbers";
import { jsAdvancedConceptsQuestions } from "./jsAdvancedConcepts";
import { jsAsyncQuestions } from "./jsAsync";
import { jsDomEventsQuestions } from "./jsDomEvents";
import { jsBrowserModernQuestions } from "./jsBrowserModern";

export { jsQuizCategoryMeta } from "./categories";

export const jsQuizQuestionsByCategory: Record<string, QuizQuestion[]> = {
  "js-basics": jsBasicsQuestions,
  "js-control-flow": jsControlFlowQuestions,
  "js-functions": jsFunctionsQuestions,
  "js-objects-arrays": jsObjectsArraysQuestions,
  "js-strings-numbers": jsStringsNumbersQuestions,
  "js-advanced-concepts": jsAdvancedConceptsQuestions,
  "js-async": jsAsyncQuestions,
  "js-dom-events": jsDomEventsQuestions,
  "js-browser-modern": jsBrowserModernQuestions,
};
