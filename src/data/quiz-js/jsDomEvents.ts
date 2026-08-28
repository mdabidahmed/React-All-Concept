import type { QuizQuestion } from "../../types/quiz";

export const jsDomEventsQuestions: QuizQuestion[] = [
  {
    id: "js-dom-events-1",
    question:
      "What is the DOM (Document Object Model) most accurately described as?",
    type: "single",
    options: [
      "A live, in-memory tree representation of a page's elements that JavaScript can read and modify",
      "The original HTML file exactly as it was downloaded from the server, which never changes",
      "A CSS feature used only to select elements for styling",
      "A network protocol browsers use to request web pages",
    ],
    correctIndexes: [0],
    explanation:
      "The DOM is a live, in-memory object tree the browser builds from HTML markup; JavaScript can query and change it, and those changes are reflected immediately on the rendered page, unlike the original static HTML source.",
  },
  {
    id: "js-dom-events-2",
    question:
      "If a script adds a new <li> to a page with JavaScript, and you then use the browser's 'View Page Source' feature, what will you see?",
    type: "single",
    options: [
      "The original HTML as it was downloaded, without the new <li>, since View Page Source shows the initial document, not the live DOM",
      "The updated HTML including the new <li>, because View Page Source always mirrors the current DOM state",
      "Nothing at all, since adding elements via JavaScript disables View Page Source",
      "The new <li>, but only after the browser cache is cleared",
    ],
    correctIndexes: [0],
    explanation:
      "View Page Source displays the raw HTML document as it was originally served, not the current state of the DOM; to see live changes made by JavaScript, inspect the 'Elements' panel in browser DevTools instead.",
  },
  {
    id: "js-dom-events-3",
    question:
      "Which statement correctly compares document.getElementById('title') and document.querySelector('#title')?",
    type: "single",
    options: [
      "Both select the single element with id='title', but querySelector accepts any valid CSS selector while getElementById only accepts a bare id name (no '#')",
      "getElementById can select multiple elements sharing the same id, while querySelector can only select one",
      "querySelector is guaranteed to be faster in every browser because it skips CSS selector parsing",
      "getElementById requires the '#' prefix, just like querySelector does",
    ],
    correctIndexes: [0],
    explanation:
      "Both methods can find the element with id='title', but getElementById takes a bare id string ('title'), whereas querySelector takes a full CSS selector string ('#title') and can therefore also match by class, attribute, tag, or any other CSS selector.",
  },
  {
    id: "js-dom-events-4",
    question: "What does document.querySelectorAll('.item') return?",
    type: "single",
    options: [
      "A static NodeList of all matching elements, which supports forEach but is not a true Array (so methods like .map() are not available directly)",
      "A true JavaScript Array of all matching elements, with full access to Array methods like .map() and .filter()",
      "Only the first element that matches the '.item' selector",
      "A live HTMLCollection that automatically updates whenever elements are added or removed from the page",
    ],
    correctIndexes: [0],
    explanation:
      "querySelectorAll returns a NodeList, an array-like object that supports forEach() but lacks most Array methods like map() or filter() unless it is first converted, e.g. with Array.from() or the spread operator.",
  },
  {
    id: "js-dom-events-5",
    question:
      "Which of the following statements about DOM selection methods are true?",
    type: "multi",
    options: [
      "document.querySelector() returns only the first element that matches the given CSS selector, or null if none match",
      "document.getElementsByClassName() returns a live HTMLCollection that updates automatically as matching elements are added or removed",
      "document.querySelectorAll() returns matching elements in random order, unrelated to their position in the document",
      "document.getElementById() can accept a CSS selector such as '.container'",
    ],
    correctIndexes: [0, 1],
    explanation:
      "querySelector always returns just the first match (or null), and getElementsByClassName returns a 'live' collection that reflects later DOM changes; querySelectorAll actually returns matches in document order, and getElementById expects a bare id, not a CSS selector.",
  },
  {
    id: "js-dom-events-6",
    question:
      "What is the key difference between setting element.textContent = '<b>Hi</b>' versus element.innerHTML = '<b>Hi</b>'?",
    type: "single",
    options: [
      "textContent inserts the literal characters '<b>Hi</b>' as plain text, while innerHTML parses the string as HTML and renders bold text",
      "innerHTML always escapes HTML tags and shows them as plain text, exactly like textContent",
      "textContent and innerHTML behave identically for any string containing HTML tags",
      "textContent parses the string as HTML, while innerHTML always displays it as literal text",
    ],
    correctIndexes: [0],
    explanation:
      "textContent treats its value as plain text and displays angle brackets literally, whereas innerHTML parses the string as HTML markup, so '<b>Hi</b>' actually renders as bold text; this also makes innerHTML riskier with untrusted input, since it can execute injected markup.",
  },
  {
    id: "js-dom-events-7",
    question:
      "Which is the correct way to change an element's CSS background-color property from JavaScript using the style property?",
    type: "single",
    options: [
      "element.style.backgroundColor = 'yellow';",
      "element.style.background-color = 'yellow';",
      "element.style['background-color: yellow'];",
      "element.style = 'background-color: yellow';",
    ],
    correctIndexes: [0],
    explanation:
      "Hyphenated CSS property names are written in camelCase when accessed as JavaScript properties on the style object, so background-color becomes backgroundColor; option B is invalid syntax because a hyphen cannot appear in unquoted property access.",
  },
  {
    id: "js-dom-events-8",
    question: "Which statements about the classList API are correct?",
    type: "multi",
    options: [
      "element.classList.add('active') adds the 'active' class only if it is not already present",
      "element.classList.remove('active') removes the class if present, and does nothing (no error) if it is already absent",
      "element.classList.toggle('active') always adds the class and can never remove it",
      "element.classList.toggle('active') removes 'active' if it is present, and adds it if it is absent",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "add() only adds a class if it isn't already there (no duplicates are created), remove() safely does nothing when the class is already absent, and toggle() switches the class off if present or on if absent — it does not always add.",
  },
  {
    id: "js-dom-events-9",
    question:
      "What does the following code do? var p = document.createElement('p'); p.textContent = 'Hello'; document.body.appendChild(p);",
    type: "single",
    options: [
      "It creates a new <p> element containing the text 'Hello' and adds it as the last child of <body>",
      "It replaces the entire content of <body> with a single <p> element",
      "It throws an error because createElement requires a second argument specifying the text",
      "It creates the <p> element, but it will not appear on the page until removeChild is also called",
    ],
    correctIndexes: [0],
    explanation:
      "createElement() builds a new, detached element in memory, setting textContent gives it text, and appendChild() attaches it to the DOM as the last child of the target node — here, the end of <body> — making it visible on the page.",
  },
  {
    id: "js-dom-events-10",
    question:
      "Which of these correctly removes an element with id 'box' from the page?",
    type: "single",
    options: [
      "document.getElementById('box').remove();",
      "document.getElementById('box').delete();",
      "document.removeChild('box');",
      "document.getElementById('box').innerHTML = null;",
    ],
    correctIndexes: [0],
    explanation:
      "The modern .remove() method deletes an element directly; the older approach requires calling removeChild() on the element's parent node with a reference to the actual child node (not a string id), so 'document.removeChild(\"box\")' is invalid.",
  },
  {
    id: "js-dom-events-11",
    question:
      "What is an advantage of button.addEventListener('click', handler) over using an inline onclick='handler()' attribute in HTML?",
    type: "single",
    options: [
      "It keeps JavaScript separate from HTML markup and allows multiple independent handlers to be attached to the same event on the same element",
      "It works only in the newest browsers, while inline onclick works everywhere",
      "Inline onclick automatically prevents event bubbling, while addEventListener does not",
      "addEventListener can be attached only once per element, ever",
    ],
    correctIndexes: [0],
    explanation:
      "addEventListener separates behavior from markup (better maintainability) and, unlike assigning a single onclick handler, supports registering multiple independent listeners for the same event on the same element.",
  },
  {
    id: "js-dom-events-12",
    question:
      "What is logged when this code runs and the button is clicked once? btn.onclick = function() { console.log('A'); }; btn.onclick = function() { console.log('B'); }; btn.addEventListener('click', function() { console.log('C'); });",
    type: "single",
    options: [
      "'B' and 'C', because the second onclick assignment overwrites the first, but addEventListener adds an independent listener",
      "'A', 'B', and 'C', because every assignment and every addEventListener call always fires",
      "Only 'A', because the first onclick assignment takes priority over later ones",
      "Nothing, because onclick and addEventListener cannot be mixed on the same element",
    ],
    correctIndexes: [0],
    explanation:
      "Setting element.onclick directly overwrites any previous onclick handler (only the latest one survives), while addEventListener() registers additional listeners that coexist independently, so a single click here logs 'B' then 'C'.",
  },
  {
    id: "js-dom-events-13",
    question:
      "Inside a click handler attached to a <ul>, what does event.target refer to when a user clicks on one of its <li> children?",
    type: "single",
    options: [
      "The specific <li> element that was actually clicked, not necessarily the <ul> the listener is attached to",
      "Always the <ul> element the listener was attached to, regardless of which child was clicked",
      "The document object as a whole",
      "Undefined, because event.target only works for elements the listener is directly attached to",
    ],
    correctIndexes: [0],
    explanation:
      "event.target always refers to the exact element that triggered the event (here, the clicked <li>), while event.currentTarget refers to the element the listener is attached to (the <ul>) — this distinction is what makes event delegation possible.",
  },
  {
    id: "js-dom-events-14",
    question:
      "A form has an onsubmit handler that calls event.preventDefault(). What effect does this have?",
    type: "single",
    options: [
      "It stops the form's default action of submitting and reloading/navigating the page, letting the handler process the data instead",
      "It stops the event from bubbling up to any parent elements",
      "It cancels every other event listener currently registered on the page",
      "It has no effect unless stopPropagation() is also called",
    ],
    correctIndexes: [0],
    explanation:
      "preventDefault() cancels the browser's default behavior for that event — for a form submission, that means stopping the page navigation/reload — so custom JavaScript logic (like validation or a fetch request) can run in its place; it does not affect event bubbling.",
  },
  {
    id: "js-dom-events-15",
    question:
      "A click listener on an outer <div> logs 'outer', and a click listener on an inner <button> logs 'inner' and calls event.stopPropagation(). What is logged when the button is clicked?",
    type: "single",
    options: [
      "Only 'inner', because stopPropagation() prevents the event from bubbling up to the outer <div>'s listener",
      "Only 'outer', because stopPropagation() cancels the button's own handler",
      "Both 'inner' and 'outer', in that order, because stopPropagation() has no effect on already-attached listeners",
      "Neither is logged, because stopPropagation() cancels the click event before any handler runs",
    ],
    correctIndexes: [0],
    explanation:
      "Clicking the button fires its own listener first (logging 'inner'), and by default the event would then bubble up to the outer div's listener; calling stopPropagation() stops that bubbling, so the outer handler never runs.",
  },
  {
    id: "js-dom-events-16",
    question: "Which of the following are true about form validation?",
    type: "multi",
    options: [
      "Adding the 'required' attribute to an <input> prevents the browser from submitting the form until that field has a value, without any JavaScript",
      "A 'pattern' attribute lets you require the input to match a given regular expression before the browser considers it valid",
      "HTML5 validation attributes like 'required' and 'pattern' make server-side validation of the same data completely unnecessary",
      "Manual JavaScript validation can never run custom logic beyond what HTML5 attributes support, such as comparing two fields",
    ],
    correctIndexes: [0, 1],
    explanation:
      "required and pattern give the browser built-in validation with no JavaScript needed, but they can be bypassed (e.g. by disabling JS or calling an API directly), so server-side validation is still necessary; JavaScript can also implement custom checks, like matching two password fields, that HTML5 attributes alone cannot express.",
  },
  {
    id: "js-dom-events-17",
    question:
      "What is logged by the following code? try { console.log('A'); throw new Error('oops'); console.log('B'); } catch (err) { console.log('C'); } finally { console.log('D'); }",
    type: "single",
    options: [
      "'A', 'C', 'D' — 'B' never runs because the thrown error immediately jumps to the catch block, and 'finally' always runs afterward",
      "'A', 'B', 'C', 'D' — every line executes regardless of the thrown error",
      "'A', 'D' — the finally block always skips the catch block entirely",
      "'A', 'C' — the finally block is skipped because an error was already caught",
    ],
    correctIndexes: [0],
    explanation:
      "Once an error is thrown, execution jumps straight to the matching catch block, skipping any remaining code in the try block ('B' never logs); the finally block then runs afterward no matter what, whether or not an error occurred.",
  },
  {
    id: "js-dom-events-18",
    question:
      "Which statements about safely handling JSON.parse('not valid json') are correct?",
    type: "multi",
    options: [
      "Wrapping the call in a try/catch block lets you catch the SyntaxError it throws instead of crashing the script",
      "Inside the catch block, err.message gives a human-readable description of what went wrong",
      "JSON.parse() returns undefined for invalid input instead of throwing, so try/catch is unnecessary",
      "throw can only be used with the Error constructor, never with plain strings or other values",
    ],
    correctIndexes: [0, 1],
    explanation:
      "JSON.parse() throws a SyntaxError on malformed input (it does not silently return undefined), so wrapping it in try/catch is the standard way to handle bad data, and the caught Error object's .message property describes the failure; JavaScript's throw statement can technically throw any value, though throwing an Error object is best practice.",
  },
];
