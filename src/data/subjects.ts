import type { Topic } from "../types";
import { topics as reactTopics } from "./topics";
import { htmlTopics } from "./topics-html";
import { cssTopics } from "./topics-css";
import { jsTopics } from "./topics-js";
import { tsTopics } from "./topics-ts";
import { nodeTopics } from "./topics-node";

export interface SubjectMeta {
  id: string;
  name: string;
  tagline: string;
  description: string;
  /** Subjects without topics yet show as "Coming soon" on the picker instead of being clickable. */
  comingSoon?: boolean;
}

export const subjects: SubjectMeta[] = [
  {
    id: "react",
    name: "React",
    tagline: "Learn React, one concept at a time",
    description: "Components, hooks, patterns, and the ecosystem around building React apps.",
  },
  {
    id: "html",
    name: "HTML",
    tagline: "Learn HTML, one tag at a time",
    description: "The building blocks of every web page, from a single tag to full pages.",
  },
  {
    id: "css",
    name: "CSS",
    tagline: "Style the web",
    description: "Layout, color, typography, and responsive design.",
  },
  {
    id: "javascript",
    name: "JavaScript",
    tagline: "The language of the web",
    description: "Core syntax, the DOM, async code, and modern JavaScript features.",
  },
  {
    id: "typescript",
    name: "TypeScript",
    tagline: "JavaScript with types",
    description: "Static types, interfaces, generics, and safer JavaScript.",
  },
  {
    id: "nodejs",
    name: "Node.js",
    tagline: "JavaScript on the server",
    description: "Modules, the file system, HTTP servers, and the npm ecosystem.",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    tagline: "A document database",
    description: "Collections, documents, queries, and aggregation.",
    comingSoon: true,
  },
  {
    id: "aws",
    name: "AWS",
    tagline: "Cloud infrastructure",
    description: "Core services for compute, storage, and deployment.",
    comingSoon: true,
  },
];

export const topicsBySubject: Record<string, Topic[]> = {
  react: reactTopics,
  html: htmlTopics,
  css: cssTopics,
  javascript: jsTopics,
  typescript: tsTopics,
  nodejs: nodeTopics,
};

export function getSubjectById(id: string | undefined): SubjectMeta | undefined {
  if (!id) return undefined;
  return subjects.find((s) => s.id === id);
}

export function getTopicsForSubject(subjectId: string | undefined): Topic[] {
  if (!subjectId) return [];
  return topicsBySubject[subjectId] ?? [];
}

export function getTopicById(subjectId: string | undefined, topicId: string | undefined): Topic | undefined {
  if (!topicId) return undefined;
  return getTopicsForSubject(subjectId).find((t) => t.id === topicId);
}

export function getCategoriesForSubject(subjectId: string | undefined): string[] {
  return Array.from(new Set(getTopicsForSubject(subjectId).map((t) => t.category)));
}
