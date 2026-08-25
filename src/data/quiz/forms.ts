import type { QuizQuestion } from "../../types/quiz";

export const formsQuestions: QuizQuestion[] = [
  {
    id: "form-1",
    question: "What is the key difference between a controlled and an uncontrolled form input in React?",
    type: "single",
    options: [
      "A controlled input's value is driven by React state via value and onChange, while an uncontrolled input manages its own value internally and is typically read with a ref",
      "A controlled input can only be an input of type text, while an uncontrolled input can be any other input type",
      "An uncontrolled input cannot have an onChange handler at all",
      "A controlled input updates the DOM directly without triggering a React re-render",
    ],
    correctIndexes: [0],
    explanation:
      "Controlled inputs store their current value in React state and update it through onChange, whereas uncontrolled inputs keep their value in the DOM itself, commonly accessed via useRef when needed.",
  },
  {
    id: "form-2",
    question: "Which pattern correctly implements a controlled text input in a function component?",
    type: "single",
    options: [
      "`<input value={name} onChange={(e) => setName(e.target.value)} />`",
      "`<input defaultValue={name} onUpdate={(e) => setName(e.target.value)} />`",
      "`<input value={name} />` with no onChange handler, relying on React to update the state automatically",
      "`<input value={name} onChange={setName} />` passing the event object directly to setName",
    ],
    correctIndexes: [0],
    explanation:
      "A controlled input needs both value bound to state and an onChange handler that reads e.target.value to update that state; passing the raw event straight to setName would store the event object instead of the string value.",
  },
  {
    id: "form-3",
    question:
      "How do you make a `<textarea>` a controlled element in React, and how does this differ from plain HTML?",
    type: "single",
    options: [
      "By using a value prop and an onChange handler, the same pattern as a text input, unlike HTML where a textarea's content is set as text between its opening and closing tags",
      "By setting innerText directly on the textarea element inside JSX",
      "By using a content prop, since value is not supported on textareas in React",
      "Textareas cannot be controlled components in React; only inputs and selects can be",
    ],
    correctIndexes: [0],
    explanation:
      "Unlike plain HTML, where a textarea's initial text goes between its opening and closing tags, React textareas use a value prop just like text inputs, keeping the API consistent across form elements.",
  },
  {
    id: "form-4",
    question: "How do you set which `<option>` is selected in a controlled `<select>` element in React?",
    type: "single",
    options: [
      "By setting the value prop on the select element itself to match the desired option's value, rather than adding a selected attribute to the option",
      "By adding the selected attribute directly to the desired option element, as in plain HTML",
      "By setting defaultChecked on the select element",
      "By rendering only the desired option and omitting the others",
    ],
    correctIndexes: [0],
    explanation:
      "React handles selection at the select level via its value prop, which is more convenient than manually toggling a selected attribute on individual options as in plain HTML.",
  },
  {
    id: "form-5",
    question: "Which of the following are true about using a `<select multiple>` element as a controlled component in React?",
    type: "multi",
    options: [
      "The value prop should be an array of the selected option values, rather than a single string",
      "The onChange handler typically reads e.target.selectedOptions (or iterates e.target.options) to determine which options are now selected",
      "React does not support the multiple attribute on select, so it must always be handled as an uncontrolled element",
      "Each option must have its own individual onChange handler for multi-select to work",
    ],
    correctIndexes: [0, 1],
    explanation:
      "A multi-select's controlled value is an array of selected values, and since there is no single e.target.value for multiple selections, the change handler reads the selected options from the select element itself.",
  },
  {
    id: "form-6",
    question: "How do you make a checkbox a controlled component in React?",
    type: "single",
    options: [
      "Bind its checked prop to a boolean state value and update that state in onChange, e.g. `checked={agreed}` with `onChange={(e) => setAgreed(e.target.checked)}`",
      "Bind its value prop to a boolean state value, the same way as a text input",
      "Use the selected prop, since checkboxes and select options share the same API",
      "Checkboxes cannot be controlled; they must always be read with a ref",
    ],
    correctIndexes: [0],
    explanation:
      "Checkboxes use the boolean checked prop rather than value, and the handler reads e.target.checked (a boolean) instead of e.target.value (a string).",
  },
  {
    id: "form-7",
    question:
      "How do you implement a group of radio buttons as controlled components sharing one selected value in React?",
    type: "single",
    options: [
      "Give each radio input the same name attribute, set checked by comparing its own value to the shared state, and update that state in a common onChange handler",
      "Give each radio button a different name attribute so React can track them as a single group automatically",
      "Only the first radio button in the group needs an onChange handler; the rest are automatically deselected",
      "Use defaultChecked on the option matching the current state, since checked does not work with radio inputs",
    ],
    correctIndexes: [0],
    explanation:
      "Radio buttons in a group share a name (for accessibility and native grouping), but in React each button's checked state is individually derived by comparing its own value against the single piece of state that tracks the current selection.",
  },
  {
    id: "form-8",
    question:
      "You have several text inputs and want to handle changes to all of them with a single function. Which of the following are part of the standard pattern for this?",
    type: "multi",
    options: [
      "Give each input a name attribute matching a key in your state object",
      "Read e.target.name and e.target.value inside the shared handler",
      "Use a computed property key to update just that field, e.g. `setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))`",
      "Create a separate useState call for every possible input name and switch between them using if statements in the handler",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "The common pattern stores all fields in one state object, tags each input with a name matching a state key, and uses e.target.name/e.target.value with a computed property key to update only the changed field; a separate useState call per field would defeat the purpose of sharing one handler.",
  },
  {
    id: "form-9",
    question: "Why is `e.preventDefault()` typically called inside a form's onSubmit handler in a React app?",
    type: "single",
    options: [
      "To stop the browser's default behavior of reloading the page and sending a full HTTP request when the form is submitted",
      "To prevent the onChange handlers on the form's inputs from firing again",
      "To stop React from re-rendering the component after submission",
      "To automatically clear all input values after submission",
    ],
    correctIndexes: [0],
    explanation:
      "Without preventDefault(), submitting a form triggers the browser's native full-page navigation and reload, which would discard the React application's state; calling it lets the app handle submission with JavaScript instead.",
  },
  {
    id: "form-10",
    question: "Which of the following are common approaches to validating form input in a React application?",
    type: "multi",
    options: [
      "Using built-in HTML validation attributes like required, minLength, or type=\"email\" on the input elements",
      "Writing custom validation logic in JavaScript that runs in the submit handler (or on each change) and stores error messages in state",
      "Validation can only be performed on a backend server; React provides no way to validate input client-side",
      "Relying on the browser's alert() function as the only mechanism available for showing validation errors",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Real-world React forms typically combine native HTML validation attributes with custom JavaScript validation logic that tracks error state for more control over messaging and UX; client-side validation is fully possible and common, though server-side validation is still needed for security.",
  },
];
