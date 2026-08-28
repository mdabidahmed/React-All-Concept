import type { QuizQuestion } from "../../types/quiz";

export const nodeNpmDeploymentQuestions: QuizQuestion[] = [
  {
    id: "node-npm-deployment-1",
    question:
      "In package.json, what is the purpose of the \"scripts\" field?",
    type: "single",
    options: [
      "It defines named shell commands (like 'build' or 'lint') that can be run with 'npm run <name>'",
      "It lists the npm packages that should be installed globally",
      "It stores the actual source code files included in the published package",
      "It configures which Node.js version the runtime must use",
    ],
    correctIndexes: [0],
    explanation:
      "The scripts field maps short names to shell commands; running 'npm run build', for example, executes whatever command is defined under the 'build' key.",
  },
  {
    id: "node-npm-deployment-2",
    question:
      "Given \"scripts\": { \"start\": \"node server.js\", \"test\": \"jest\", \"deploy\": \"...\" }, which statements about running these scripts are correct?",
    type: "multi",
    options: [
      "npm start runs the start script without needing the word 'run', because 'start' is one of npm's recognized shorthand script names",
      "npm test runs the test script the same way, without 'run', for the same reason",
      "npm deploy also works directly, because npm automatically shorthands every custom script name",
      "Running the custom 'deploy' script requires typing 'npm run deploy'",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "npm gives only a handful of conventional script names (start, test, stop, restart, and a few others) a top-level shorthand; any other custom name like 'deploy' must be invoked explicitly with 'npm run deploy'.",
  },
  {
    id: "node-npm-deployment-3",
    question:
      "Which statement correctly distinguishes dependencies from devDependencies in package.json?",
    type: "single",
    options: [
      "dependencies lists packages required at runtime (like a web framework), while devDependencies lists packages needed only for development tasks such as testing or linting",
      "devDependencies packages are always installed globally, never locally",
      "There is no real difference; both fields are merged into the same list automatically",
      "dependencies is only used for scoped packages, while devDependencies is used for unscoped ones",
    ],
    correctIndexes: [0],
    explanation:
      "dependencies are needed for the app to run in production, whereas devDependencies cover tools only needed while developing, such as test runners, linters, or bundlers; both are installed by a plain 'npm install', but tooling can be configured to skip devDependencies in production.",
  },
  {
    id: "node-npm-deployment-4",
    question:
      "In package.json, what is the difference between a dependency pinned as \"1.2.3\", one as \"~1.2.3\", and one as \"^1.2.3\"?",
    type: "single",
    options: [
      "\"1.2.3\" allows only that exact version; \"~1.2.3\" allows patch-level updates (1.2.x); \"^1.2.3\" allows minor and patch updates (1.x.x) that don't change the leading non-zero digit",
      "All three ranges behave identically and always install the exact same version",
      "\"^1.2.3\" is the most restrictive, allowing only patch updates, while \"~1.2.3\" allows any newer version",
      "\"1.2.3\" allows any future major version, while \"^1.2.3\" locks to that exact version",
    ],
    correctIndexes: [0],
    explanation:
      "An exact version string installs only that version; a tilde range (~) permits patch-level updates within the same minor version; a caret range (^) permits minor and patch updates that keep the leftmost non-zero version number the same, which for 1.2.3 means anything from 1.2.3 up to (but not including) 2.0.0.",
  },
  {
    id: "node-npm-deployment-5",
    question: "What is the main purpose of package-lock.json?",
    type: "single",
    options: [
      "It records the exact resolved version of every installed package (including nested dependencies), so 'npm install' produces the same dependency tree on every machine",
      "It lists which files should be excluded when the package is published",
      "It stores the environment variables needed to run the app",
      "It replaces package.json entirely once a project has been installed once",
    ],
    correctIndexes: [0],
    explanation:
      "Because semver ranges like ^1.2.3 allow a range of versions, package-lock.json pins down the exact version tree that was actually installed, ensuring reproducible installs across different machines and CI runs.",
  },
  {
    id: "node-npm-deployment-6",
    question:
      "Which command scaffolds a new package.json interactively, prompting for fields like name, version, and entry point?",
    type: "single",
    options: ["npm init", "npm publish", "npm create-package", "npm start"],
    correctIndexes: [0],
    explanation:
      "npm init walks through a series of prompts (or, with -y, fills in sensible defaults) to generate a starting package.json for a new package.",
  },
  {
    id: "node-npm-deployment-7",
    question:
      "Before running 'npm publish' to share a package on the public npm registry, what must be true about the package's \"name\" field?",
    type: "single",
    options: [
      "It must be unique on the registry (or scoped under a unique namespace like '@yourname/package'), since npm rejects publishing a name that's already taken by someone else",
      "It must exactly match the GitHub repository name",
      "It must be a single word with no hyphens or numbers",
      "It has no uniqueness requirement, since npm allows unlimited packages with the same name",
    ],
    correctIndexes: [0],
    explanation:
      "npm's registry is a global namespace for unscoped package names, so publishing fails if the name is already taken; using a scoped name like '@yourname/package' sidesteps that by publishing under your own namespace.",
  },
  {
    id: "node-npm-deployment-8",
    question:
      "What is the typical role of a package like dotenv in a Node.js app?",
    type: "single",
    options: [
      "It reads key-value pairs from a .env file and loads them into process.env so the app can read configuration like API keys without hardcoding them",
      "It compiles TypeScript files into JavaScript before the app starts",
      "It automatically deploys the app to a hosting provider",
      "It replaces package.json with a simpler configuration format",
    ],
    correctIndexes: [0],
    explanation:
      "dotenv parses a .env file's KEY=value lines and assigns them onto process.env at startup, giving the app a convenient way to read local configuration and secrets through the normal process.env interface.",
  },
  {
    id: "node-npm-deployment-9",
    question:
      "Which practices around environment configuration are considered good practice?",
    type: "multi",
    options: [
      "Adding .env to .gitignore so secrets like API keys and database passwords aren't committed to version control",
      "Checking NODE_ENV (e.g. 'development', 'production', 'test') to change app behavior, such as enabling verbose logging only outside production",
      "Committing the team's .env file to the repository so every developer automatically has the same secrets",
      "Hardcoding API keys directly into source files instead of reading them from process.env",
    ],
    correctIndexes: [0, 1],
    explanation:
      "A .env file typically holds secrets and machine-specific config, so it should stay out of version control (usually via .gitignore), and NODE_ENV is a widely used convention for switching behavior between environments; committing secrets or hardcoding them in source both defeat the purpose of externalized configuration.",
  },
  {
    id: "node-npm-deployment-10",
    question:
      "What problem does a process manager like PM2 solve when running a Node.js app in production?",
    type: "single",
    options: [
      "It automatically restarts the app's process if it crashes, and can also help with logging and running multiple instances",
      "It rewrites the app's source code to remove bugs automatically",
      "It replaces the need for a package.json file",
      "It permanently prevents any uncaught exception from ever occurring",
    ],
    correctIndexes: [0],
    explanation:
      "Process managers like PM2 monitor a Node process and automatically restart it if it exits unexpectedly, keeping the app available; they don't fix bugs or eliminate the possibility of crashes, just recover from them.",
  },
  {
    id: "node-npm-deployment-11",
    question:
      "Why do Node.js apps commonly start their server with something like 'app.listen(process.env.PORT || 3000)' instead of a hardcoded port number?",
    type: "single",
    options: [
      "Many hosting platforms dynamically assign a port at runtime through an environment variable, so reading process.env.PORT lets the app bind to whatever port the platform actually expects, falling back to 3000 for local development",
      "process.env.PORT is required syntax and the app will not start without it",
      "Hardcoding a port number is technically impossible in Node.js",
      "process.env.PORT automatically encrypts traffic to the server",
    ],
    correctIndexes: [0],
    explanation:
      "Hosting platforms (like Heroku, Render, or similar) often choose the port dynamically and expose it via process.env.PORT, so an app that ignores this and hardcodes a port may fail to receive any traffic; falling back to a default port keeps local development simple.",
  },
  {
    id: "node-npm-deployment-12",
    question:
      "Why is it common practice to set environment variables directly in a production hosting platform's dashboard or config, rather than deploying the project's .env file to production?",
    type: "single",
    options: [
      "Because .env files are typically excluded from version control and meant for local development secrets; production platforms provide their own secure mechanism to inject env vars without shipping a plaintext secrets file",
      "Because process.env only works when a .env file is absent",
      "Because dotenv refuses to run at all outside of a developer's local machine",
      "Because production servers cannot read files, only environment variables",
    ],
    correctIndexes: [0],
    explanation:
      "Since .env files hold secrets and are usually gitignored, they generally aren't part of what gets deployed; production platforms instead let you configure environment variables through their own secure settings, avoiding the need to ship a plaintext secrets file at all.",
  },
];
