import type { Topic } from "../../types";

export const reactCssModulesTopic: Topic = {
  id: "react-css-modules",
  title: "React CSS Modules",
  category: "Styling",
  shortExplanation:
    "CSS Modules (files named Component.module.css) let you write normal-looking class names that the build tool automatically rewrites into unique, collision-proof class names per file, imported as a JS object and used like className={styles.button}. This is the pattern this very app's own components use for their styling.",
  longExplanation:
    "In a real build setup, a file named something like Button.module.css is treated specially: instead of the class names inside it being global (visible and overridable from anywhere in the app), the bundler rewrites each class name into a unique generated string (e.g. .button becomes .button_a1b2c3) and hands you back a JS object mapping your original, readable names to those generated ones, so import styles from './Button.module.css' followed by className={styles.button} produces markup with the scoped name while your source code still reads naturally. This solves a real, common problem with plain global CSS: two components that both define a .title or .card rule will silently clash, with whichever stylesheet loads last winning, and large codebases end up inventing prefixing conventions (BEM, etc.) by hand just to avoid this; CSS Modules make that isolation automatic and scoped to the file, so a .title in one component's module can never leak into or be overridden by a .title in another. It's a build-time transformation, not a runtime feature, so the sandbox here can't import a real .module.css file (there's no bundler running the transform); instead, these examples simulate the effect with a plain JS object mapping logical names to already-unique class strings (const styles = { button: 'button_a1b2c3' }), paired with a matching injected <style> tag, to demonstrate exactly what the generated object and scoped class names look like once the real tool has processed a module file — this is the same underlying pattern the CSS files in this app's own src/components directory rely on.",
  examples: [
    {
      id: "styles-object-basic",
      title: "A simulated styles object",
      summary: "Use className={styles.button} against a plain object standing in for an imported CSS Module.",
      code: `const styles = {
  button: "button_a1b2c3",
};

function ModuleStyles() {
  return (
    <style>{\`
      .button_a1b2c3 { padding: 8px 16px; border-radius: 6px; border: 1px solid #2563eb; background: #2563eb; color: white; cursor: pointer; }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <ModuleStyles />
      <button className={styles.button}>Click me</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "scoped-no-collision",
      title: "Two components, same class name, no collision",
      summary: "Both components use a logical .title class, but each gets its own generated, non-colliding name.",
      code: `const cardStyles = { title: "title_card_x1" };
const bannerStyles = { title: "title_banner_y2" };

function ScopedStyles() {
  return (
    <style>{\`
      .title_card_x1 { color: #111827; font-size: 16px; font-weight: 600; }
      .title_banner_y2 { color: white; font-size: 20px; font-weight: 700; }
    \`}</style>
  );
}

function Card() {
  return (
    <div style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: 10 }}>
      <p className={cardStyles.title} style={{ margin: 0 }}>Card title</p>
    </div>
  );
}

function Banner() {
  return (
    <div style={{ background: "#111827", borderRadius: 6, padding: 10 }}>
      <p className={bannerStyles.title} style={{ margin: 0 }}>Banner title</p>
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <ScopedStyles />
      <Card />
      <Banner />
      <small>Both used a logical ".title" class, but the generated names never collide.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "composing-classes",
      title: "Composing two module classes",
      summary: "Join a base class with a variant class, the same way you would with a real CSS Module.",
      code: `const styles = {
  button: "button_base_1",
  primary: "button_primary_2",
};

function ModuleStyles() {
  return (
    <style>{\`
      .button_base_1 { padding: 8px 16px; border-radius: 6px; border: 1px solid #d1d5db; cursor: pointer; }
      .button_primary_2 { background: #16a34a; color: white; border-color: #16a34a; }
    \`}</style>
  );
}

function App() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <ModuleStyles />
      <button className={styles.button}>Default</button>
      <button className={\`\${styles.button} \${styles.primary}\`}>Primary</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "card-module-classes",
      title: "A small card component's module classes",
      summary: "One simulated module exposing several scoped classes used together on one component.",
      code: `const styles = {
  card: "card_root_9",
  header: "card_header_9",
  body: "card_body_9",
  footer: "card_footer_9",
};

function CardModuleStyles() {
  return (
    <style>{\`
      .card_root_9 { border: 1px solid #d1d5db; border-radius: 8px; overflow: hidden; max-width: 260px; }
      .card_header_9 { background: #f3f4f6; padding: 10px 12px; font-weight: 600; }
      .card_body_9 { padding: 12px; color: #4b5563; }
      .card_footer_9 { padding: 10px 12px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; }
    \`}</style>
  );
}

function App() {
  return (
    <div className={styles.card}>
      <CardModuleStyles />
      <div className={styles.header}>Profile</div>
      <div className={styles.body}>Scoped classes keep each part of the card styled independently.</div>
      <div className={styles.footer}>Updated just now</div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "modules-vs-global",
      title: "CSS Modules vs. plain global className",
      summary: "The same .title class name defined globally clashes across components, but scoped modules don't.",
      code: `function GlobalVsScoped() {
  return (
    <style>{\`
      /* Global stylesheet approach: only one ".title" rule can win */
      .title { color: #b91c1c; font-weight: 700; }
      /* CSS Modules approach: each component gets its own generated name */
      .title_moduleA_1 { color: #2563eb; font-weight: 700; }
      .title_moduleB_2 { color: #16a34a; font-weight: 700; }
    \`}</style>
  );
}

function GlobalCardA() {
  return <p className="title" style={{ margin: 0 }}>Global .title (Card A)</p>;
}
function GlobalCardB() {
  return <p className="title" style={{ margin: 0 }}>Global .title (Card B)</p>;
}

const moduleA = { title: "title_moduleA_1" };
const moduleB = { title: "title_moduleB_2" };
function ModuleCardA() {
  return <p className={moduleA.title} style={{ margin: 0 }}>Scoped title (Card A)</p>;
}
function ModuleCardB() {
  return <p className={moduleB.title} style={{ margin: 0 }}>Scoped title (Card B)</p>;
}

function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <GlobalVsScoped />
      <div>
        <strong>Global className (collision risk):</strong>
        <GlobalCardA />
        <GlobalCardB />
      </div>
      <div>
        <strong>CSS Modules (each stays independent):</strong>
        <ModuleCardA />
        <ModuleCardB />
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
