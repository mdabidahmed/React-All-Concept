import type { Topic } from "../../types";
import { useStateTopic } from "./useState";
import { useEffectTopic } from "./useEffect";
import { useContextTopic } from "./useContext";
import { useReducerTopic } from "./useReducer";
import { useMemoCallbackTopic } from "./useMemoCallback";
import { useRefTopic } from "./useRef";
import { customHooksTopic } from "./customHooks";
import { propsCompositionTopic } from "./propsComposition";

export const topics: Topic[] = [
  useStateTopic,
  useEffectTopic,
  useContextTopic,
  useReducerTopic,
  useRefTopic,
  useMemoCallbackTopic,
  customHooksTopic,
  propsCompositionTopic,
];

export function getTopicById(id: string | undefined): Topic | undefined {
  if (!id) return undefined;
  return topics.find((topic) => topic.id === id);
}

export const categories: string[] = Array.from(new Set(topics.map((t) => t.category)));
