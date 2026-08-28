import type { Topic } from "../../types";

// Node.js Basics
import { nodeIntroductionTopic } from "./nodeIntroduction";
import { nodeArchitectureTopic } from "./nodeArchitecture";
import { nodeVsBrowserTopic } from "./nodeVsBrowser";
import { nodeReplRunningFilesTopic } from "./nodeReplRunningFiles";
import { nodeGlobalObjectTopic } from "./nodeGlobalObject";
import { nodeNpmIntroTopic } from "./nodeNpmIntro";
import { nodePackageJsonTopic } from "./nodePackageJson";

// Modules
import { nodeCommonjsModulesTopic } from "./nodeCommonjsModules";
import { nodeEsModulesTopic } from "./nodeEsModules";
import { nodeBuiltinModulesTopic } from "./nodeBuiltinModules";
import { nodeCustomModulesTopic } from "./nodeCustomModules";
import { nodeModuleWrapperTopic } from "./nodeModuleWrapper";
import { nodeExportingMultipleTopic } from "./nodeExportingMultiple";

// File System
import { nodeFsReadingFilesTopic } from "./nodeFsReadingFiles";
import { nodeFsWritingFilesTopic } from "./nodeFsWritingFiles";
import { nodeFsDirectoriesTopic } from "./nodeFsDirectories";
import { nodePathModuleTopic } from "./nodePathModule";
import { nodeFsSyncVsAsyncTopic } from "./nodeFsSyncVsAsync";
import { nodeFsWatchingTopic } from "./nodeFsWatching";

// OS & Process
import { nodeProcessObjectTopic } from "./nodeProcessObject";
import { nodeOsModuleTopic } from "./nodeOsModule";
import { nodeEnvVariablesTopic } from "./nodeEnvVariables";
import { nodeCommandLineArgsTopic } from "./nodeCommandLineArgs";
import { nodeNextTickImmediateTopic } from "./nodeNextTickImmediate";

// HTTP & Servers
import { nodeHttpServerTopic } from "./nodeHttpServer";
import { nodeHttpRequestResponseTopic } from "./nodeHttpRequestResponse";
import { nodeHttpRoutingTopic } from "./nodeHttpRouting";
import { nodeHttpMethodsTopic } from "./nodeHttpMethods";
import { nodeHttpStaticFilesTopic } from "./nodeHttpStaticFiles";
import { nodeHttpJsonTopic } from "./nodeHttpJson";
import { nodeRestApiBasicsTopic } from "./nodeRestApiBasics";

// Express.js
import { nodeExpressIntroTopic } from "./nodeExpressIntro";
import { nodeExpressRoutingTopic } from "./nodeExpressRouting";
import { nodeExpressMiddlewareTopic } from "./nodeExpressMiddleware";
import { nodeExpressReqResTopic } from "./nodeExpressReqRes";
import { nodeExpressJsonApiTopic } from "./nodeExpressJsonApi";
import { nodeExpressErrorHandlingTopic } from "./nodeExpressErrorHandling";

// Events & Streams
import { nodeEventEmitterTopic } from "./nodeEventEmitter";
import { nodeCustomEventsTopic } from "./nodeCustomEvents";
import { nodeStreamsIntroTopic } from "./nodeStreamsIntro";
import { nodeBuffersTopic } from "./nodeBuffers";
import { nodePipingStreamsTopic } from "./nodePipingStreams";
import { nodeAsyncPatternsHistoryTopic } from "./nodeAsyncPatternsHistory";

// NPM & Deployment
import { nodeNpmScriptsTopic } from "./nodeNpmScripts";
import { nodePackageJsonDeepDiveTopic } from "./nodePackageJsonDeepDive";
import { nodeCreatingPackageTopic } from "./nodeCreatingPackage";
import { nodeEnvConfigTopic } from "./nodeEnvConfig";
import { nodeDeploymentOverviewTopic } from "./nodeDeploymentOverview";

// Databases & Advanced
import { nodeConnectingDatabaseTopic } from "./nodeConnectingDatabase";
import { nodeErrorHandlingTopic } from "./nodeErrorHandling";
import { nodeDebuggingTopic } from "./nodeDebugging";
import { nodeTestingTopic } from "./nodeTesting";

export const nodeTopics: Topic[] = [
  nodeIntroductionTopic,
  nodeArchitectureTopic,
  nodeVsBrowserTopic,
  nodeReplRunningFilesTopic,
  nodeGlobalObjectTopic,
  nodeNpmIntroTopic,
  nodePackageJsonTopic,

  nodeCommonjsModulesTopic,
  nodeEsModulesTopic,
  nodeBuiltinModulesTopic,
  nodeCustomModulesTopic,
  nodeModuleWrapperTopic,
  nodeExportingMultipleTopic,

  nodeFsReadingFilesTopic,
  nodeFsWritingFilesTopic,
  nodeFsDirectoriesTopic,
  nodePathModuleTopic,
  nodeFsSyncVsAsyncTopic,
  nodeFsWatchingTopic,

  nodeProcessObjectTopic,
  nodeOsModuleTopic,
  nodeEnvVariablesTopic,
  nodeCommandLineArgsTopic,
  nodeNextTickImmediateTopic,

  nodeHttpServerTopic,
  nodeHttpRequestResponseTopic,
  nodeHttpRoutingTopic,
  nodeHttpMethodsTopic,
  nodeHttpStaticFilesTopic,
  nodeHttpJsonTopic,
  nodeRestApiBasicsTopic,

  nodeExpressIntroTopic,
  nodeExpressRoutingTopic,
  nodeExpressMiddlewareTopic,
  nodeExpressReqResTopic,
  nodeExpressJsonApiTopic,
  nodeExpressErrorHandlingTopic,

  nodeEventEmitterTopic,
  nodeCustomEventsTopic,
  nodeStreamsIntroTopic,
  nodeBuffersTopic,
  nodePipingStreamsTopic,
  nodeAsyncPatternsHistoryTopic,

  nodeNpmScriptsTopic,
  nodePackageJsonDeepDiveTopic,
  nodeCreatingPackageTopic,
  nodeEnvConfigTopic,
  nodeDeploymentOverviewTopic,

  nodeConnectingDatabaseTopic,
  nodeErrorHandlingTopic,
  nodeDebuggingTopic,
  nodeTestingTopic,
];
