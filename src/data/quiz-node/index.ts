import type { QuizQuestion } from "../../types/quiz";
import { nodeBasicsQuestions } from "./nodeBasics";
import { nodeModulesQuestions } from "./nodeModules";
import { nodeFileSystemQuestions } from "./nodeFileSystem";
import { nodeOsProcessQuestions } from "./nodeOsProcess";
import { nodeHttpServersQuestions } from "./nodeHttpServers";
import { nodeExpressQuestions } from "./nodeExpress";
import { nodeEventsStreamsQuestions } from "./nodeEventsStreams";
import { nodeNpmDeploymentQuestions } from "./nodeNpmDeployment";
import { nodeDatabasesAdvancedQuestions } from "./nodeDatabasesAdvanced";

export { nodeQuizCategoryMeta } from "./categories";

export const nodeQuizQuestionsByCategory: Record<string, QuizQuestion[]> = {
  "node-basics": nodeBasicsQuestions,
  "node-modules": nodeModulesQuestions,
  "node-file-system": nodeFileSystemQuestions,
  "node-os-process": nodeOsProcessQuestions,
  "node-http-servers": nodeHttpServersQuestions,
  "node-express": nodeExpressQuestions,
  "node-events-streams": nodeEventsStreamsQuestions,
  "node-npm-deployment": nodeNpmDeploymentQuestions,
  "node-databases-advanced": nodeDatabasesAdvancedQuestions,
};
