import type { Topic } from "../../types";

export const htmlProjectTopic: Topic = {
  id: "html-project",
  title: "HTML Project",
  category: "HTML Scripting & Layout",
  shortExplanation: `A small project pulls several pieces together — headings, paragraphs, images, and lists rarely appear alone in a real page.

- Start with the **structure** — headings and paragraphs establish the outline before anything else
- Add an **image** to break up the text and give the page visual interest
- Add a **list** for anything that's naturally a set of items — ingredients, steps, links
- Each piece you've learned individually combines into something that reads like a real page`,
  longExplanation: `Individual elements are easy to understand one at a time, but a real page is always a *combination* of them working together. Building one small page end to end is the fastest way to see how the pieces fit.

- Begin with the **outline**: a main \`<h1>\` for the page title, then \`<h2>\`s for each section, with \`<p>\` elements carrying the actual text — this alone is already a complete, readable page
- Layer in **media**: an \`<img>\` with a meaningful \`alt\` description adds visual interest without needing any styling
- Add a **list** wherever content is naturally a set of related items — ingredients in a recipe, steps in a process, links in a resource page — \`<ul>\`/\`<ol>\` structure this far more clearly than a wall of comma-separated text in a paragraph
- None of this requires anything beyond what earlier topics already covered — the skill here is *composition*: deciding which element fits which piece of content, and nesting them in a sensible order

The three examples below build the same small "recipe card" page in stages — structure only, then plus an image, then plus a list — so the progression from individual elements to a complete page is visible step by step.`,
  examples: [
    {
      id: "stage-1-structure",
      title: "Stage 1 — structure only",
      summary: "Just headings and paragraphs, already a complete, readable page.",
      code: `function App() {
  return (
    <article style={{ maxWidth: 360 }}>
      <h1>Simple Tomato Soup</h1>
      <p>A quick weeknight soup that comes together in under thirty minutes.</p>
      <h2>About this recipe</h2>
      <p>
        This recipe uses canned tomatoes, so it works year-round and doesn't
        depend on fresh produce being in season.
      </p>
    </article>
  );
}

render(<App />);`,
    },
    {
      id: "stage-2-plus-image",
      title: "Stage 2 — adding an image",
      summary: "The same structure, now with a photo breaking up the text.",
      code: `function App() {
  return (
    <article style={{ maxWidth: 360, display: "grid", gap: 8 }}>
      <h1>Simple Tomato Soup</h1>
      <img
        src="https://picsum.photos/seed/tomatosoup/340/160"
        alt="A bowl of tomato soup garnished with basil"
        width={340}
        height={160}
        style={{ borderRadius: 8 }}
      />
      <p>A quick weeknight soup that comes together in under thirty minutes.</p>
      <h2>About this recipe</h2>
      <p>
        This recipe uses canned tomatoes, so it works year-round and doesn't
        depend on fresh produce being in season.
      </p>
    </article>
  );
}

render(<App />);`,
    },
    {
      id: "stage-3-plus-list",
      title: "Stage 3 — adding an ingredient list",
      summary: "The complete page — structure, image, and a list for the ingredients.",
      code: `function App() {
  return (
    <article style={{ maxWidth: 360, display: "grid", gap: 8 }}>
      <h1>Simple Tomato Soup</h1>
      <img
        src="https://picsum.photos/seed/tomatosoup/340/160"
        alt="A bowl of tomato soup garnished with basil"
        width={340}
        height={160}
        style={{ borderRadius: 8 }}
      />
      <p>A quick weeknight soup that comes together in under thirty minutes.</p>

      <h2>Ingredients</h2>
      <ul>
        <li>1 can (28 oz) whole peeled tomatoes</li>
        <li>1 small onion, diced</li>
        <li>2 cloves garlic, minced</li>
        <li>1 cup vegetable stock</li>
        <li>Salt and pepper to taste</li>
      </ul>

      <h2>About this recipe</h2>
      <p>
        This recipe uses canned tomatoes, so it works year-round and doesn't
        depend on fresh produce being in season.
      </p>
    </article>
  );
}

render(<App />);`,
    },
  ],
};
