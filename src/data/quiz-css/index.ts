import type { QuizQuestion } from "../../types/quiz";
import { cssBasicsQuestions } from "./cssBasics";
import { cssBoxModelQuestions } from "./cssBoxModel";
import { cssTextTypographyQuestions } from "./cssTextTypography";
import { cssLayoutPositioningQuestions } from "./cssLayoutPositioning";
import { cssFlexboxGridQuestions } from "./cssFlexboxGrid";
import { cssComponentsQuestions } from "./cssComponents";
import { cssAdvancedEffectsQuestions } from "./cssAdvancedEffects";

export { cssQuizCategoryMeta } from "./categories";

export const cssQuizQuestionsByCategory: Record<string, QuizQuestion[]> = {
  "css-basics": cssBasicsQuestions,
  "css-box-model": cssBoxModelQuestions,
  "css-text-typography": cssTextTypographyQuestions,
  "css-layout-positioning": cssLayoutPositioningQuestions,
  "css-flexbox-grid": cssFlexboxGridQuestions,
  "css-components": cssComponentsQuestions,
  "css-advanced-effects": cssAdvancedEffectsQuestions,
};
