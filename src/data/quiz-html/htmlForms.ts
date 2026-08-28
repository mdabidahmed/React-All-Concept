import type { QuizQuestion } from "../../types/quiz";

export const htmlFormsQuestions: QuizQuestion[] = [
  {
    id: "html-forms-1",
    question: "What is the purpose of the <form> element?",
    type: "single",
    options: [
      "It groups related input controls together so their values can be collected and submitted",
      "It renders a styled box with a border around any content placed inside it",
      "It is required only when a page contains a <table>",
      "It automatically validates all inputs against a built-in dictionary of rules",
    ],
    correctIndexes: [0],
    explanation:
      "A <form> element wraps input controls such as text fields, checkboxes, and buttons so that their collected values can be submitted together, typically to a server.",
  },
  {
    id: "html-forms-2",
    question: "What do the action and method attributes on a <form> element conceptually control?",
    type: "single",
    options: [
      "action specifies where the form data is sent, and method specifies how it is sent (such as get or post)",
      "action specifies the button label, and method specifies the form's background color",
      "action and method both specify which fields are required before submission",
      "action controls client-side validation, and method controls the form's font",
    ],
    correctIndexes: [0],
    explanation:
      "The action attribute gives the URL that will process the submitted data, while the method attribute (commonly get or post) determines how that data is transmitted in the request.",
  },
  {
    id: "html-forms-3",
    question: "Which of the following are true differences between the get and post form submission methods?",
    type: "multi",
    options: [
      "get appends the submitted data to the URL as a query string, while post sends it in the request body",
      "Data submitted with get is visible in the browser's address bar and stored in browser history, unlike a typical post submission",
      "post always encrypts the submitted data over the network, while get never does",
      "get can only be used for uploading files, while post cannot handle file uploads at all",
    ],
    correctIndexes: [0, 1],
    explanation:
      "get exposes the submitted values directly in the URL, which also gets saved in browser history and can be bookmarked, while post keeps values out of the URL in the request body; neither method by itself provides encryption, which instead comes from using HTTPS.",
  },
  {
    id: "html-forms-4",
    question: "Why does pairing a <label> with its input using matching for and id attributes matter for accessibility?",
    type: "single",
    options: [
      "It lets screen readers announce the label when the input is focused, and clicking the label text moves focus to or activates the input",
      "It has no functional effect; labels are purely decorative captions",
      "It is required for the form to submit at all",
      "It only affects the visual font weight of the label text",
    ],
    correctIndexes: [0],
    explanation:
      "Associating a label with its input via for/id creates a programmatic relationship that screen readers use to announce the field's purpose, and it also lets users click the label text to focus or toggle the input, which is especially helpful for small controls like checkboxes.",
  },
  {
    id: "html-forms-5",
    question: "In the markup <label for=\"email\">Email</label><input id=\"email\" type=\"email\">, what happens when a user clicks the word \"Email\"?",
    type: "single",
    options: [
      "Focus moves into the associated input field, as if the user had clicked the input directly",
      "The page navigates to a section with the id email",
      "The input's value is submitted immediately without a submit button",
      "Nothing happens, because the for attribute only affects screen readers, not mouse clicks",
    ],
    correctIndexes: [0],
    explanation:
      "Because the label's for attribute matches the input's id, clicking anywhere on the label text focuses (or, for checkboxes and radios, toggles) the associated input, expanding the clickable target.",
  },
  {
    id: "html-forms-6",
    question: "What does a <select> element combined with <option> elements produce?",
    type: "single",
    options: [
      "A dropdown list from which the user picks one (or more, with multiple) predefined values",
      "A free-text input field with autocomplete suggestions",
      "A group of checkboxes rendered side by side",
      "A button that opens a separate popup window",
    ],
    correctIndexes: [0],
    explanation:
      "<select> creates a dropdown control, and each nested <option> defines one selectable choice; by default the user picks exactly one option unless the multiple attribute is added.",
  },
  {
    id: "html-forms-7",
    question: "How does a <textarea> differ from an <input type=\"text\">?",
    type: "single",
    options: [
      "<textarea> provides a resizable, multi-line text input, while <input type=\"text\"> is a single-line field",
      "<textarea> can only display text and cannot be edited by the user",
      "<input type=\"text\"> supports multiple lines, while <textarea> only supports one line",
      "They are functionally identical, differing only in tag name",
    ],
    correctIndexes: [0],
    explanation:
      "<textarea> is designed for multi-line text entry such as comments or messages and is typically user-resizable, whereas <input type=\"text\"> only accepts a single line of text.",
  },
  {
    id: "html-forms-8",
    question: "What do <fieldset> and <legend> do when used together in a form?",
    type: "single",
    options: [
      "<fieldset> visually and semantically groups related controls, and <legend> provides a caption for that group",
      "<fieldset> submits the form, and <legend> resets it",
      "<fieldset> is a type of input, and <legend> is a type of button",
      "<legend> groups controls, and <fieldset> provides its caption, the reverse of their actual roles",
    ],
    correctIndexes: [0],
    explanation:
      "<fieldset> draws a grouping box around a set of related form controls (such as all fields in a billing address section), and <legend> supplies the visible caption describing that group.",
  },
  {
    id: "html-forms-9",
    question: "Which input types are appropriate for collecting a user's password and a numeric quantity, respectively?",
    type: "single",
    options: ["type=\"password\" and type=\"number\"", "type=\"text\" and type=\"range\"", "type=\"hidden\" and type=\"text\"", "type=\"password\" and type=\"text\""],
    correctIndexes: [0],
    explanation:
      "type=\"password\" masks the characters entered for privacy, and type=\"number\" restricts input to numeric values and typically shows increment/decrement controls.",
  },
  {
    id: "html-forms-10",
    question: "Which of the following are valid, standard HTML <input> type values?",
    type: "multi",
    options: ["email", "date", "checkbox", "textbox"],
    correctIndexes: [0, 1, 2],
    explanation:
      "email, date, and checkbox are all standard input types; \"textbox\" is not a real HTML input type (a single-line text field uses type=\"text\").",
  },
  {
    id: "html-forms-11",
    question: "What is the difference between <input type=\"checkbox\"> and <input type=\"radio\"> when several are grouped together?",
    type: "single",
    options: [
      "Checkboxes allow multiple selections at once, while radio buttons sharing the same name allow only one selection among the group",
      "Radio buttons allow multiple selections at once, while checkboxes allow only one",
      "Checkboxes and radio buttons behave identically but render with different shapes",
      "Radio buttons can only be used inside a <select> element",
    ],
    correctIndexes: [0],
    explanation:
      "Checkboxes are independent, so any number can be checked at once, while radio buttons that share the same name attribute form a mutually exclusive group where selecting one deselects the others.",
  },
  {
    id: "html-forms-12",
    question: "Which of the following statements about the range, color, and file input types are true?",
    type: "multi",
    options: [
      "type=\"range\" renders a draggable slider for picking a numeric value between a minimum and maximum",
      "type=\"color\" opens a widget for the user to pick a color value",
      "type=\"file\" restricts the user to selecting only image files",
      "type=\"range\" displays a calendar widget for picking a date",
    ],
    correctIndexes: [0, 1],
    explanation:
      "range provides a slider bound between min and max values, and color provides a color-picking widget; file lets the user choose any file type unless further restricted with the accept attribute, and range has nothing to do with dates.",
  },
  {
    id: "html-forms-13",
    question: "What is the meaningful difference between the readonly and disabled attributes on an input?",
    type: "single",
    options: [
      "A readonly input's value is still submitted with the form and cannot be edited, while a disabled input cannot be edited and its value is excluded from submission entirely",
      "They behave identically in every respect, including form submission",
      "A disabled input's value is still submitted, while a readonly input's value is excluded",
      "readonly only applies to <textarea>, while disabled only applies to <input>",
    ],
    correctIndexes: [0],
    explanation:
      "Both prevent the user from changing the value, but a readonly field still sends its value when the form is submitted (it is just not editable), while a disabled field is skipped entirely and its value is not included in the submitted data.",
  },
  {
    id: "html-forms-14",
    question: "Which of the following input attributes affect validation or user guidance rather than styling?",
    type: "multi",
    options: ["required", "maxlength", "placeholder", "style"],
    correctIndexes: [0, 1, 2],
    explanation:
      "required prevents submission until the field has a value, maxlength caps how many characters can be entered, and placeholder shows hint text before typing; style is purely a visual/CSS attribute unrelated to validation or guidance.",
  },
  {
    id: "html-forms-15",
    question: "What is the purpose of the placeholder attribute compared to the value attribute on a text input?",
    type: "single",
    options: [
      "placeholder shows faint hint text that disappears once the user types, while value sets the actual pre-filled content that will be submitted",
      "placeholder sets the submitted content, while value shows temporary hint text",
      "They are two names for the same attribute and can be used interchangeably",
      "placeholder only works on <textarea>, while value only works on <input>",
    ],
    correctIndexes: [0],
    explanation:
      "placeholder displays example or hint text inside an empty field that vanishes as soon as the user starts typing and is never submitted, while value sets the field's actual starting content, which is submitted if left unchanged.",
  },
];
