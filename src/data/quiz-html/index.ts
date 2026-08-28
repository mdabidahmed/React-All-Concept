import type { QuizQuestion } from "../../types/quiz";
import { htmlBasicsQuestions } from "./htmlBasics";
import { htmlStructureQuestions } from "./htmlStructure";
import { htmlFormsQuestions } from "./htmlForms";
import { htmlScriptingLayoutQuestions } from "./htmlScriptingLayout";
import { htmlGraphicsQuestions } from "./htmlGraphics";
import { htmlMediaQuestions } from "./htmlMedia";
import { htmlApisQuestions } from "./htmlApis";

export { htmlQuizCategoryMeta } from "./categories";

export const htmlQuizQuestionsByCategory: Record<string, QuizQuestion[]> = {
  "html-basics": htmlBasicsQuestions,
  "html-structure": htmlStructureQuestions,
  "html-forms": htmlFormsQuestions,
  "html-scripting-layout": htmlScriptingLayoutQuestions,
  "html-graphics": htmlGraphicsQuestions,
  "html-media": htmlMediaQuestions,
  "html-apis": htmlApisQuestions,
};
