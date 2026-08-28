import type { QuizQuestion } from "../../types/quiz";

export const cssFlexboxGridQuestions: QuizQuestion[] = [
  {
    id: "css-flexbox-grid-1",
    question:
      "What is the immediate effect of setting 'display: flex;' on a container element?",
    type: "single",
    options: [
      "Its direct children become flex items laid out along a main axis (horizontal by default), and can be aligned/spaced with flex properties",
      "It forces every descendant, no matter how deeply nested, to become a flex item",
      "It makes the element's own width and height stretch to fill its parent",
      "It removes the element from the document flow entirely, like position: absolute",
    ],
    correctIndexes: [0],
    explanation:
      "display: flex turns the element into a flex container and its direct children into flex items arranged along a main axis (row by default); it does not affect grandchildren directly and does not remove the container from normal flow.",
  },
  {
    id: "css-flexbox-grid-2",
    question:
      "In a flex container, which property controls whether items are laid out in a row or a column, and reverses that direction?",
    type: "single",
    options: [
      "flex-direction, with values like row, row-reverse, column, and column-reverse",
      "justify-content, with values like row and column",
      "flex-wrap, with values like row and column",
      "align-items, with values like row and column",
    ],
    correctIndexes: [0],
    explanation:
      "flex-direction sets the main axis of the flex container (row or column) and can reverse the order items are placed in with row-reverse or column-reverse; justify-content, flex-wrap, and align-items do not control axis direction.",
  },
  {
    id: "css-flexbox-grid-3",
    question:
      "In a default 'flex-direction: row' container, which axis does 'justify-content' align items along, and which axis does 'align-items' use?",
    type: "single",
    options: [
      "justify-content controls alignment along the main (horizontal) axis, while align-items controls alignment along the cross (vertical) axis",
      "justify-content controls the vertical axis, while align-items controls the horizontal axis",
      "Both properties control the same axis, and whichever is declared last wins",
      "justify-content only affects flex-wrap: wrap containers, while align-items only affects nowrap containers",
    ],
    correctIndexes: [0],
    explanation:
      "justify-content distributes items along the main axis (horizontal in a row container), while align-items aligns items along the cross axis (vertical in a row container); if flex-direction were column, these axes would swap.",
  },
  {
    id: "css-flexbox-grid-4",
    question:
      "What does 'flex-wrap: wrap;' do, and what stays true if it is left at its default value?",
    type: "single",
    options: [
      "'wrap' lets items move onto multiple lines when they don't fit the container's main-axis size; the default 'nowrap' forces all items onto a single line, shrinking them if necessary",
      "'wrap' stacks items vertically regardless of flex-direction, while 'nowrap' arranges them horizontally",
      "'wrap' has no visual effect unless 'display: grid' is also set on the same container",
      "'wrap' only applies to text content inside flex items, not to the items themselves",
    ],
    correctIndexes: [0],
    explanation:
      "By default (nowrap), flex items are forced onto one line and may shrink to fit; setting flex-wrap: wrap allows items to flow onto additional lines when they collectively exceed the container's main-axis space.",
  },
  {
    id: "css-flexbox-grid-5",
    question:
      "What does the 'gap' property do when applied to a flex container, e.g. 'display: flex; gap: 16px;'?",
    type: "single",
    options: [
      "It adds consistent spacing between flex items without adding extra space before the first item or after the last one, unlike using margins on each item",
      "It sets the padding inside each individual flex item",
      "It only works in CSS Grid containers and is silently ignored in flexbox",
      "It sets the minimum width each flex item must have before wrapping",
    ],
    correctIndexes: [0],
    explanation:
      "gap creates spacing purely between adjacent flex (or grid) items, without adding outer space at the container's edges, which avoids the extra manual math needed when spacing items with margins.",
  },
  {
    id: "css-flexbox-grid-6",
    question:
      "A flex item has 'flex-grow: 0;' (its initial value) while its siblings have 'flex-grow: 1;', and the container has extra free space along the main axis. What happens to that item?",
    type: "single",
    options: [
      "It stays at its base size and does not grow, while the siblings expand to absorb the leftover space",
      "It grows by the same amount as its siblings because flex-grow is ignored when siblings differ",
      "It shrinks below its base size to compensate for the siblings growing",
      "The entire flex layout becomes invalid and all items ignore flex-grow",
    ],
    correctIndexes: [0],
    explanation:
      "flex-grow determines how much of the extra free space an item absorbs relative to its siblings; a value of 0 means the item claims none of that space, so only the siblings with a positive flex-grow expand.",
  },
  {
    id: "css-flexbox-grid-7",
    question:
      "A flex item is meant to stay at a fixed 'width: 300px;', but as the flex container gets narrower, the item keeps shrinking below 300px even though nothing else about flex sizing was set on it. Why, and what fixes it?",
    type: "single",
    options: [
      "Every flex item has an initial flex-shrink of 1, so it shrinks by default when space is tight; setting 'flex-shrink: 0;' on the item stops it from shrinking below its width",
      "flex-grow defaults to 1 on every item, causing this shrinking; setting 'flex-grow: 0;' fixes it",
      "This is unavoidable browser behavior and cannot be changed with CSS",
      "align-self defaults to a 'shrink' value; setting 'align-self: stretch;' fixes it",
    ],
    correctIndexes: [0],
    explanation:
      "flex-shrink's initial value is 1 for every flex item, meaning items are allowed to shrink below their specified size when the container lacks room; setting flex-shrink: 0 opts an item out of shrinking so it keeps its intended width. flex-grow only governs growing into extra space, and align-self has no 'shrink' keyword.",
  },
  {
    id: "css-flexbox-grid-8",
    question:
      "In the shorthand 'flex: 1 1 200px;', what do the three values represent, in order?",
    type: "single",
    options: [
      "flex-grow, flex-shrink, and flex-basis",
      "flex-basis, flex-grow, and flex-shrink",
      "flex-direction, flex-wrap, and flex-basis",
      "flex-shrink, flex-grow, and flex-basis",
    ],
    correctIndexes: [0],
    explanation:
      "The flex shorthand is written flex-grow, flex-shrink, flex-basis, so 'flex: 1 1 200px' means the item can grow, can shrink, and starts from a base size of 200px before growing or shrinking is applied.",
  },
  {
    id: "css-flexbox-grid-9",
    question:
      "By default, flex items are displayed in the same order as they appear in the HTML source. Which item property can visually reorder them without touching the markup?",
    type: "single",
    options: [
      "order (items with a lower number appear first; the default is 0 for every item)",
      "flex-direction, set individually on each item",
      "z-index, which also controls visual ordering in flex layouts",
      "justify-content, set individually on each item",
    ],
    correctIndexes: [0],
    explanation:
      "The order property lets you change the visual sequence of flex items independently of their source order; all items default to order: 0, and items are laid out from lowest to highest order value.",
  },
  {
    id: "css-flexbox-grid-10",
    question:
      "A flex container has 'align-items: flex-start;', but one particular item needs to be vertically centered while its siblings stay at the top. How can this be done without changing the container's align-items?",
    type: "single",
    options: [
      "Set 'align-self: center;' on that individual item, which overrides the container's align-items just for that item",
      "Set 'justify-content: center;' on that individual item",
      "It is impossible; align-items always applies uniformly to every item with no per-item override",
      "Set 'flex-direction: column;' on that individual item",
    ],
    correctIndexes: [0],
    explanation:
      "align-self is a flex item property that overrides the container's align-items value for that one item only, letting individual items opt into different cross-axis alignment; justify-content and flex-direction are container-level concerns and have no effect when set on an item.",
  },
  {
    id: "css-flexbox-grid-11",
    question:
      "What does 'display: grid;' establish, compared to 'display: flex;'?",
    type: "single",
    options: [
      "A two-dimensional layout system that can define explicit rows AND columns at once, whereas flexbox is primarily one-dimensional (a single row or column)",
      "The exact same one-dimensional layout behavior as flexbox, just with different property names",
      "A layout that can only be used for image galleries, never for full page layouts",
      "A system where every child must have an explicit width and height set manually",
    ],
    correctIndexes: [0],
    explanation:
      "CSS Grid is designed for two-dimensional layout, letting you define both rows and columns and place items within that grid, while flexbox distributes items along a single axis at a time (row or column).",
  },
  {
    id: "css-flexbox-grid-12",
    question:
      "What does this CSS produce?\n\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: 100px auto;\n  gap: 16px;\n}",
    type: "single",
    options: [
      "Three equal-width columns and two rows (a fixed 100px first row, then a second row sized to its content), with 16px of spacing between all rows and columns",
      "Three equal-height rows and two columns, since grid-template-rows always defines the horizontal tracks as columns",
      "A single column that repeats three times, with grid-template-rows ignored entirely",
      "The gap value is invalid inside display: grid and will be ignored by the browser",
    ],
    correctIndexes: [0],
    explanation:
      "grid-template-columns defines the vertical column tracks (here, three equal fr columns via repeat), grid-template-rows defines the horizontal row tracks (a fixed 100px row followed by an auto-sized row), and gap works in CSS Grid exactly as it does in flexbox, spacing both rows and columns.",
  },
  {
    id: "css-flexbox-grid-13",
    question:
      "Which of the following statements about 'grid-column' and 'grid-row' are true?",
    type: "multi",
    options: [
      "'grid-column: 1 / 3;' makes an item span from grid line 1 to grid line 3, covering two column tracks",
      "grid-row works the same way as grid-column, but spans row lines instead of column lines",
      "grid-column can only be used if grid-template-columns explicitly defines named lines first",
      "Setting grid-column on an item automatically increases how many columns the grid container has",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Both grid-column and grid-row take a start and end line number separated by a slash to span an item across tracks; grid lines are numbered automatically even without named lines, and an item's grid-column/grid-row placement does not change how many tracks the container itself defines.",
  },
  {
    id: "css-flexbox-grid-14",
    question:
      "How do named grid template areas work together, as in this setup?\n\n.container {\n  display: grid;\n  grid-template-areas:\n    \"header header\"\n    \"sidebar main\";\n}\n.sidebar { grid-area: sidebar; }",
    type: "single",
    options: [
      "grid-template-areas draws a visual map of named regions on the container, and each child is placed into the matching region by setting its own grid-area to that same name",
      "grid-template-areas only works if every named region is exactly one grid cell in size",
      "grid-area is a container-only property and has no effect when set on a child item",
      "The strings in grid-template-areas must exactly match CSS class names for the layout to work",
    ],
    correctIndexes: [0],
    explanation:
      "grid-template-areas lets you sketch the layout as named regions using strings on the container, and each grid item is assigned to a region by giving it a matching grid-area name; a name can span multiple cells (like 'header' spanning two columns above), and grid-area is applied to items, not the container.",
  },
  {
    id: "css-flexbox-grid-15",
    question:
      "Which of the following statements about responsive design are true?",
    type: "multi",
    options: [
      "'Mobile-first' means writing base styles for small screens first, then using min-width media queries to add complexity for larger screens",
      "A fluid layout uses relative units like percentages so it adapts to different screen sizes, while a fixed layout uses set pixel widths that don't adapt",
      "'Desktop-first' means writing base styles for small screens first, then overriding them for desktop with max-width media queries",
      "Responsive design guarantees a page will always look visually identical on every device, with no layout differences at all",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Mobile-first starts with small-screen base styles and layers on min-width media queries for bigger screens, and fluid layouts use relative units to adapt; desktop-first actually starts from desktop styles and uses max-width queries to adapt downward (the reverse of the claim), and responsive design intentionally changes layout across devices rather than keeping it identical.",
  },
  {
    id: "css-flexbox-grid-16",
    question:
      "An <img> has a fixed 'width: 800px;' in its CSS and overflows its container on narrow mobile screens. Which change makes the image shrink to fit its container while keeping its aspect ratio intact?",
    type: "single",
    options: [
      "Replace the fixed width with 'max-width: 100%; height: auto;' so the image scales down within its container without distorting its proportions",
      "Add 'overflow: hidden;' directly on the <img> element",
      "Set 'width: 100vw;' on the image, which always matches its parent container's actual rendered width",
      "Add 'object-fit: contain;' without removing 'width: 800px;', which shrinks the image element itself to fit any container",
    ],
    correctIndexes: [0],
    explanation:
      "max-width: 100% caps an image at its container's width (letting it shrink on small screens) while height: auto preserves the original aspect ratio; object-fit controls how an image's content fills an already-sized box (useful for cropping) rather than shrinking an oversized element, and width: 100vw matches the viewport, not necessarily the parent container, so it can still overflow a nested layout.",
  },
  {
    id: "css-flexbox-grid-17",
    question:
      "Given this mobile-first CSS structure, which statements are true?\n\nbody { font-size: 14px; }\n@media (min-width: 768px) { body { font-size: 16px; } }\n@media (min-width: 1024px) { body { font-size: 18px; } }",
    type: "multi",
    options: [
      "'(min-width: 768px)' matches viewports that are 768px wide or wider, so its rule applies on top of the base mobile styles as the screen grows",
      "Because the media queries use min-width and are ordered from smallest to largest breakpoint, this file follows a mobile-first approach",
      "'(max-width: 768px)' and '(min-width: 768px)' always select the exact same set of viewport widths",
      "Media query rules are evaluated once when the page first loads and never re-apply if the window is resized afterward",
    ],
    correctIndexes: [0, 1],
    explanation:
      "min-width media queries activate once the viewport reaches at least that width, so starting with unconditional base styles and layering min-width breakpoints on top is the defining trait of mobile-first CSS; max-width and min-width target opposite sides of a breakpoint, and browsers continuously re-evaluate media queries as the viewport is resized, not just once at load.",
  },
  {
    id: "css-flexbox-grid-18",
    question:
      "Given '.article { column-count: 3; column-gap: 32px; column-rule: 1px solid #ccc; }', which statements are true?",
    type: "multi",
    options: [
      "column-count: 3 flows the article's content into three vertical columns automatically, similar to a newspaper layout",
      "column-gap sets the space between the columns, similar to how gap works in flexbox and grid",
      "column-rule draws a border around the entire multi-column block, rather than a line between the individual columns",
      "Multi-column layout requires the content to be manually split into separate HTML elements, one per column",
    ],
    correctIndexes: [0, 1],
    explanation:
      "column-count splits a block's existing content into that many flowing columns without any manual markup changes, and column-gap spaces those columns apart much like gap does in flex or grid layouts; column-rule instead draws a dividing line between adjacent columns, not an outer border around the whole block.",
  },
];
