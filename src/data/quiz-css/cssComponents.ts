import type { QuizQuestion } from "../../types/quiz";

export const cssComponentsQuestions: QuizQuestion[] = [
  {
    id: "css-components-1",
    question:
      "You want to turn a vertical <ul><li> list of links into a horizontal navigation bar. Which CSS achieves this?",
    type: "single",
    options: [
      "Set 'display: flex;' on the <ul> (and typically reset its default list-style and padding), so the <li> elements line up horizontally as flex items",
      "Set 'display: block;' on each <li>, which automatically arranges list items in a row",
      "Set 'float: none;' on the <ul>, which is the default behavior needed for a horizontal list",
      "Add 'list-style: horizontal;' to the <ul>, a valid CSS value for arranging items in a row",
    ],
    correctIndexes: [0],
    explanation:
      "display: flex on the <ul> turns its <li> children into flex items that default to a horizontal row; the bullet points and default spacing are usually removed too. 'list-style: horizontal' is not a real value, and 'display: block' or 'float: none' don't create a row layout on their own.",
  },
  {
    id: "css-components-2",
    question:
      "In a navigation bar, what is the practical difference between styling with '.nav-link:hover' versus '.nav-link.active'?",
    type: "single",
    options: [
      "':hover' applies temporarily while the mouse pointer is over the link, while '.active' is a plain class toggled (often via JavaScript or client-side routing) to persistently mark the current page's link",
      "They are two names for the exact same pseudo-class and behave identically in every browser",
      "':hover' can only be used on <a> elements, while '.active' can be used on any element including <li>",
      "'.active' only applies while the link is also being hovered at the same time",
    ],
    correctIndexes: [0],
    explanation:
      "':hover' is a pseudo-class the browser applies automatically whenever the cursor sits over the element, and removes the moment the cursor leaves, whereas '.active' is an ordinary class name a developer adds or removes (commonly based on the current route) to keep a 'currently selected' style visible regardless of where the mouse is.",
  },
  {
    id: "css-components-3",
    question:
      "A dropdown menu is built from a parent 'li.dropdown' containing a hidden 'ul.dropdown-menu'. Why must the parent have 'position: relative;' if the dropdown menu itself uses 'position: absolute;'?",
    type: "single",
    options: [
      "An absolutely positioned element is placed relative to its nearest positioned ancestor; without position: relative on the parent, the dropdown menu positions itself against a farther-up ancestor (or the page), landing in the wrong place",
      "'position: relative' is boilerplate syntax required before 'position: absolute' will work anywhere on the page",
      "'position: absolute' only functions correctly when the parent element is also a <ul>",
      "Without 'position: relative' on the parent, the dropdown menu becomes unclickable, though it still renders visually",
    ],
    correctIndexes: [0],
    explanation:
      "An absolutely positioned element is taken out of normal flow and positioned relative to its nearest ancestor whose position is not static. Giving the dropdown's parent 'position: relative' (which otherwise doesn't move it) establishes that reference point, so the menu is anchored directly under its trigger instead of relative to the whole page or another ancestor.",
  },
  {
    id: "css-components-4",
    question:
      "A dropdown submenu uses '.dropdown-menu { display: none; } .dropdown:hover .dropdown-menu { display: block; }', but the submenu is visible on the page at all times, even without hovering. What is the most likely cause?",
    type: "single",
    options: [
      "The base '.dropdown-menu { display: none; }' rule is missing, mistyped, or being overridden by a later/more specific rule, so the default hidden state never actually applies",
      "':hover' cannot be combined with a descendant selector like '.dropdown:hover .dropdown-menu'",
      "'display: none' does not work on <ul> elements, only on <div> elements",
      "Any element nested inside a hovered element is shown by default, regardless of its own display value",
    ],
    correctIndexes: [0],
    explanation:
      "This hover-to-reveal pattern depends on the base rule hiding the menu and a hover-triggered descendant selector showing it again; if the menu is always visible, the hidden rule is most likely absent, mistyped, or beaten by a more specific or later CSS rule (the cascade) — hover works perfectly fine with descendant selectors, and display: none works on any element type.",
  },
  {
    id: "css-components-5",
    question:
      "Which CSS is best suited for a responsive grid of equally sized image thumbnails that automatically wrap onto new rows as the window narrows?",
    type: "single",
    options: [
      "'display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px;' on the gallery container",
      "'display: inline; width: 150px;' set on each thumbnail image",
      "'position: absolute;' on each thumbnail, with manually calculated top/left offsets for every image",
      "'float: left; clear: both;' applied to every thumbnail image",
    ],
    correctIndexes: [0],
    explanation:
      "repeat(auto-fill, minmax(150px, 1fr)) automatically fits as many 150px-or-wider columns as the container allows and wraps the rest onto new rows, giving a responsive thumbnail grid with far less manual work than floats or absolute positioning; 'clear: both' on every item would actually force each thumbnail onto its own line, defeating a multi-column layout.",
  },
  {
    id: "css-components-6",
    question:
      "Which CSS creates a smooth 'zoom on hover' effect for a gallery thumbnail without shifting the layout of surrounding elements?",
    type: "single",
    options: [
      "Give the image 'transition: transform 0.3s;' plus 'transform: scale(1.1);' on ':hover', typically inside a container with 'overflow: hidden;' to clip the enlargement",
      "Change the image's 'width' and 'height' properties directly on ':hover', which resizes it with a built-in animation",
      "Set 'font-size: larger;' on the image element when it is hovered",
      "Switch the image to 'position: absolute;' on hover so it can grow outside of normal flow",
    ],
    correctIndexes: [0],
    explanation:
      "transform: scale() visually enlarges an element without triggering a layout reflow of surrounding content, and pairing it with a transition animates the change smoothly; wrapping the image in an 'overflow: hidden' container clips the enlarged image back to its original footprint. Changing width/height directly can shift neighboring layout and, without a transition, would jump instantly instead of animating.",
  },
  {
    id: "css-components-7",
    question:
      "Which of the following statements about '::before' and '::after' pseudo-elements are true?",
    type: "multi",
    options: [
      "They require a 'content' property to be declared, even as an empty string, or nothing will render",
      "'content: attr(data-tip);' reads its text straight from the element's 'data-tip' HTML attribute",
      "'::before' and '::after' create real DOM nodes that can be selected with 'document.querySelector'",
      "Only one of '::before' or '::after' can be used on a given element at a time",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Both ::before and ::after need an explicit 'content' property (even content: \"\";) before they generate anything visible, and attr() can pull a value directly from an HTML attribute like data-tip; despite appearing in devtools, they are not real DOM nodes and cannot be selected with JavaScript, and a single element can have both a ::before and an ::after at the same time.",
  },
  {
    id: "css-components-8",
    question:
      "A tooltip bubble is hidden by default with 'opacity: 0; visibility: hidden;' and revealed with '.tooltip-trigger:hover .tooltip-bubble { opacity: 1; visibility: visible; }'. Why use both opacity and visibility instead of opacity alone?",
    type: "single",
    options: [
      "'opacity: 0' alone still leaves the element occupying space and receiving hover/click interaction while invisible, while 'visibility: hidden' also removes it from mouse interaction and screen-reader exposure until revealed",
      "'opacity' has no visual effect on an element unless 'visibility' is also set to a matching value",
      "Browsers ignore 'opacity: 0' entirely unless a 'transition' is also declared on the element",
      "'visibility: hidden' is purely a performance optimization and has no effect on interactivity",
    ],
    correctIndexes: [0],
    explanation:
      "An element with only 'opacity: 0' is invisible but still occupies its layout space and can still receive hover, click, or focus events, which can cause an invisible tooltip to accidentally intercept interactions; adding 'visibility: hidden' removes it from interaction and assistive technology entirely while hidden, and toggling both back on hover restores full visibility and interactivity together.",
  },
  {
    id: "css-components-9",
    question:
      "A tooltip bubble needs to appear directly above its trigger element, centered horizontally, no matter where the trigger sits on the page. Which combination of CSS makes this possible?",
    type: "single",
    options: [
      "Give the trigger 'position: relative;' and the bubble 'position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%);'",
      "Give the bubble 'position: fixed; top: 0; left: 0;' so it always renders in the corner nearest the trigger",
      "Give the trigger 'display: inline-block;' only, with no positioning needed on the bubble at all",
      "Give the bubble 'float: top;' to place it directly above the trigger automatically",
    ],
    correctIndexes: [0],
    explanation:
      "Making the trigger 'position: relative' gives the absolutely positioned bubble a local reference point; 'bottom: 100%' places the bubble's bottom edge at the trigger's top edge, and 'left: 50%' combined with 'transform: translateX(-50%)' centers the bubble horizontally over the trigger regardless of the trigger's position on the page. 'float: top' is not a valid CSS value, and 'position: fixed' anchors to the viewport rather than the trigger.",
  },
  {
    id: "css-components-10",
    question:
      "Why is it considered bad practice to write 'input:focus { outline: none; }' without providing any replacement focus style?",
    type: "single",
    options: [
      "It removes the browser's default visual indicator of which element currently has keyboard focus, making the form hard or impossible to navigate for keyboard users and some assistive-technology users",
      "'outline: none' is invalid CSS, so browsers ignore the entire declaration block",
      "It permanently disables the input, so it can no longer receive focus at all",
      "It has no real effect, since 'outline' can only be removed with JavaScript, never with CSS",
    ],
    correctIndexes: [0],
    explanation:
      "The default focus outline is a key accessibility signal that shows keyboard users exactly which control is currently active; removing it with no substitute (such as a custom box-shadow or border change on :focus) leaves keyboard-only users unable to tell where they are on the page, so best practice is to replace, not simply delete, the focus indicator.",
  },
  {
    id: "css-components-11",
    question:
      "Which of the following statements about 'box-sizing: border-box' are true?",
    type: "multi",
    options: [
      "It makes an element's declared width and height include its padding and border, instead of adding them on top",
      "A 200px-wide input with 'box-sizing: border-box' and 10px of padding on each side still renders exactly 200px wide, not 220px",
      "It also folds the element's margin into the declared width",
      "It is the default value of 'box-sizing' in browsers unless a reset overrides it",
    ],
    correctIndexes: [0, 1],
    explanation:
      "border-box counts padding and border inside the declared width/height, which is why a 200px input with 10px padding stays exactly 200px wide rather than growing to 220px; margin is never included in either box-sizing mode, and the actual browser default is 'content-box', which is why resets commonly switch it to border-box for more predictable sizing.",
  },
  {
    id: "css-components-12",
    question:
      "A custom-styled checkbox visually hides the real '<input type=\"checkbox\">' (e.g. with 'opacity: 0' while keeping it in the layout) and styles a sibling <span> to look like the checkbox, toggled via the input's ':checked' state. Why not simply use 'display: none;' on the input instead?",
    type: "single",
    options: [
      "'display: none' removes the input from the layout, the accessibility tree, and the keyboard tab order, so it could no longer be focused, toggled with the keyboard, or announced by screen readers",
      "'display: none' would make the checkbox permanently render as checked",
      "The ':checked' pseudo-class only works on elements styled with 'opacity: 0', never on elements hidden with 'display: none'",
      "There is no real difference; 'display: none' is the standard, fully accessible way to hide the native input",
    ],
    correctIndexes: [0],
    explanation:
      "'display: none' takes an element out of the layout, the accessibility tree, and the tab order entirely, so a checkbox hidden that way could no longer be reached or operated by keyboard or screen reader users; visually hiding it (e.g. with opacity: 0) while keeping it focusable and functional, then styling a sibling element based on its ':checked' state, preserves full keyboard and assistive-technology support.",
  },
  {
    id: "css-components-13",
    question:
      "A button defines '.btn { background: #3498db; } .btn:hover { background: #2980b9; } .btn:active { background: #1f618d; }'. What is the purpose of the separate ':active' rule alongside ':hover'?",
    type: "single",
    options: [
      "':active' gives immediate visual feedback for the moment the button is actually being pressed/clicked, distinct from the lingering ':hover' state that applies the whole time the cursor merely rests over it",
      "':active' is required syntax with no visual purpose of its own, similar to a vendor prefix",
      "':hover' and ':active' always apply at the exact same moment, making the extra rule redundant",
      "':active' only works on <a> elements, never on <button> elements",
    ],
    correctIndexes: [0],
    explanation:
      "':hover' applies for as long as the pointer sits over the element, while ':active' applies only during the actual press/click moment, giving users a distinct tactile-feeling visual cue right as they click that ':hover' alone cannot provide; ':active' works on buttons just as well as on links.",
  },
  {
    id: "css-components-14",
    question:
      "A button has 'button:disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; }'. Which of the following statements about this rule are true?",
    type: "multi",
    options: [
      "':disabled' only matches elements that support the HTML 'disabled' attribute, such as <button>, <input>, and <select>",
      "'pointer-events: none' prevents the disabled button from receiving hover or click interactions, reinforcing that it is inactive",
      "'cursor: not-allowed' itself prevents the button's click handler from firing; it is a functional, not just visual, safeguard",
      "Reducing 'opacity' is the only CSS-approved way to indicate a disabled state; changing color or border is not allowed",
    ],
    correctIndexes: [0, 1],
    explanation:
      "':disabled' matches form controls that support the HTML 'disabled' attribute, and 'pointer-events: none' blocks the element from receiving mouse interaction entirely, reinforcing the disabled state both visually and functionally; 'cursor: not-allowed' only changes the mouse cursor icon and has no effect on whether a click handler runs, and developers are free to use any visual treatment (color, border, opacity, or combinations) to signal a disabled control.",
  },
  {
    id: "css-components-15",
    question:
      "What do 'counter-reset' and 'counter-increment' do when used together, as in 'ol { counter-reset: item; } li { counter-increment: item; }'?",
    type: "single",
    options: [
      "'counter-reset' creates and initializes a named counter (to 0 by default) on the <ol>, and 'counter-increment' increases that named counter by 1 for each <li>, tracking a running count",
      "'counter-reset' permanently disables numbering on the list, while 'counter-increment' re-enables it",
      "Both properties only work inside 'code' or 'pre' elements to number lines in a code block",
      "'counter-increment' resets the counter back to zero every time it runs",
    ],
    correctIndexes: [0],
    explanation:
      "'counter-reset' initializes a named counter (to 0 by default) on the element where it is declared, and 'counter-increment' then adds 1 to that named counter each time it runs, such as once per <li>, which is how CSS can track a running count without any JavaScript.",
  },
  {
    id: "css-components-16",
    question:
      "How is a counter's current value actually displayed on the page, for example to show 'Section 1', 'Section 2', etc. before each heading?",
    type: "single",
    options: [
      "Using 'content: counter(name);' (optionally combined with a string, like 'counter(name) \". \"') inside a '::before' (or '::after') pseudo-element on the counted elements",
      "The counter value is automatically appended as visible text once 'counter-increment' is set, with no further CSS needed",
      "By referencing 'attr(counter-increment)' inside the element's 'content' property",
      "Counters can only be displayed through the HTML <ol> element's built-in numbering, never through custom CSS content",
    ],
    correctIndexes: [0],
    explanation:
      "A counter's numeric value is only rendered onto the page through the 'content' property, most commonly on a ::before pseudo-element, using the counter() function (e.g. content: counter(section) \". \";); simply setting 'counter-increment' tracks the number internally but does not display it anywhere by itself.",
  },
];
