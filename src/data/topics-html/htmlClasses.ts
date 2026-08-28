import type { Topic } from "../../types";

export const htmlClassesTopic: Topic = {
  id: "html-classes",
  title: "HTML Classes",
  category: "HTML Structure",
  shortExplanation: `The \`class\` attribute (\`className\` in JSX) labels an element as belonging to a named group, so CSS and JavaScript can target *all* elements sharing it at once.

- One element can have **multiple** classes, space-separated: \`class="card featured"\`
- **Many** elements on a page can share the same class — classes are not required to be unique
- Classes exist purely as a **styling/targeting hook** — they carry no visual effect by themselves until CSS rules reference them`,
  longExplanation: `The \`class\` attribute is HTML's main mechanism for grouping elements so a single CSS rule (or a single JavaScript query) can affect all of them together.

- Adding \`class="highlight"\` to an element doesn't change how it looks by itself — a class only matters once a CSS rule like \`.highlight { background: yellow; }\` references it. The class is the *hook*; the styling rule is what actually does something
- **Multiple classes**: an element can have more than one class, separated by spaces — \`class="card featured"\` gives an element both the \`card\` styling *and* the \`featured\` styling at the same time, letting small, reusable pieces of styling be composed together
- **Not unique**: unlike \`id\` (covered next), a class is *meant* to be reused. Ten different \`<div>\`s can all have \`class="card"\`, and a single CSS rule then styles all ten identically — that reuse is the entire point
- JavaScript can also select every element with a given class (\`document.getElementsByClassName("card")\` in plain JS), which is how class names double as hooks for both styling *and* scripting
- In JSX, the attribute is spelled \`className\` instead of \`class\`, because \`class\` is a reserved keyword in JavaScript (used for defining JS classes) — the value itself (a space-separated string of class names) works identically either way

Aside from that one naming difference — \`class\` in HTML, \`className\` in JSX — everything about how classes behave is the same in both.`,
  examples: [
    {
      id: "class-vs-classname",
      title: "class (HTML) vs. className (JSX)",
      summary: "The exact same attribute, renamed only because \"class\" is a reserved word in JavaScript.",
      code: `function App() {
  return (
    <div>
      {/* In plain HTML: <p class="notice">...</p> */}
      <p className="notice" style={{ background: "#fef3c7", padding: 8, borderRadius: 4 }}>
        This element has className="notice" — in plain HTML it would be class="notice".
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "multiple-classes",
      title: "One element, multiple classes",
      summary: "Space-separated class names let small styling pieces combine on one element.",
      code: `function App() {
  return (
    <div>
      <style>{\`
        .card { border: 1px solid #d1d5db; border-radius: 8px; padding: 12px; }
        .featured { border-color: #f59e0b; background: #fffbeb; }
      \`}</style>
      <div className="card">A plain card (class="card" only)</div>
      <div className="card featured" style={{ marginTop: 8 }}>
        A featured card (class="card featured" — both classes' styles apply)
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "shared-class-many-elements",
      title: "The same class shared across many elements",
      summary: "Classes are meant to be reused — unlike id, there's no uniqueness requirement.",
      code: `function App() {
  const items = ["Alpha", "Beta", "Gamma"];
  return (
    <div>
      <style>{\`.tag { background: #e0f2fe; padding: 4px 10px; border-radius: 999px; margin-right: 6px; }\`}</style>
      {items.map((item) => (
        <span key={item} className="tag">
          {item}
        </span>
      ))}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "class-is-just-a-hook",
      title: "A class does nothing until CSS references it",
      summary: "Adding a class name alone has zero visual effect — it's only a targeting hook.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p className="unused-class-name">
        This paragraph has className="unused-class-name", but no CSS rule targets that name — so it looks
        completely plain.
      </p>
      <small>Classes are inert labels by themselves; only a matching CSS rule (or JS query) gives them effect.</small>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
