import type { QuizQuestion } from "../../types/quiz";

export const stylingQuestions: QuizQuestion[] = [
  {
    id: "style-1",
    question: "In JSX, which attribute is used to apply a CSS class to an element?",
    type: "single",
    options: ["`className`", "`class`", "`cssClass`", "`styleName`"],
    correctIndexes: [0],
    explanation:
      "JSX uses `className` instead of the HTML `class` attribute, and React maps it to the DOM element's `class` attribute at render time.",
  },
  {
    id: "style-2",
    question: "Why doesn't JSX use the plain `class` attribute the way HTML does?",
    type: "single",
    options: [
      "`class` is a reserved keyword in JavaScript, used for defining classes, so JSX needs a different prop name to avoid the collision",
      "Browsers don't support the `class` attribute inside JSX syntax",
      "`className` renders faster than `class` during virtual DOM diffing",
      "React deprecated `class` in favor of `id` for all styling",
    ],
    correctIndexes: [0],
    explanation:
      "Since JSX compiles to JavaScript, an attribute name matching a language keyword like `class` would be ambiguous, so React chose `className` to sidestep that conflict.",
  },
  {
    id: "style-3",
    question: "Which is valid syntax for applying an inline style to a `<div>` in JSX?",
    type: "single",
    options: [
      "`<div style={{ backgroundColor: 'blue', fontSize: 14 }} />`",
      "`<div style='background-color: blue; font-size: 14px;' />`",
      "`<div style={backgroundColor: 'blue'} />`",
      "`<div styles={{ backgroundColor: 'blue' }} />`",
    ],
    correctIndexes: [0],
    explanation:
      "The `style` prop takes a JavaScript object, not a CSS string, so it needs a double pair of curly braces: one for the JSX expression and one for the object literal, with camelCase property names.",
  },
  {
    id: "style-4",
    question: "In a `style` prop object, how should the CSS property `background-color` be written?",
    type: "single",
    options: ["`backgroundColor`", "`background-color`", "`BackgroundColor`", "`background_color`"],
    correctIndexes: [0],
    explanation:
      "Because the style object's keys are JavaScript identifiers, hyphenated CSS property names are written in camelCase instead of kebab-case.",
  },
  {
    id: "style-5",
    question: "Given `<div style={{ marginTop: 20 }} />`, what unit does React apply to the number `20`?",
    type: "single",
    options: [
      "Pixels, since most numeric length-related style properties are treated as pixel values by default",
      "Percent",
      "`rem`, matching the root font size",
      "No unit is applied, so the browser ignores the property entirely",
    ],
    correctIndexes: [0],
    explanation:
      "For most length-related CSS properties, React appends `px` automatically when the value is a plain number, though a handful of unitless properties are left as-is.",
  },
  {
    id: "style-6",
    question:
      "Which CSS property is a well-known exception that stays unitless when given a plain number in a React `style` object?",
    type: "single",
    options: ["`opacity`", "`width`", "`marginLeft`", "`paddingTop`"],
    correctIndexes: [0],
    explanation:
      "`opacity`, along with properties like `zIndex`, `flex`, and `lineHeight`, is on React's list of unitless properties, so a number like `0.5` is used as-is rather than becoming `0.5px`.",
  },
  {
    id: "style-7",
    question: "What is the naming convention for a CSS Modules file?",
    type: "single",
    options: ["`Button.module.css`", "`Button.scoped.css`", "`Button.local.css`", "`module.Button.css`"],
    correctIndexes: [0],
    explanation:
      "Build tools like Vite recognize the `.module.css` suffix and treat that file's class names as locally scoped instead of global.",
  },
  {
    id: "style-8",
    question:
      "After `import styles from './Button.module.css'`, how do you apply a class named `.primary` from that file to a JSX element?",
    type: "single",
    options: [
      "`<button className={styles.primary}>`",
      "`<button className='primary'>`",
      "`<button style={styles.primary}>`",
      "`<button class={styles.primary}>`",
    ],
    correctIndexes: [0],
    explanation:
      "CSS Modules exposes the file's class names as properties on the imported object, and the tooling rewrites them to unique generated names, so you reference them through `styles.primary` rather than the literal string.",
  },
  {
    id: "style-9",
    question: "What problem do CSS Modules primarily solve?",
    type: "single",
    options: [
      "Global class name collisions, by rewriting each class name to something unique to the file that defined it",
      "Slow CSS parsing performance in large stylesheets",
      "The inability to use pseudo-classes like `:hover` in CSS",
      "The need to write vendor prefixes for older browsers",
    ],
    correctIndexes: [0],
    explanation:
      "Plain CSS files share one global namespace, so two components using the same class name like `.card` can clash; CSS Modules avoids this by generating a unique class name per file at build time.",
  },
  {
    id: "style-10",
    question:
      "What best describes the CSS-in-JS approach used by libraries like styled-components or Emotion?",
    type: "single",
    options: [
      "Component-scoped styles are written using JavaScript template literals or objects, and the library generates and injects the actual CSS at runtime or build time",
      "It compiles CSS Modules into plain CSS files ahead of time with no library code running in the browser",
      "It replaces the `style` prop with a required `css` HTML attribute",
      "It only works with class components, not function components",
    ],
    correctIndexes: [0],
    explanation:
      "CSS-in-JS libraries let you author styles alongside your component code using tagged template literals or style objects, then handle generating class names and inserting the resulting CSS into the page.",
  },
  {
    id: "style-11",
    question: "Which are commonly cited trade-offs of runtime CSS-in-JS libraries compared to CSS Modules?",
    type: "multi",
    options: [
      "They can add a small performance and bundle-size cost from the styling library itself running in the browser",
      "Styles can be colocated with component logic and easily reference JS values like props or theme variables directly in the style definition",
      "They make it technically impossible to reuse a style across two different components",
      "CSS Modules always produce a smaller total CSS bundle than any CSS-in-JS library, in every project",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Runtime-oriented CSS-in-JS trades some bundle size and runtime overhead for the convenience of colocating styles with component logic and easily threading in dynamic JS values, while CSS Modules stay closer to plain, statically extracted CSS.",
  },
  {
    id: "style-12",
    question:
      "Which expression conditionally applies an `active` class only when `isActive` is true, using a template literal?",
    type: "single",
    options: [
      "`className={`item ${isActive ? 'active' : ''}`}`",
      "`className={isActive && 'active' || 'item'}`",
      "`className='item' active={isActive}`",
      "`className={item.active}`",
    ],
    correctIndexes: [0],
    explanation:
      "A template literal lets you build the class string dynamically, appending `active` only when the condition is true and otherwise leaving it out.",
  },
  {
    id: "style-13",
    question:
      "What is a CSS custom property, or CSS variable, such as `--primary-color: teal;`, typically used for in a themeable React app?",
    type: "single",
    options: [
      "Defining a reusable value at a scope like `:root` or a wrapper element, which CSS rules can reference with `var(--primary-color)` and which can be swapped by changing the variable rather than every rule",
      "Declaring a new HTML element that React can render",
      "Creating a private, component-scoped React state value",
      "Replacing the need for the `style` prop entirely in every component",
    ],
    correctIndexes: [0],
    explanation:
      "Custom properties are inherited and can be reassigned at any scope, so toggling a theme often means changing the variable's value once, such as on `<html data-theme='dark'>`, instead of rewriting every rule that uses it.",
  },
  {
    id: "style-14",
    question: "Which snippet updates a CSS custom property from React to change a theme color at runtime?",
    type: "single",
    options: [
      "`document.documentElement.style.setProperty('--primary-color', 'navy');`",
      "`document.documentElement.className = '--primary-color: navy';`",
      "`document.documentElement.style.primaryColor = 'navy';`",
      "`useState('--primary-color', 'navy');`",
    ],
    correctIndexes: [0],
    explanation:
      "`style.setProperty` is the DOM API for setting a custom property's value directly on an element, and setting it on the root element makes it available to descendant CSS through `var(--primary-color)`.",
  },
  {
    id: "style-15",
    question:
      "A list item should get the class `selected` conditionally alongside its base `list-item` class, without a third-party library. Which is idiomatic in plain React?",
    type: "single",
    options: [
      "`className={`list-item ${isSelected ? 'selected' : ''}`.trim()}`",
      "`className='list-item selected' if={isSelected}`",
      "`<li className:selected={isSelected}>`",
      "`className={isSelected}`",
    ],
    correctIndexes: [0],
    explanation:
      "Since `className` just expects a string, building it conditionally with a template literal, or a small helper like `clsx`, is the standard approach; there is no special JSX syntax for conditional classes.",
  },
  {
    id: "style-16",
    question: "Which statements about CSS Modules class names are accurate?",
    type: "multi",
    options: [
      "The generated class name in the final HTML is typically not the literal `primary`, but something like `Button_primary__a1b2c`",
      "Two different `*.module.css` files can each define `.card` without their styles colliding in the final output",
      "CSS Modules automatically convert every class name into an inline `style` object at build time",
      "CSS Modules require every component that uses them to be a class component",
    ],
    correctIndexes: [0, 1],
    explanation:
      "The build tool rewrites each local class name to a unique, hashed name scoped to its source file, which is exactly why two files can both use `.card` without conflict.",
  },
  {
    id: "style-17",
    question:
      "Which are true differences between styling with a plain `.css` file plus `className` and styling with the inline `style` prop?",
    type: "multi",
    options: [
      "A stylesheet can use selectors like `:hover`, `::before`, and `@media` queries, while the `style` prop can only set direct property-value pairs on that one element",
      "Class-based styles defined in an external `.css` file are automatically scoped to the single component that imports them",
      "Both approaches can coexist on the same element, with inline styles winning over conflicting stylesheet rules due to specificity",
      "The `style` prop is the only way to change a property based on component state",
    ],
    correctIndexes: [0, 2],
    explanation:
      "Plain CSS supports pseudo-classes and media queries that inline styles cannot express, and when both are applied, inline styles take precedence; but state-driven styling can just as easily be done by toggling class names instead of using the `style` prop, and plain CSS is not scoped unless a tool like CSS Modules is used.",
  },
  {
    id: "style-18",
    question: "Which of these are true about the `style` prop in React?",
    type: "multi",
    options: [
      "Its value must be a JavaScript object, not a CSS string",
      "Property names are written in camelCase rather than kebab-case",
      "Styles passed this way take precedence over conflicting styles from a linked stylesheet, because they're applied as the element's inline style",
      "It supports defining `:hover` and other pseudo-class styles directly as object keys",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "The `style` prop is an object with camelCase keys applied as the DOM element's inline style, which wins over stylesheet rules due to normal CSS specificity, but it has no way to express pseudo-classes or pseudo-elements since it isn't a CSS rule.",
  },
  {
    id: "style-19",
    question:
      "A team wants styles scoped per component with zero runtime JavaScript cost and good compatibility with static build tooling. Which approach best fits that goal?",
    type: "single",
    options: [
      "CSS Modules, since class names are resolved and the CSS is extracted at build time with no styling library running in the browser",
      "One large shared global stylesheet with an informal naming convention",
      "Inline styles on every element for every property, including hover and focus states",
      "A runtime CSS-in-JS library that injects `<style>` tags on every render",
    ],
    correctIndexes: [0],
    explanation:
      "CSS Modules resolve scoping at build time and produce plain static CSS, avoiding both the global-namespace risk of one big stylesheet and the runtime overhead of a CSS-in-JS library.",
  },
  {
    id: "style-20",
    question: "Which statements correctly compare `class` and `className`?",
    type: "multi",
    options: [
      "`class` is the standard HTML attribute; `className` is the prop React expects in JSX for the same purpose",
      "At the DOM level, after React renders, the element still ends up with an actual `class` attribute containing the given class names",
      "`className` and `class` can both be used interchangeably in JSX with identical behavior and no warnings",
      "Using `class` instead of `className` in JSX still sets the attribute, but React logs a console warning recommending `className`",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "React renamed the prop to `className` to avoid the JavaScript keyword collision, but the DOM node still ends up with a real `class` attribute; writing `class` directly in JSX works but triggers React's invalid-DOM-property warning suggesting `className`.",
  },
];
