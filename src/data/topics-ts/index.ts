import type { Topic } from "../../types";

// TS Basics
import { tsIntroductionTopic } from "./tsIntroduction";
import { tsSetupTopic } from "./tsSetup";
import { tsBasicTypesTopic } from "./tsBasicTypes";
import { tsTypeInferenceTopic } from "./tsTypeInference";
import { tsAnyUnknownTopic } from "./tsAnyUnknown";
import { tsVoidNullUndefinedTopic } from "./tsVoidNullUndefined";
import { tsTypeAssertionsTopic } from "./tsTypeAssertions";

// Interfaces & Types
import { tsInterfacesTopic } from "./tsInterfaces";
import { tsTypeAliasesTopic } from "./tsTypeAliases";
import { tsInterfaceVsTypeTopic } from "./tsInterfaceVsType";
import { tsExtendingInterfacesTopic } from "./tsExtendingInterfaces";
import { tsIntersectionTypesTopic } from "./tsIntersectionTypes";
import { tsUnionTypesTopic } from "./tsUnionTypes";
import { tsOptionalReadonlyTopic } from "./tsOptionalReadonly";

// Functions
import { tsFunctionTypesTopic } from "./tsFunctionTypes";
import { tsOptionalDefaultParamsTopic } from "./tsOptionalDefaultParams";
import { tsRestParametersTsTopic } from "./tsRestParametersTs";
import { tsFunctionOverloadsTopic } from "./tsFunctionOverloads";
import { tsThisInFunctionsTopic } from "./tsThisInFunctions";
import { tsVoidNeverTypesTopic } from "./tsVoidNeverTypes";

// Classes & OOP
import { tsClassesTopic } from "./tsClasses";
import { tsAccessModifiersTopic } from "./tsAccessModifiers";
import { tsReadonlyPropertiesTopic } from "./tsReadonlyProperties";
import { tsGettersSettersTopic } from "./tsGettersSetters";
import { tsAbstractClassesTopic } from "./tsAbstractClasses";
import { tsInterfacesWithClassesTopic } from "./tsInterfacesWithClasses";
import { tsStaticMembersTopic } from "./tsStaticMembers";
import { tsClassInheritanceTopic } from "./tsClassInheritance";

// Generics
import { tsGenericsTopic } from "./tsGenerics";
import { tsGenericFunctionsTopic } from "./tsGenericFunctions";
import { tsGenericInterfacesTopic } from "./tsGenericInterfaces";
import { tsGenericClassesTopic } from "./tsGenericClasses";
import { tsGenericConstraintsTopic } from "./tsGenericConstraints";
import { tsDefaultGenericTypesTopic } from "./tsDefaultGenericTypes";

// Advanced Types
import { tsLiteralTypesTopic } from "./tsLiteralTypes";
import { tsEnumsTopic } from "./tsEnums";
import { tsDiscriminatedUnionsTopic } from "./tsDiscriminatedUnions";
import { tsTypeNarrowingTopic } from "./tsTypeNarrowing";
import { tsTypeGuardsTopic } from "./tsTypeGuards";
import { tsMappedTypesTopic } from "./tsMappedTypes";
import { tsUtilityTypesTopic } from "./tsUtilityTypes";
import { tsConditionalTypesTopic } from "./tsConditionalTypes";

// Modules & Configuration
import { tsModulesTopic } from "./tsModules";
import { tsNamespacesTopic } from "./tsNamespaces";
import { tsDeclarationFilesTopic } from "./tsDeclarationFiles";
import { tsConfigBasicsTopic } from "./tsConfigBasics";
import { tsThirdPartyTypesTopic } from "./tsThirdPartyTypes";
import { tsStrictModeTopic } from "./tsStrictMode";

// TypeScript with React
import { tsTypingPropsTopic } from "./tsTypingProps";
import { tsTypingUseStateTopic } from "./tsTypingUseState";
import { tsTypingEventHandlersTopic } from "./tsTypingEventHandlers";
import { tsTypingChildrenTopic } from "./tsTypingChildren";
import { tsTypingRefsTopic } from "./tsTypingRefs";
import { tsTypingCustomHooksTopic } from "./tsTypingCustomHooks";
import { tsGenericComponentsTopic } from "./tsGenericComponents";

export const tsTopics: Topic[] = [
  tsIntroductionTopic,
  tsSetupTopic,
  tsBasicTypesTopic,
  tsTypeInferenceTopic,
  tsAnyUnknownTopic,
  tsVoidNullUndefinedTopic,
  tsTypeAssertionsTopic,

  tsInterfacesTopic,
  tsTypeAliasesTopic,
  tsInterfaceVsTypeTopic,
  tsExtendingInterfacesTopic,
  tsIntersectionTypesTopic,
  tsUnionTypesTopic,
  tsOptionalReadonlyTopic,

  tsFunctionTypesTopic,
  tsOptionalDefaultParamsTopic,
  tsRestParametersTsTopic,
  tsFunctionOverloadsTopic,
  tsThisInFunctionsTopic,
  tsVoidNeverTypesTopic,

  tsClassesTopic,
  tsAccessModifiersTopic,
  tsReadonlyPropertiesTopic,
  tsGettersSettersTopic,
  tsAbstractClassesTopic,
  tsInterfacesWithClassesTopic,
  tsStaticMembersTopic,
  tsClassInheritanceTopic,

  tsGenericsTopic,
  tsGenericFunctionsTopic,
  tsGenericInterfacesTopic,
  tsGenericClassesTopic,
  tsGenericConstraintsTopic,
  tsDefaultGenericTypesTopic,

  tsLiteralTypesTopic,
  tsEnumsTopic,
  tsDiscriminatedUnionsTopic,
  tsTypeNarrowingTopic,
  tsTypeGuardsTopic,
  tsMappedTypesTopic,
  tsUtilityTypesTopic,
  tsConditionalTypesTopic,

  tsModulesTopic,
  tsNamespacesTopic,
  tsDeclarationFilesTopic,
  tsConfigBasicsTopic,
  tsThirdPartyTypesTopic,
  tsStrictModeTopic,

  tsTypingPropsTopic,
  tsTypingUseStateTopic,
  tsTypingEventHandlersTopic,
  tsTypingChildrenTopic,
  tsTypingRefsTopic,
  tsTypingCustomHooksTopic,
  tsGenericComponentsTopic,
];
