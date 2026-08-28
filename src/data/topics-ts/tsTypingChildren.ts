import type { Topic } from "../../types";

export const tsTypingChildrenTopic: Topic = {
  id: "ts-typing-children",
  title: "Typing children Props",
  category: "TypeScript with React",
  shortExplanation: `\`React.ReactNode\` is the standard, broad type for a \`children\` prop — it covers strings, numbers, elements, arrays of elements, \`null\`, \`undefined\`, and booleans, matching literally everything React is willing to render.

- \`interface CardProps { children: React.ReactNode; }\` accepts \`<Card>hello</Card>\`, \`<Card><span /></Card>\`, \`<Card>{condition && <p />}</Card>\`, all equally

- A narrower type like \`React.ReactElement\` is reached for only when the component genuinely needs *one single element* — never plain text, never multiple children

- A practical wrapper/layout component is the classic place \`children: React.ReactNode\` shows up`,
  longExplanation: `Nearly every layout or wrapper component — a \`Card\`, a \`Modal\`, a \`Page\` — needs to accept arbitrary content to render inside itself, via the special \`children\` prop. Typing \`children\` correctly means picking a type broad enough to cover everything React can legally render as content, without being so broad (\`any\`) that it stops meaning anything at all.

- **\`React.ReactNode\` is the standard, go-to type for \`children\`,** and it's deliberately broad: it covers a rendered React element (\`<span />\`), a string (\`"hello"\`), a number (\`42\`), an array of any of those (\`[<span key="a" />, "text"]\`), and also \`null\`, \`undefined\`, and \`boolean\` — the last three because \`{condition && <SomeElement />}\` is an extremely common JSX pattern, and when \`condition\` is \`false\`, the expression evaluates to \`false\` itself, which React simply renders as nothing. A \`children\` prop typed as \`React.ReactNode\` accepts every one of these shapes without complaint
- **The shape looks exactly like typing any other prop:** \`interface CardProps { title: string; children: React.ReactNode; }\` followed by \`function Card({ title, children }: CardProps) { return <div><h3>{title}</h3>{children}</div>; }\`. Everywhere \`<Card title="...">...</Card>\` is used, whatever's placed between the opening and closing tags is checked against \`React.ReactNode\` — virtually anything reasonable is accepted
- **\`children\` is not automatically part of a component's props in modern React types** — it has to be explicitly declared on the props interface, just like any other prop. This is a common early mistake: forgetting to add \`children: React.ReactNode\` (or making it \`children?: React.ReactNode\` if the component works fine with nothing passed) results in TypeScript rejecting \`<Card>...</Card>\` usages entirely, since the props interface never said children were allowed
- **A narrower type is worth reaching for when the looseness of \`ReactNode\` would allow something that genuinely doesn't make sense for that specific component.** \`React.ReactElement\` describes *exactly one* rendered React element — not a string, not an array, not \`null\`. A component that's specifically designed to clone or inspect a single child element (something like a custom \`Tooltip\` that needs to attach event handlers to its one and only child) would type its \`children\` prop as \`React.ReactElement\` instead of \`React.ReactNode\`, since accepting plain text or multiple children wouldn't make sense for what it's trying to do
- **Requiring *exactly one* child versus *zero or more* children is a real, meaningful distinction worth making at the type level**, not just a style preference. A layout wrapper genuinely wants to accept anything (\`ReactNode\`); a component whose entire logic is "do something to my one child element" genuinely should reject being passed a string or several children — and typing it as \`ReactElement\` is what makes that restriction enforced at compile time instead of silently breaking at runtime when the component's logic doesn't know what to do with a string
- \`React.ReactNode\` is also commonly seen made optional — \`children?: React.ReactNode\` — for a component that's allowed to render with nothing passed as content at all, falling back to some default internal content in that case
- Some codebases define their own small alias, like \`type PropsWithChildren<P> = P & { children?: React.ReactNode };\` — and React itself ships exactly this as a built-in utility type, \`React.PropsWithChildren<P>\`, for wrapping an existing props type with a children prop added on, without having to repeat \`children: React.ReactNode\` by hand on every single component's own interface

The practical rule of thumb: default to \`React.ReactNode\` for \`children\` on the vast majority of components — anything that just needs to render whatever's placed inside it — and only reach for the narrower \`React.ReactElement\` on the much rarer component that has a real, specific reason to require exactly one element and nothing else.`,
  examples: [
    {
      id: "basic-reactnode-children",
      title: "A wrapper component with children: React.ReactNode",
      summary: "Card accepts a string, an element, or a mix of both as children, all equally.",
      code: `interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div style={{ border: "1px solid #d1d5db", borderRadius: 8, padding: 12 }}>
      <strong>{title}</strong>
      <div style={{ marginTop: 6 }}>{children}</div>
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Card title="Plain text">Just a string child.</Card>
      <Card title="An element">
        <button>A single button element</button>
      </Card>
      <Card title="Mixed content">
        Some text, then <strong>an element</strong>, all inside one children prop.
      </Card>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "conditional-children-with-boolean",
      title: "children accepting booleans, null, and arrays",
      summary: "React.ReactNode covers exactly what JSX conditionals like `condition && <X />` can produce.",
      code: `interface PanelProps {
  children: React.ReactNode;
}

function Panel({ children }: PanelProps) {
  return <div style={{ padding: 10, background: "#f3f4f6", borderRadius: 6 }}>{children}</div>;
}

function App() {
  const [showExtra, setShowExtra] = useState(false);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <button onClick={() => setShowExtra(!showExtra)}>Toggle extra content</button>
      <Panel>
        <p>Always visible.</p>
        {showExtra && <p>Only visible when toggled on.</p>}
        {[<span key="a">Item A</span>, <span key="b"> / Item B</span>]}
      </Panel>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "optional-children-with-fallback",
      title: "Optional children with a fallback",
      summary: "children? : React.ReactNode lets EmptyState render fine with nothing passed at all.",
      code: `interface EmptyStateProps {
  message: string;
  children?: React.ReactNode;
}

function EmptyState({ message, children }: EmptyStateProps) {
  return (
    <div style={{ textAlign: "center", padding: 16, color: "#6b7280" }}>
      <p>{message}</p>
      {children ?? <p style={{ fontSize: 13 }}>(no additional content provided)</p>}
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <EmptyState message="No results found" />
      <EmptyState message="Inbox is empty">
        <button>Compose a new message</button>
      </EmptyState>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "reactelement-single-child",
      title: "Requiring exactly one child: React.ReactElement",
      summary: "Tooltip needs a single element it can attach handlers to — plain text or multiple children don't fit.",
      code: `interface TooltipProps {
  label: string;
  children: React.ReactElement;
}

function Tooltip({ label, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          style={{
            position: "absolute",
            top: "-28px",
            left: 0,
            background: "#111827",
            color: "white",
            fontSize: 12,
            padding: "4px 8px",
            borderRadius: 4,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      )}
    </span>
  );
}

function App() {
  return (
    <div style={{ padding: 24 }}>
      <Tooltip label="Saves your changes">
        <button>Save</button>
      </Tooltip>
      <p style={{ color: "#6b7280", fontSize: 13, marginTop: 8 }}>
        Tooltip only accepts one element as children — a plain string wouldn't satisfy React.ReactElement.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
