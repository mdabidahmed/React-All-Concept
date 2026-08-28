import type { QuizCategoryMeta, QuizQuestion } from "../types/quiz";
import { quizCategoryMeta as reactQuizCategoryMeta } from "./quiz/categories";
import { quizQuestionsByCategory as reactQuizQuestions } from "./quiz";
import { htmlQuizCategoryMeta, htmlQuizQuestionsByCategory } from "./quiz-html";
import { cssQuizCategoryMeta, cssQuizQuestionsByCategory } from "./quiz-css";
import { jsQuizCategoryMeta, jsQuizQuestionsByCategory } from "./quiz-js";
import { tsQuizCategoryMeta, tsQuizQuestionsByCategory } from "./quiz-ts";
import { nodeQuizCategoryMeta, nodeQuizQuestionsByCategory } from "./quiz-node";

export const quizCategoryMetaBySubject: Record<string, QuizCategoryMeta[]> = {
  react: reactQuizCategoryMeta,
  html: htmlQuizCategoryMeta,
  css: cssQuizCategoryMeta,
  javascript: jsQuizCategoryMeta,
  typescript: tsQuizCategoryMeta,
  nodejs: nodeQuizCategoryMeta,
};

export const quizQuestionsBySubject: Record<string, Record<string, QuizQuestion[]>> = {
  react: reactQuizQuestions,
  html: htmlQuizQuestionsByCategory,
  css: cssQuizQuestionsByCategory,
  javascript: jsQuizQuestionsByCategory,
  typescript: tsQuizQuestionsByCategory,
  nodejs: nodeQuizQuestionsByCategory,
};

export function getQuizCategoriesForSubject(subjectId: string | undefined): QuizCategoryMeta[] {
  if (!subjectId) return [];
  return quizCategoryMetaBySubject[subjectId] ?? [];
}

export function getQuizQuestionsForSubject(subjectId: string | undefined, categoryId: string): QuizQuestion[] {
  if (!subjectId) return [];
  return quizQuestionsBySubject[subjectId]?.[categoryId] ?? [];
}
