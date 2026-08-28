import type { QuizQuestion } from "../../types/quiz";

export const htmlStructureQuestions: QuizQuestion[] = [
  {
    id: "html-structure-1",
    question: "What are the three ways CSS can be added to an HTML page?",
    type: "single",
    options: [
      "Inline (a style attribute), internal (a <style> block), and external (a linked .css file)",
      "Inline, embedded, and imported, all of which require a build tool",
      "Only external stylesheets are valid; inline and internal styles are deprecated",
      "Class-based, id-based, and tag-based, referring to three different selector types",
    ],
    correctIndexes: [0],
    explanation:
      "CSS can be applied directly on an element with the style attribute (inline), inside a <style> element in the document head (internal), or in a separate .css file referenced with a <link> element (external).",
  },
  {
    id: "html-structure-2",
    question: "Which of the following are genuine benefits of using an external stylesheet across a multi-page website?",
    type: "multi",
    options: [
      "A single shared .css file can be updated once to change the styling of every page that links it",
      "It avoids duplicating the same CSS rules inside every individual HTML file",
      "External stylesheets are the only method capable of specifying colors and fonts",
      "Using an external stylesheet guarantees there will never be a flash of unstyled content",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Centralizing styles in one linked file lets a single edit update every page that references it and avoids copy-pasting the same rules into each HTML file; inline and internal styles can set colors and fonts too, and external sheets do not guarantee zero flash of unstyled content.",
  },
  {
    id: "html-structure-3",
    question: "What is the difference between an absolute URL and a relative URL in a link's href attribute?",
    type: "single",
    options: [
      "An absolute URL points to another web location including the domain, while a relative URL points to a file within the same website",
      "An absolute URL only works for images, while a relative URL only works for text links",
      "A relative URL must always start with https://, while an absolute URL never includes a protocol",
      "There is no functional difference; the terms describe the same kind of link",
    ],
    correctIndexes: [0],
    explanation:
      "An absolute URL is a full address including the protocol and domain (like https://example.com/page.html), while a relative URL omits the domain and is resolved against the current page's location within the same site.",
  },
  {
    id: "html-structure-4",
    question: "Which of the following are true about target=\"_blank\" and rel=\"noreferrer\" on an anchor tag?",
    type: "multi",
    options: [
      "target=\"_blank\" opens the linked document in a new tab or window",
      "rel=\"noreferrer\" prevents the newly opened page from accessing the originating window through window.opener",
      "target=\"_blank\" disables the link until the page finishes loading",
      "rel=\"noreferrer\" forces the link to open in the same tab instead of a new one",
    ],
    correctIndexes: [0, 1],
    explanation:
      "target=\"_blank\" opens a new browsing context for the link, and adding rel=\"noreferrer\" (or rel=\"noopener\") blocks the new page from reaching back into the page that opened it, which is a common security precaution.",
  },
  {
    id: "html-structure-5",
    question: "What does the following link do? <a href=\"mailto:someone@example.com\">Email us</a>",
    type: "single",
    options: [
      "It opens the visitor's default email client with a new message addressed to someone@example.com",
      "It sends an email automatically in the background without any user interaction",
      "It navigates to a webpage located at the address someone@example.com",
      "It only works if placed inside a <form> element",
    ],
    correctIndexes: [0],
    explanation:
      "The mailto: URI scheme tells the browser to hand off to the user's configured email application with a compose window pre-addressed to the given address, rather than navigating to a webpage.",
  },
  {
    id: "html-structure-6",
    question: "Given an element <h2 id=\"section2\">Section Two</h2> elsewhere on the same page, which link would jump directly to that heading?",
    type: "single",
    options: [
      "<a href=\"#section2\">Go to Section Two</a>",
      "<a href=\"section2\">Go to Section Two</a>",
      "<a href=\"id:section2\">Go to Section Two</a>",
      "<a target=\"section2\">Go to Section Two</a>",
    ],
    correctIndexes: [0],
    explanation:
      "A href value starting with a hash symbol followed by an id creates a fragment link, which scrolls the browser to the element on the current page carrying that matching id.",
  },
  {
    id: "html-structure-7",
    question: "Which attributes are essential on an <img> tag for both correct display and accessibility?",
    type: "multi",
    options: ["src", "alt", "target", "colspan"],
    correctIndexes: [0, 1],
    explanation:
      "src supplies the path to the image file that the browser needs to display it, and alt provides a text description used by screen readers and shown if the image fails to load; target and colspan are not img attributes at all.",
  },
  {
    id: "html-structure-8",
    question: "Why does the alt attribute on an image matter beyond just being good practice?",
    type: "single",
    options: [
      "It is read aloud by screen readers and displayed as fallback text if the image cannot load, making it functionally important, not merely cosmetic",
      "It only affects how the image looks when hovered over with a mouse and has no accessibility role",
      "It changes the file format the browser requests for that image",
      "It is required syntax with no effect on rendering, accessibility, or fallback behavior",
    ],
    correctIndexes: [0],
    explanation:
      "The alt text is announced by screen readers to describe the image to visually impaired users and is also shown in place of the image if it fails to load, so it serves a real functional purpose rather than just being decorative metadata.",
  },
  {
    id: "html-structure-9",
    question: "What is a favicon, and how is it typically linked to an HTML page?",
    type: "single",
    options: [
      "A small icon shown in the browser tab and bookmarks, linked with a <link rel=\"icon\"> element in the head",
      "A required meta tag that sets the page's primary color theme",
      "An image tag placed at the very top of the <body> before any other content",
      "A JavaScript variable that controls the page's title text",
    ],
    correctIndexes: [0],
    explanation:
      "A favicon is the small icon associated with a page, typically declared in the document head using a link element with rel=\"icon\" pointing to an image file.",
  },
  {
    id: "html-structure-10",
    question: "Where must the <title> element appear, and what is it used for?",
    type: "single",
    options: [
      "Inside the <head> section; its text is shown in the browser tab, bookmarks, and search engine results",
      "Inside the <body> section, as the first visible heading on the page",
      "It can appear anywhere in the document and controls the page's default font",
      "It is optional and, when omitted, the browser generates one automatically from the first paragraph",
    ],
    correctIndexes: [0],
    explanation:
      "The <title> element belongs in the document head and defines the title shown in the browser's tab or window title bar, in bookmarks, and typically as the clickable headline in search engine results.",
  },
  {
    id: "html-structure-11",
    question: "In an HTML table, which tag defines a header cell rather than a standard data cell?",
    type: "single",
    options: ["<th>", "<td>", "<tr>", "<head>"],
    correctIndexes: [0],
    explanation:
      "<th> defines a header cell, which browsers render bold and centered by default and which carries semantic meaning for assistive technology, while <td> defines an ordinary data cell and <tr> defines a table row.",
  },
  {
    id: "html-structure-12",
    question: "What do the colspan and rowspan attributes do when placed on a <td> or <th> element?",
    type: "single",
    options: [
      "colspan makes a cell span multiple columns, and rowspan makes a cell span multiple rows",
      "colspan sets the cell's background color, and rowspan sets its border width",
      "colspan and rowspan both control how many rows a table has in total",
      "They are used only on the <table> element itself, not on individual cells",
    ],
    correctIndexes: [0],
    explanation:
      "colspan specifies how many columns a single cell should stretch across, and rowspan specifies how many rows a single cell should stretch down, letting one cell merge visually with neighboring cells.",
  },
  {
    id: "html-structure-13",
    question: "What is the key difference between an unordered list (<ul>) and an ordered list (<ol>)?",
    type: "single",
    options: [
      "<ul> renders items with bullet points, while <ol> renders items with sequential numbers or letters",
      "<ul> is used only for navigation menus, while <ol> is used only for paragraphs of text",
      "<ol> cannot be nested inside another list, while <ul> can",
      "There is no visual difference; the tag names are just aliases for the same element",
    ],
    correctIndexes: [0],
    explanation:
      "Both group list items marked with <li>, but by default an unordered list is bulleted while an ordered list is numbered, signaling that the sequence of items has a meaningful order.",
  },
  {
    id: "html-structure-14",
    question: "What is a <dl> element used for, in combination with <dt> and <dd>?",
    type: "single",
    options: [
      "A description list, pairing terms (<dt>) with their descriptions (<dd>)",
      "A dropdown list of selectable options, equivalent to <select>",
      "A deleted list, used to visually strike through removed list items",
      "A duplicate list that mirrors the contents of another list on the page",
    ],
    correctIndexes: [0],
    explanation:
      "<dl> defines a description list, where each <dt> gives a term and each following <dd> gives that term's description, which is a distinct structure from bulleted or numbered lists.",
  },
  {
    id: "html-structure-15",
    question: "Which of the following are examples of block-level elements, which by default start on a new line and take up the full available width?",
    type: "multi",
    options: ["<div>", "<p>", "<span>", "<h1>"],
    correctIndexes: [0, 1, 3],
    explanation:
      "<div>, <p>, and <h1> are block-level elements that begin on a new line and stretch to fill their container's width, while <span> is an inline element that only takes up as much width as its content.",
  },
  {
    id: "html-structure-16",
    question: "Which of the following are true about the <div> element?",
    type: "multi",
    options: [
      "It is a generic block-level container with no inherent semantic meaning",
      "It is commonly used to group other elements so CSS or JavaScript can target them together",
      "It automatically applies a visible border and padding around its content",
      "It behaves as an inline element by default, sitting alongside adjacent text",
    ],
    correctIndexes: [0, 1],
    explanation:
      "A <div> carries no semantic meaning by itself; its main purpose is to serve as a generic block-level grouping container for styling or scripting hooks, not to add default visual styling or inline behavior.",
  },
  {
    id: "html-structure-17",
    question: "How does the class attribute differ from the id attribute when applied to HTML elements?",
    type: "single",
    options: [
      "The same class value can be reused on many elements on a page, while an id value must be unique to a single element on that page",
      "An id value can be reused on many elements, while a class value must be unique per page",
      "class and id are functionally identical and can always be used interchangeably",
      "class is only valid on block-level elements, while id is only valid on inline elements",
    ],
    correctIndexes: [0],
    explanation:
      "class is designed to group multiple elements that should share styling or behavior, so the same class name can appear on many elements, whereas id is meant to uniquely identify exactly one element per page.",
  },
  {
    id: "html-structure-18",
    question: "Why would using the same id value on two different elements in one HTML page cause problems?",
    type: "single",
    options: [
      "It violates the expectation that an id uniquely identifies one element, which can break fragment links and JavaScript lookups that expect a single match",
      "The browser will refuse to render the page at all if it detects a duplicate id",
      "It is actually the recommended way to apply a shared style to a group of elements",
      "Duplicate ids only cause issues in stylesheets, never in scripting",
    ],
    correctIndexes: [0],
    explanation:
      "Although browsers will still render a page with duplicate ids, functions like document.getElementById and fragment links (#id) expect ids to be unique, so duplicates cause unpredictable or wrong behavior.",
  },
  {
    id: "html-structure-19",
    question: "What does the type attribute on a <button> element control?",
    type: "single",
    options: [
      "Whether the button submits its enclosing form, resets form fields, or does neither by default",
      "Whether the button is rendered as a circle, square, or rounded rectangle",
      "Whether the button text is bold, italic, or plain",
      "Whether the button is visible only on mobile devices",
    ],
    correctIndexes: [0],
    explanation:
      "A button's type attribute (submit, reset, or button) determines its behavior inside a form: submitting the form, resetting its fields, or doing nothing automatically, respectively.",
  },
  {
    id: "html-structure-20",
    question: "What does an <iframe> element do?",
    type: "single",
    options: [
      "It embeds another HTML document or webpage within the current page",
      "It defines an internal frame of reference for CSS positioning calculations",
      "It creates a scrollable list of internal page links",
      "It is a deprecated alias for the <div> element",
    ],
    correctIndexes: [0],
    explanation:
      "An <iframe> embeds an independent browsing context, such as another webpage or document, inside the current page, commonly used for maps, videos, or third-party widgets.",
  },
];
