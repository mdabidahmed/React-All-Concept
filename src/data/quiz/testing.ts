import type { QuizQuestion } from "../../types/quiz";

export const testingQuestions: QuizQuestion[] = [
  {
    id: "test-1",
    question:
      "Why are pure functions considered easier to test than functions that rely on side effects?",
    type: "single",
    options: [
      "A pure function always returns the same output for the same input and has no hidden dependencies, so a test only needs to check its return value",
      "Pure functions execute faster than impure functions, which is why their tests run quicker",
      "Pure functions automatically generate their own test cases when the project is built",
      "Pure functions cannot throw errors, so tests never need to check for exceptions",
    ],
    correctIndexes: [0],
    explanation:
      "Purity means a function's behavior depends only on its inputs, so a test can call it directly with sample values and assert on the result without mocking anything else.",
  },
  {
    id: "test-2",
    question:
      "A component fetches data from an API inside a `useEffect` and also renders that data in a table. Why is this harder to test than splitting it into two components?",
    type: "single",
    options: [
      "Testing the rendering logic still requires dealing with the network request, whereas separating a data-fetching container from a presentational component lets each be tested on its own",
      "React does not allow a component to contain both a `useEffect` and JSX in the same file",
      "Combining fetching and rendering always causes an infinite re-render loop",
      "Jest is unable to run any test on a component that defines a `useEffect`",
    ],
    correctIndexes: [0],
    explanation:
      "When fetching and rendering live in one component, a test of the table output still has to satisfy the fetch call; splitting them into a container and a presentational component lets you test the rendering with plain props and the fetching logic separately.",
  },
  {
    id: "test-3",
    question:
      "Which of the following practices make React components easier to unit test? (select 2)",
    type: "multi",
    options: [
      "Extracting business logic into small pure functions or custom hooks kept separate from JSX",
      "Giving components and variables vague, generic names to keep the code compact",
      "Keeping each component focused on a single responsibility",
      "Nesting many conditional branches directly inside JSX to handle every UI state in one place",
    ],
    correctIndexes: [0, 2],
    explanation:
      "Isolating logic into pure functions or hooks and giving each component one clear job both shrink what a single test has to account for, while vague names and deeply nested conditionals obscure intent and hide edge cases.",
  },
  {
    id: "test-4",
    question:
      "What is a practical downside of a component that reaches directly into a specific data-fetching library and a global store from within its own render logic?",
    type: "single",
    options: [
      "It becomes hard to test the component's rendering behavior without also configuring or mocking that fetching library and store",
      "The component will fail to compile because React forbids importing external libraries",
      "The component will automatically lose its props on every re-render",
      "TypeScript will refuse to type-check any component that imports an external library",
    ],
    correctIndexes: [0],
    explanation:
      "Tightly coupling a component to concrete external dependencies means every test of that component must also satisfy those dependencies, instead of simply passing in props or test doubles.",
  },
  {
    id: "test-5",
    question:
      "In the testing pyramid model, how should the number of tests at each level typically compare?",
    type: "single",
    options: [
      "Many fast unit tests at the base, fewer integration tests in the middle, and the fewest end-to-end tests at the top",
      "An equal number of unit, integration, and end-to-end tests at every level",
      "Mostly end-to-end tests, since they best represent real user behavior",
      "Mostly integration tests, with unit and end-to-end tests used only occasionally",
    ],
    correctIndexes: [0],
    explanation:
      "Unit tests are cheap and fast so a project can afford many of them, while integration and especially end-to-end tests are slower and more brittle, so the pyramid recommends writing progressively fewer of them.",
  },
  {
    id: "test-6",
    question:
      "Which option correctly matches each type of test to what it typically verifies?",
    type: "single",
    options: [
      "A unit test checks one small piece of logic in isolation; an integration test checks multiple pieces working together, such as a component and its child components; an end-to-end test exercises the whole real app in a real browser like an actual user",
      "A unit test checks the whole app in a browser; an integration test checks a single function in isolation; an end-to-end test only checks how two functions call each other",
      "All three test types check exactly the same thing, just at different speeds",
      "An end-to-end test only checks that the code compiles, while unit and integration tests check runtime behavior",
    ],
    correctIndexes: [0],
    explanation:
      "Each level targets a different scope: an isolated unit, several collaborating units, or the complete running application experienced the way a real user would use it.",
  },
  {
    id: "test-7",
    question:
      "What does the Arrange-Act-Assert structure describe in a typical test?",
    type: "single",
    options: [
      "First set up the needed data and conditions, then perform the action being tested, then check that the result matches what was expected",
      "First check the expected result, then perform the action, then clean up any setup afterward",
      "A requirement that every test file contain exactly three test cases",
      "The order in which a test runner executes test files within a project",
    ],
    correctIndexes: [0],
    explanation:
      "Arrange-Act-Assert is a common convention for organizing a test into setup, the behavior under test, and verification of the outcome, in that order.",
  },
  {
    id: "test-8",
    question:
      "Which statements accurately describe a 'test double' such as a mock, stub, or spy? (select 2)",
    type: "multi",
    options: [
      "It is a fake stand-in for a real dependency, such as a simulated API response, used so a test does not depend on a real network call",
      "It removes the need to write any assertions in the test that uses it",
      "It can be used to verify that a function was called, without invoking the real implementation it stands in for",
      "It permanently changes the real implementation of the dependency it replaces",
    ],
    correctIndexes: [0, 2],
    explanation:
      "Test doubles substitute for real dependencies during a test run and can also record how they were used, such as tracking calls, but assertions are still needed and the real code is never permanently altered.",
  },
  {
    id: "test-9",
    question:
      "What makes Jest distinct as a testing framework compared to some other test runners?",
    type: "single",
    options: [
      "It bundles a test runner, an assertion library, and mocking utilities together, so no extra libraries are needed to get started",
      "It can only test backend Node.js code and is unable to test React components",
      "It requires a separate assertion library like Chai before any test can run",
      "It only supports snapshot tests and has no matcher-based assertions such as `toBe`",
    ],
    correctIndexes: [0],
    explanation:
      "Jest ships with its own `expect` assertion API and `jest.fn()` mocking support built in, so a project can start writing and running tests without installing anything extra.",
  },
  {
    id: "test-10",
    question:
      "In Jest, what is the purpose of wrapping several related `test` (or `it`) blocks inside a `describe` block?",
    type: "single",
    options: [
      "It groups related tests together under a shared label for organizing output, without changing the fact that each test still runs and reports independently",
      "It causes all the tests wrapped inside to automatically share the same mock functions",
      "It is required syntax, since Jest cannot execute a `test` block unless it sits inside a `describe` block",
      "It runs all the wrapped tests as a single combined test case with one pass or fail result",
    ],
    correctIndexes: [0],
    explanation:
      "`describe` is purely an organizational grouping construct for related tests; each `test`/`it` inside it still executes and is reported as its own independent case.",
  },
  {
    id: "test-11",
    question:
      "Which of the following are built-in Jest matchers usable with `expect`? (select 3)",
    type: "multi",
    options: ["`toBe`", "`toEqual`", "`toContain`", "`shouldEqual`"],
    correctIndexes: [0, 1, 2],
    explanation:
      "`toBe`, `toEqual`, and `toContain` are real Jest matchers; `shouldEqual` is not part of Jest's API and resembles the `should`-style syntax used by separate libraries such as Chai.",
  },
  {
    id: "test-12",
    question:
      "A component calls a function prop named `onSave` when a form is submitted, and `onSave` is passed into the test as `jest.fn()`. Which assertion correctly checks that it was called exactly once?",
    type: "single",
    options: [
      "`expect(onSave).toHaveBeenCalledTimes(1);`",
      "`expect(onSave).toBe(1);`",
      "`expect(onSave.calls.length).toEqual(1);`",
      "`expect(onSave).toContain(1);`",
    ],
    correctIndexes: [0],
    explanation:
      "`jest.fn()` creates a trackable mock function, and `toHaveBeenCalledTimes` is the matcher designed to assert how many times it was invoked; `toBe` and `toContain` are not built for call-count checks.",
  },
  {
    id: "test-13",
    question: "What is the basic idea behind Jest's snapshot testing?",
    type: "single",
    options: [
      "The rendered output is saved the first time a test runs, and later test runs fail if that output unexpectedly changes",
      "It replaces the need for any other kind of assertion in a test suite",
      "It automatically fixes visual bugs it detects in a component's markup",
      "It only works for plain JavaScript objects and can never capture rendered component output",
    ],
    correctIndexes: [0],
    explanation:
      "A snapshot captures output once as a baseline, and future runs are compared against it to catch unexpected differences, but it complements rather than replaces targeted assertions like `toBe` or `toEqual`.",
  },
  {
    id: "test-14",
    question:
      "How does Cypress typically execute a test, compared to a tool that renders components against a simulated in-memory DOM?",
    type: "single",
    options: [
      "It runs the test inside a real browser against the actual running application, rather than against a simulated DOM",
      "It runs entirely inside Node.js without ever opening a browser",
      "It compiles the application into a virtual DOM snapshot and compares it against a stored reference image",
      "It requires the application to be rewritten in a Cypress-specific templating language before it can be tested",
    ],
    correctIndexes: [0],
    explanation:
      "Cypress drives a real browser alongside the real running app, which is what lets it validate genuine user-facing behavior instead of relying on a simulated rendering environment.",
  },
  {
    id: "test-15",
    question:
      "Which sequence of Cypress commands correctly visits a page, selects a submit button, and clicks it?",
    type: "single",
    options: [
      "`cy.visit('/login'); cy.get('button[type=\"submit\"]').click();`",
      "`cy.load('/login'); cy.find('button').press();`",
      "`cy.get('/login'); cy.visit('button').click();`",
      "`cy.render('/login'); cy.select('button').submit();`",
    ],
    correctIndexes: [0],
    explanation:
      "`cy.visit` loads a URL and `cy.get` selects a DOM element by selector, and `.click()` simulates a real user interaction with it; the other snippets use methods that are not part of Cypress's API.",
  },
  {
    id: "test-16",
    question: "What does `cy.contains('Sign in')` do in a Cypress test?",
    type: "single",
    options: [
      "Finds an element on the page containing the text \"Sign in\" so it can be interacted with or asserted on",
      "Asserts that the string \"Sign in\" does not appear anywhere on the page",
      "Sends a network request to a route named \"Sign in\"",
      "Registers a new mock function named \"Sign in\" for later verification",
    ],
    correctIndexes: [0],
    explanation:
      "`cy.contains` locates an element by its visible text content, which is a common way to find buttons or links without relying on brittle CSS selectors.",
  },
  {
    id: "test-17",
    question:
      "Which statements correctly describe how Cypress differs in purpose from Jest? (select 2)",
    type: "multi",
    options: [
      "Cypress is generally used to simulate full user flows through the real running app, while Jest is typically used for fast, isolated unit and integration tests",
      "Cypress tests run inside a real browser, while Jest's typical unit and integration tests do not need a full browser environment for each run",
      "Cypress and Jest are two names for the exact same underlying tool, released by different companies",
      "Jest can only test backend code, so Cypress is required for testing any user interface",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Cypress is built for end-to-end flows in a genuine browser, whereas Jest is optimized for fast unit and integration tests that don't require spinning up a real browser for every run.",
  },
  {
    id: "test-18",
    question: "Unlike Jest, what does Mocha NOT include out of the box?",
    type: "single",
    options: [
      "A built-in assertion library and mocking utilities; these are typically added separately, such as Chai for assertions and Sinon for mocks and spies",
      "Any way to group related tests together",
      "Support for asynchronous test functions",
      "A command-line interface for running tests",
    ],
    correctIndexes: [0],
    explanation:
      "Mocha is a test runner only; projects commonly pair it with Chai for assertions and Sinon for mocking and spying, features that Jest bundles in by default.",
  },
  {
    id: "test-19",
    question: "What is true about Mocha's `describe`/`it` test structure?",
    type: "single",
    options: [
      "Mocha uses a `describe`/`it` structure similar to Jest's, and in fact predates Jest, having helped popularize this BDD-style pattern",
      "Mocha introduced `describe`/`it` after Jest and copied its syntax",
      "Mocha's `describe`/`it` blocks require a paid license for commercial use",
      "Mocha's `it` blocks cannot contain asynchronous code such as an awaited promise",
    ],
    correctIndexes: [0],
    explanation:
      "Mocha is an older tool than Jest and helped establish the now-common `describe`/`it` BDD-style structure that Jest later also adopted.",
  },
  {
    id: "test-20",
    question:
      "Which statements accurately describe the tradeoff between Mocha and Jest? (select 3)",
    type: "multi",
    options: [
      "Mocha offers more flexibility by letting a team choose its own assertion and mocking libraries",
      "Jest offers more out-of-the-box convenience since assertions and mocking are already built in",
      "A team using Mocha typically needs to add a library such as Chai to get expressive assertions like `expect(x).to.equal(y)`",
      "Mocha automatically includes Sinon for mocking with no extra installation required",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Mocha's strength is letting teams assemble their own toolchain, commonly Chai plus Sinon, while Jest trades some of that flexibility for an all-in-one setup that works immediately; Sinon is not bundled with Mocha by default.",
  },
];
