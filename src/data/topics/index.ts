import type { Topic } from "../../types";

// Getting Started
import { reactIntroTopic } from "./reactIntro";
import { reactGetStartedTopic } from "./reactGetStarted";
import { reactFirstAppTopic } from "./reactFirstApp";
import { reactRenderHtmlTopic } from "./reactRenderHtml";
import { reactUpgradeTopic } from "./reactUpgrade";
import { reactEs6Topic } from "./reactEs6";

// JSX
import { reactJsxIntroTopic } from "./reactJsxIntro";
import { reactJsxExpressionsTopic } from "./reactJsxExpressions";
import { reactJsxAttributesTopic } from "./reactJsxAttributes";
import { reactJsxIfStatementsTopic } from "./reactJsxIfStatements";

// Components
import { reactComponentsTopic } from "./reactComponents";
import { reactClassTopic } from "./reactClass";
import { reactPropsTopic } from "./reactProps";
import { reactPropsDestructuringTopic } from "./reactPropsDestructuring";
import { reactPropsChildrenTopic } from "./reactPropsChildren";
import { reactEventsTopic } from "./reactEvents";
import { reactConditionalsTopic } from "./reactConditionals";
import { reactListsTopic } from "./reactLists";

// Forms
import { reactFormsTopic } from "./reactForms";
import { reactFormsSubmitTopic } from "./reactFormsSubmit";
import { reactTextareaTopic } from "./reactTextarea";
import { reactSelectTopic } from "./reactSelect";
import { reactMultipleInputsTopic } from "./reactMultipleInputs";
import { reactCheckboxTopic } from "./reactCheckbox";
import { reactRadioTopic } from "./reactRadio";

// Advanced
import { reactPortalsTopic } from "./reactPortals";
import { reactSuspenseTopic } from "./reactSuspense";
import { reactForwardRefTopic } from "./reactForwardRef";
import { reactHocTopic } from "./reactHoc";

// Styling
import { reactCssStylingTopic } from "./reactCssStyling";
import { reactCssModulesTopic } from "./reactCssModules";
import { reactCssInJsTopic } from "./reactCssInJs";

// Routing & Motion
import { reactRouterTopic } from "./reactRouter";
import { reactTransitionsTopic } from "./reactTransitions";

// Core Hooks
import { hooksIntroTopic } from "./hooksIntro";
import { useStateTopic } from "./useState";
import { useEffectTopic } from "./useEffect";
import { useContextTopic } from "./useContext";
import { useReducerTopic } from "./useReducer";
import { useRefTopic } from "./useRef";

// Performance
import { useMemoCallbackTopic } from "./useMemoCallback";

// Composition
import { customHooksTopic } from "./customHooks";

// Advanced Patterns
import { advancedHocPatternTopic } from "./advancedHocPattern";
import { renderPropsPatternTopic } from "./renderPropsPattern";
import { containerPresentationalPatternTopic } from "./containerPresentationalPattern";
import { reactReconciliationTopic } from "./reactReconciliation";
import { debounceThrottleTopic } from "./debounceThrottle";

// Testing
import { writeCleanCodeTopic } from "./writeCleanCode";
import { whatIsTestingTopic } from "./whatIsTesting";
import { testingJestTopic } from "./testingJest";
import { testingCypressTopic } from "./testingCypress";
import { testingMochaTopic } from "./testingMocha";

export const topics: Topic[] = [
  reactIntroTopic,
  reactGetStartedTopic,
  reactFirstAppTopic,
  reactRenderHtmlTopic,
  reactUpgradeTopic,
  reactEs6Topic,

  reactJsxIntroTopic,
  reactJsxExpressionsTopic,
  reactJsxAttributesTopic,
  reactJsxIfStatementsTopic,

  reactComponentsTopic,
  reactClassTopic,
  reactPropsTopic,
  reactPropsDestructuringTopic,
  reactPropsChildrenTopic,
  reactEventsTopic,
  reactConditionalsTopic,
  reactListsTopic,

  reactFormsTopic,
  reactFormsSubmitTopic,
  reactTextareaTopic,
  reactSelectTopic,
  reactMultipleInputsTopic,
  reactCheckboxTopic,
  reactRadioTopic,

  reactPortalsTopic,
  reactSuspenseTopic,
  reactForwardRefTopic,
  reactHocTopic,

  reactCssStylingTopic,
  reactCssModulesTopic,
  reactCssInJsTopic,

  reactRouterTopic,
  reactTransitionsTopic,

  hooksIntroTopic,
  useStateTopic,
  useEffectTopic,
  useContextTopic,
  useReducerTopic,
  useRefTopic,

  useMemoCallbackTopic,

  customHooksTopic,

  advancedHocPatternTopic,
  renderPropsPatternTopic,
  containerPresentationalPatternTopic,
  reactReconciliationTopic,
  debounceThrottleTopic,

  writeCleanCodeTopic,
  whatIsTestingTopic,
  testingJestTopic,
  testingCypressTopic,
  testingMochaTopic,
];

export function getTopicById(id: string | undefined): Topic | undefined {
  if (!id) return undefined;
  return topics.find((topic) => topic.id === id);
}

export const categories: string[] = Array.from(new Set(topics.map((t) => t.category)));
