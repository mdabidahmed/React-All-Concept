import type { Topic } from "../../types";

export const tsTypingPropsTopic: Topic = {
  id: "ts-typing-props",
  title: "Typing React Props",
  category: "TypeScript with React",
  shortExplanation: `The standard pattern for a typed React component is an ==\`interface XxxProps\`== describing exactly what the component accepts, used as the type of its destructured parameter.

- \`interface ButtonProps { label: string; onClick: () => void; }\` then \`function Button({ label, onClick }: ButtonProps) { ... }\`
- A \`?\` marks a prop **optional**: \`disabled?: boolean\` means callers can omit it entirely
- A union of string literals constrains a prop to a fixed set of valid values: \`variant: "primary" | "secondary"\` — anything else is rejected at compile time
- This exact pattern is used throughout this app's own components, e.g. \`TopicFooterNavProps\` in \`TopicFooterNav.tsx\``,
  longExplanation: `Every real component in this app follows the same convention for typing its props, and it's the single most common pattern in any TypeScript + React codebase: define an \`interface\` named after the component with a \`Props\` suffix, then use it as the type annotation on the function's destructured parameter object.

- The shape: \`interface CardProps { title: string; count: number; }\` followed by \`function Card({ title, count }: CardProps) { ... }\`. Anywhere \`<Card ... />\` is used, the props passed in are checked against this interface — a missing required prop, a wrong type, or an extra prop that doesn't exist on the interface are all caught before the code ever runs
- Marking a prop optional with \`?\` — \`interface CardProps { title: string; subtitle?: string; }\` — means \`<Card title="Inbox" />\` is valid on its own, with \`subtitle\` omitted entirely. Inside the component, an omitted optional prop is \`undefined\`, so it's common to pair it with a default value (\`{ title, subtitle = "No subtitle" }\`) or a fallback check (\`subtitle ?? "No subtitle"\`)
- A prop restricted to a **fixed set of valid values** — rather than any string at all — uses a union of string literal types: \`interface ButtonProps { variant: "primary" | "secondary" | "ghost"; }\`. Passing \`variant="primary"\` is valid; passing \`variant="danger"\` (a typo, or simply not a supported value) is a compile-time error, not a bug discovered later when the button silently renders with no matching styles. This is dramatically safer than typing it as a plain \`string\`, which would accept literally anything
- Functions passed as props get typed with a **function signature**, describing both their parameters and return type: \`onClick: () => void\` (takes nothing, returns nothing) or \`onSelect: (id: number) => void\` (takes an \`id\`, returns nothing). This is exactly what \`TopicFooterNavProps\` in this app's own \`TopicFooterNav.tsx\` does for its \`subject\`, \`previous\`, and \`next\` props — each one typed precisely, including \`previous: Topic | null\` allowing either a real \`Topic\` object or explicitly \`null\` when there's nothing to link to
- Props that reference another interface (like a shared \`Topic\` shape used across multiple components) simply use that interface's name as the property's type, keeping one single definition of "what a Topic looks like" reused everywhere instead of duplicated per component
- Destructuring directly in the parameter list (\`{ label, onClick }: ButtonProps\`) is the dominant style in modern React + TypeScript, since it avoids writing \`props.label\`, \`props.onClick\` everywhere in the component body — but typing the whole \`props\` object as a single parameter (\`function Button(props: ButtonProps)\`) works identically and is sometimes preferred when a component has many props and wants to pass the whole bundle along to something else
- \`interface\` and \`type\` both work for defining a props shape, and in simple cases are interchangeable — \`interface\` is the more common convention for props specifically (as seen throughout this app), partly because interfaces support later extension (\`interface ExtendedProps extends ButtonProps { ... }\`) more naturally when a family of related components shares a base set of props

Getting props typing right is what makes a component genuinely self-documenting: hovering over \`<Button ... />\` anywhere it's used shows exactly what it accepts, autocomplete suggests valid \`variant\` values instead of guessing, and passing the wrong shape of data is caught immediately rather than surfacing as a confusing runtime bug deep inside the component.`,
  examples: [
    {
      id: "basic-props-interface",
      title: "A basic Props interface",
      summary: "ButtonProps documents exactly what Button accepts — label and onClick, nothing else.",
      code: `interface ButtonProps {
  label: string;
  onClick: () => void;
}

function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Button label={"Clicked " + count + " times"} onClick={() => setCount(count + 1)} />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "optional-prop-with-default",
      title: "An optional prop with a default value",
      summary: "subtitle? can be omitted entirely by any caller; a default fills it in when that happens.",
      code: `interface CardProps {
  title: string;
  subtitle?: string;
}

function Card({ title, subtitle = "No subtitle provided" }: CardProps) {
  return (
    <div style={{ border: "1px solid #d1d5db", borderRadius: 8, padding: 12 }}>
      <strong>{title}</strong>
      <p style={{ margin: "4px 0 0", color: "#6b7280" }}>{subtitle}</p>
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Card title="Inbox" subtitle="4 unread messages" />
      <Card title="Drafts" />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "union-of-literal-types",
      title: "A prop constrained to a fixed set of values",
      summary: "variant only accepts \"primary\" or \"secondary\" — anything else is rejected at compile time.",
      code: `interface ButtonProps {
  label: string;
  variant: "primary" | "secondary";
  onClick: () => void;
}

function Button({ label, variant, onClick }: ButtonProps) {
  const style =
    variant === "primary"
      ? { background: "#4f46e5", color: "white" }
      : { background: "#e5e7eb", color: "#111827" };

  return (
    <button onClick={onClick} style={{ ...style, border: "none", borderRadius: 6, padding: "8px 14px" }}>
      {label}
    </button>
  );
}

function App() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button label="Save" variant="primary" onClick={() => {}} />
      <Button label="Cancel" variant="secondary" onClick={() => {}} />
      {/* Try variant="danger" below — TypeScript rejects it immediately: */}
      {/* <Button label="Oops" variant="danger" onClick={() => {}} /> */}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "props-referencing-shared-interface",
      title: "A prop typed with a shared, reusable interface",
      summary: "previous/next are typed as a full Task shape or null — exactly the pattern this app's own footer nav uses.",
      code: `interface Task {
  id: number;
  title: string;
}

interface TaskNavProps {
  previous: Task | null;
  next: Task | null;
}

function TaskNav({ previous, next }: TaskNavProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>{previous ? "< " + previous.title : ""}</span>
      <span>{next ? next.title + " >" : ""}</span>
    </div>
  );
}

function App() {
  const first: Task = { id: 1, title: "Write tests" };
  const second: Task = { id: 2, title: "Ship feature" };

  return <TaskNav previous={first} next={second} />;
}

render(<App />);`,
    },
  ],
};
