import type { QuizQuestion } from "../../types/quiz";
import { tsBasicsQuestions } from "./tsBasics";
import { tsInterfacesTypesQuestions } from "./tsInterfacesTypes";
import { tsFunctionsQuestions } from "./tsFunctions";
import { tsClassesOopQuestions } from "./tsClassesOop";
import { tsGenericsQuestions } from "./tsGenerics";
import { tsAdvancedTypesQuestions } from "./tsAdvancedTypes";
import { tsModulesConfigQuestions } from "./tsModulesConfig";
import { tsReactQuestions } from "./tsReact";

export { tsQuizCategoryMeta } from "./categories";

export const tsQuizQuestionsByCategory: Record<string, QuizQuestion[]> = {
  "ts-basics": tsBasicsQuestions,
  "ts-interfaces-types": tsInterfacesTypesQuestions,
  "ts-functions": tsFunctionsQuestions,
  "ts-classes-oop": tsClassesOopQuestions,
  "ts-generics": tsGenericsQuestions,
  "ts-advanced-types": tsAdvancedTypesQuestions,
  "ts-modules-config": tsModulesConfigQuestions,
  "ts-react": tsReactQuestions,
};
