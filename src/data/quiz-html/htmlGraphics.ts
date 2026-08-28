import type { QuizQuestion } from "../../types/quiz";

export const htmlGraphicsQuestions: QuizQuestion[] = [
  {
    id: "html-graphics-1",
    question: "What kind of graphics does the <canvas> element produce?",
    type: "single",
    options: [
      "Pixel-based (raster) graphics drawn imperatively using JavaScript",
      "Vector-based graphics described declaratively as markup",
      "Graphics that are automatically resolution-independent at any zoom level",
      "Graphics that require no JavaScript to draw anything at all",
    ],
    correctIndexes: [0],
    explanation:
      "<canvas> is a raster surface: you draw onto it pixel by pixel using JavaScript's drawing context, and it has no built-in memory of the shapes you drew.",
  },
  {
    id: "html-graphics-2",
    question: "What kind of graphics does <svg> produce?",
    type: "single",
    options: [
      "Vector-based graphics described declaratively as markup, made of individually addressable elements",
      "Pixel-based graphics drawn imperatively using JavaScript's 2D drawing context",
      "Graphics that must always be generated at runtime by JavaScript",
      "Graphics that cannot be styled with CSS",
    ],
    correctIndexes: [0],
    explanation:
      "SVG describes shapes as XML markup using mathematical definitions, so each shape exists as its own DOM element that can be styled and scripted individually.",
  },
  {
    id: "html-graphics-3",
    question: "Why does an SVG image typically stay crisp when scaled up to a much larger size, while a canvas drawing at a fixed pixel size can become blurry?",
    type: "single",
    options: [
      "SVG shapes are defined mathematically and are recalculated at render time for any size, while a canvas is a fixed grid of pixels that gets stretched",
      "SVG files are always smaller in file size than canvas drawings",
      "Canvas drawings cannot be resized at all once created",
      "SVG graphics are rendered by the operating system instead of the browser",
    ],
    correctIndexes: [0],
    explanation:
      "Because SVG shapes are vector definitions, the browser recalculates and redraws them at whatever size is requested, whereas a canvas's rasterized pixels simply get stretched, causing blur.",
  },
  {
    id: "html-graphics-4",
    question: "In <svg>, how would you typically make a single circle respond to a click with its own dedicated event handler?",
    type: "single",
    options: [
      "Attach an event listener directly to the <circle> element, since it exists as its own node in the DOM",
      "It is not possible to attach an event listener to an individual SVG shape",
      "You must redraw the entire SVG document from scratch on every click",
      "You must first convert the SVG into a <canvas> element",
    ],
    correctIndexes: [0],
    explanation:
      "Because each SVG shape is a real DOM element, it can have its own event listeners attached directly, unlike shapes drawn onto a canvas, which are just pixels with no individual identity.",
  },
  {
    id: "html-graphics-5",
    question: "In <canvas>, how would you typically detect that a particular shape you previously drew was clicked?",
    type: "single",
    options: [
      "The canvas itself has no memory of individual shapes, so the developer must manually track shape coordinates and compare them against the click position",
      "By attaching a click event listener directly to the shape object returned from the drawing call",
      "Canvas shapes automatically dispatch their own click events, just like SVG elements",
      "By giving the shape a CSS class and listening for clicks on that class",
    ],
    correctIndexes: [0],
    explanation:
      "A canvas only stores pixels, not shape objects, so detecting which drawn shape was clicked requires the developer to track coordinates and manually perform hit-testing against the click position.",
  },
  {
    id: "html-graphics-6",
    question: "Which scenarios are generally better suited to <canvas> than <svg>?",
    type: "multi",
    options: [
      "A game or visualization that redraws thousands of moving particles every animation frame",
      "A simple company logo icon that must remain sharp on very large and very small screens alike",
      "Pixel-level image manipulation, such as applying a filter to photo data",
      "A chart where each bar needs to remain an individually clickable, stylable element after being drawn",
    ],
    correctIndexes: [0, 2],
    explanation:
      "Canvas suits high-volume, frequently redrawn pixel work like particle simulations or pixel manipulation, since there is no per-shape DOM overhead; scalable icons and individually interactive shapes favor SVG.",
  },
  {
    id: "html-graphics-7",
    question: "Which scenarios are generally better suited to <svg> than <canvas>?",
    type: "multi",
    options: [
      "An icon or logo that needs to look sharp at any display size or zoom level",
      "A chart where each data point needs its own tooltip and hover style applied via CSS",
      "A real-time simulation rendering hundreds of thousands of independently moving pixels every frame",
      "A diagram where individual shapes need to be selected and animated independently using standard DOM APIs",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "SVG's resolution independence and per-element DOM access make it well suited to scalable icons, interactive charts, and diagrams with individually addressable shapes; extremely high-volume pixel redraws favor canvas instead.",
  },
  {
    id: "html-graphics-8",
    question: "Which statement correctly compares how <canvas> and <svg> keep track of what has been drawn?",
    type: "single",
    options: [
      "SVG keeps a persistent DOM tree of shape elements that can be inspected and modified later, while canvas only retains the resulting pixels with no memory of the drawing commands used",
      "Canvas keeps a persistent DOM tree of shapes, while SVG only stores the final rendered pixels",
      "Both keep an identical DOM tree of shape elements that can be queried the same way",
      "Neither retains any information about what was drawn after the drawing operation completes",
    ],
    correctIndexes: [0],
    explanation:
      "SVG shapes remain as addressable DOM nodes after being drawn, while canvas immediately rasterizes drawing commands into pixels and discards the shape information itself.",
  },
];
