import type { Topic } from "../../types";

export const reactCssInJsTopic: Topic = {
  id: "react-css-in-js",
  title: "React CSS-in-JS",
  category: "Styling",
  shortExplanation:
    "CSS-in-JS libraries (styled-components, Emotion, and similar) let you write CSS directly inside a JS/TS file using tagged template literals, generating a scoped class name and a real React component — const Button = styled.button`...`. Styles can read props and state directly, so there's no manual class-toggling for visual variants.",
  longExplanation:
    "The defining feature of CSS-in-JS is that styling and component logic live in the same file and the same language: a call like styled.button`background: ${(p) => p.color};` returns an actual React component, and when that component's props change, the library regenerates (or looks up a cached) class name and injects the corresponding CSS into the page automatically — there's no separate stylesheet to keep in sync, and no need to manually compute a className string based on a prop the way you would with plain CSS or CSS Modules. This buys real ergonomic advantages: co-location (the styles live right next to the component that uses them), dynamic styling driven directly by props/theme/state without extra plumbing, and automatic scoping similar to CSS Modules but generated at runtime (or partly at build time, depending on the library and configuration). The tradeoffs are a runtime cost (style computation and injection happen as the app runs, though modern libraries optimize this heavily) and a dependency on the library itself. Because this sandbox has no module system and can't import an actual package like styled-components or Emotion, these examples hand-roll a tiny stand-in: a helper function that takes a template of CSS text (with prop-based interpolations already resolved to a string), generates a unique class name, injects a <style> tag containing that CSS under the generated class, and returns a component that applies it — this captures the shape and feel of the real pattern (write CSS, get back a styled component) without being production code; in an actual project you would use the real library, which handles caching, server-side rendering, theming, and vendor-prefixing far more robustly than a hand-rolled version ever could.",
  examples: [
    {
      id: "styled-button-variant",
      title: "A styled-component-like Button",
      summary: "A minimal styled() helper produces a Button component whose color depends on a variant prop.",
      code: `let styleTagCounter = 0;
function injectCss(css) {
  const className = "sc-" + (styleTagCounter++);
  const tag = document.createElement("style");
  tag.textContent = \`.\${className} { \${css} }\`;
  document.head.appendChild(tag);
  return className;
}

function StyledButton({ variant, children, ...rest }) {
  const bg = variant === "danger" ? "#dc2626" : variant === "success" ? "#16a34a" : "#2563eb";
  const className = useMemo(
    () => injectCss(\`padding: 8px 16px; border-radius: 6px; border: none; color: white; background: \${bg}; cursor: pointer;\`),
    [bg],
  );
  return <button className={className} {...rest}>{children}</button>;
}

function App() {
  const [variant, setVariant] = useState("primary");
  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <StyledButton variant={variant}>Styled button</StyledButton>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setVariant("primary")}>primary</button>
        <button onClick={() => setVariant("success")}>success</button>
        <button onClick={() => setVariant("danger")}>danger</button>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "css-var-slider",
      title: "Style that reacts live to state",
      summary: "A slider drives a CSS custom property consumed by an injected style rule.",
      code: `let counter = 0;
function injectCss(css) {
  const className = "sc-" + (counter++);
  const tag = document.createElement("style");
  tag.textContent = \`.\${className} { \${css} }\`;
  document.head.appendChild(tag);
  return className;
}

function ColorSwatch({ hue }) {
  const className = useMemo(
    () => injectCss(\`width: 100%; height: 60px; border-radius: 8px; background: hsl(\${hue}, 80%, 55%); transition: background 0.1s linear;\`),
    [],
  );
  return <div className={className} style={{ background: \`hsl(\${hue}, 80%, 55%)\` }} />;
}

function App() {
  const [hue, setHue] = useState(200);
  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 280 }}>
      <ColorSwatch hue={hue} />
      <input type="range" min="0" max="360" value={hue} onChange={(e) => setHue(Number(e.target.value))} />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "themed-button",
      title: "A themed button from props",
      summary: "Props determine the generated CSS, mimicking how a theme object would drive real CSS-in-JS.",
      code: `let counter = 0;
function injectCss(css) {
  const className = "sc-" + (counter++);
  const tag = document.createElement("style");
  tag.textContent = \`.\${className} { \${css} }\`;
  document.head.appendChild(tag);
  return className;
}

function ThemedButton({ theme, children }) {
  const className = useMemo(
    () => injectCss(\`padding: 10px 18px; border-radius: \${theme.radius}px; border: 2px solid \${theme.color}; background: white; color: \${theme.color}; font-weight: 600; cursor: pointer;\`),
    [theme.radius, theme.color],
  );
  return <button className={className}>{children}</button>;
}

function App() {
  const [rounded, setRounded] = useState(false);
  const theme = { color: "#7c3aed", radius: rounded ? 999 : 4 };
  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <ThemedButton theme={theme}>Themed button</ThemedButton>
      <button onClick={() => setRounded((r) => !r)}>Toggle radius</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "no-collision-instances",
      title: "Two instances, no class collisions",
      summary: "The same styled component rendered twice with different props gets two independent classes.",
      code: `let counter = 0;
function injectCss(css) {
  const className = "sc-" + (counter++);
  const tag = document.createElement("style");
  tag.textContent = \`.\${className} { \${css} }\`;
  document.head.appendChild(tag);
  return className;
}

function Tag({ color, children }) {
  const className = useMemo(
    () => injectCss(\`display: inline-block; padding: 4px 12px; border-radius: 999px; background: \${color}; color: white; font-size: 13px;\`),
    [color],
  );
  return <span className={className}>{children}</span>;
}

function App() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Tag color="#2563eb">Info</Tag>
      <Tag color="#16a34a">Success</Tag>
      <Tag color="#dc2626">Error</Tag>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "three-approaches-compared",
      title: "The same button, three ways",
      summary: "Inline style, a CSS-Module-style scoped class, and this CSS-in-JS pattern rendered side by side.",
      code: `function InlineButton() {
  return (
    <button style={{ padding: "8px 16px", borderRadius: 6, border: "none", background: "#111827", color: "white" }}>
      Inline style
    </button>
  );
}

const moduleStyles = { button: "button_module_7" };
function ModuleStyleTag() {
  return <style>{\`.button_module_7 { padding: 8px 16px; border-radius: 6px; border: none; background: #111827; color: white; }\`}</style>;
}
function ModuleButton() {
  return (
    <>
      <ModuleStyleTag />
      <button className={moduleStyles.button}>CSS Module style</button>
    </>
  );
}

let counter = 0;
function injectCss(css) {
  const className = "sc-" + (counter++);
  const tag = document.createElement("style");
  tag.textContent = \`.\${className} { \${css} }\`;
  document.head.appendChild(tag);
  return className;
}
function CssInJsButton() {
  const className = useMemo(
    () => injectCss("padding: 8px 16px; border-radius: 6px; border: none; background: #111827; color: white;"),
    [],
  );
  return <button className={className}>CSS-in-JS style</button>;
}

function App() {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      <InlineButton />
      <ModuleButton />
      <CssInJsButton />
    </div>
  );
}

render(<App />);`,
    },
  ],
};
