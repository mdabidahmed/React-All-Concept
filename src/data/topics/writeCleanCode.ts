import type { Topic } from "../../types";
import { CleanCodeDiagram } from "../../components/molecules/Diagrams/CleanCodeDiagram";

export const writeCleanCodeTopic: Topic = {
  id: "write-clean-code",
  title: "Write Clean Code",
  category: "Testing",
  shortExplanation: `Clean, ==testable== code and clean React code are usually the same code — small pieces that each do one thing are easy to read *and* easy to test in isolation.

- One component, one job — split "fetch + compute + render" into separate, focused pieces
- **Pure functions** (same input → same output, no hidden side effects) are the easiest thing in your codebase to test
- Extracting logic into a **custom hook** separates *what happens* from *how it's drawn*
- Early returns beat deeply nested \`if\`s — each guard clause removes one layer of nesting to reason about`,
  longExplanation: `"Clean code" isn't a separate goal from "testable code" — the same qualities that make code easy for a human to read also make it easy for a test to exercise in isolation.

- **Single responsibility**: a component that fetches data, transforms it, *and* renders it is doing three jobs. Testing it means dealing with all three at once — network mocking just to check a render. Split it: a hook that fetches and transforms, a component that only renders props
- **Pure functions are trivially testable** — \`formatPrice(1999)\` always returns \`"$19.99"\`, with no dependency on time, network, or global state. A function with hidden dependencies (reads a global, mutates outside state) needs those dependencies faked before it can be tested at all
- **Meaningful names remove the need for comments** — \`const remainingSeats = capacity - booked\` reads as documentation; \`const x = a - b\` doesn't, and a test written against \`x\` is harder to trust at a glance
- **Early returns flatten nesting** — a chain of \`if (a) { if (b) { if (c) { ... } } }\` has to be understood as a whole; a chain of \`if (!a) return; if (!b) return;\` guard clauses can be read and tested one condition at a time
- None of this requires a testing library to benefit from — it's the groundwork that makes writing the *first* test for a piece of code straightforward instead of a chore

The topics later in this section — Jest, Cypress, Mocha — are tools for *running* assertions. This one is about writing code that's actually pleasant to point those tools at.`,
  diagram: CleanCodeDiagram,
  examples: [
    {
      id: "split-fetch-and-render",
      title: "Splitting \"fetch + render\" into a hook and a component",
      summary: "One component doing three jobs, refactored into a pure presentational piece plus a hook.",
      code: `// Before: one component fetches, computes, and renders all at once.
function ProfileCardBefore({ userId }) {
  const [name, setName] = useState("Loading...");

  useEffect(() => {
    const fake = { 1: "Ada Lovelace", 2: "Grace Hopper" };
    const timer = setTimeout(() => setName(fake[userId] ?? "Unknown"), 400);
    return () => clearTimeout(timer);
  }, [userId]);

  return <p>User: {name}</p>;
}

// After: a hook owns the data, a plain component owns the rendering.
function useUserName(userId) {
  const [name, setName] = useState("Loading...");

  useEffect(() => {
    const fake = { 1: "Ada Lovelace", 2: "Grace Hopper" };
    const timer = setTimeout(() => setName(fake[userId] ?? "Unknown"), 400);
    return () => clearTimeout(timer);
  }, [userId]);

  return name;
}

function ProfileCard({ name }) {
  return <p>User: {name}</p>;
}

function ProfileCardAfter({ userId }) {
  const name = useUserName(userId);
  return <ProfileCard name={name} />;
}

function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <ProfileCardBefore userId={1} />
      <ProfileCardAfter userId={2} />
      <small>ProfileCard alone can now be tested with just a name prop — no timers, no fetching.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "pure-function-extraction",
      title: "Extracting a pure function out of a component",
      summary: "Moving price-formatting logic out of JSX into a plain function that's trivial to test on its own.",
      code: `function formatPrice(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function discountedPrice(cents, percentOff) {
  return Math.round(cents * (1 - percentOff / 100));
}

function PriceTag({ cents, percentOff }) {
  const finalCents = percentOff ? discountedPrice(cents, percentOff) : cents;
  return (
    <div>
      <span>{formatPrice(finalCents)}</span>
      {percentOff > 0 && (
        <span style={{ marginLeft: 8, color: "#6b7280", textDecoration: "line-through" }}>
          {formatPrice(cents)}
        </span>
      )}
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <PriceTag cents={2999} percentOff={0} />
      <PriceTag cents={2999} percentOff={25} />
      <small>formatPrice and discountedPrice can each be tested with plain numbers in, strings out — no rendering required.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "naming-reveals-intent",
      title: "Naming that reveals intent",
      summary: "The same logic, once with vague names and once with names that document themselves.",
      code: `// Vague names force a reader (and a test author) to infer meaning.
function calcVague(a, b, c) {
  return a - b < c;
}

// Names that reveal intent read like documentation.
function isBelowMinimumStock(currentStock, reserved, minimumThreshold) {
  return currentStock - reserved < minimumThreshold;
}

function App() {
  const currentStock = 12;
  const reserved = 5;
  const minimumThreshold = 10;

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>calcVague(12, 5, 10): {String(calcVague(currentStock, reserved, minimumThreshold))}</p>
      <p>isBelowMinimumStock(...): {String(isBelowMinimumStock(currentStock, reserved, minimumThreshold))}</p>
      <small>Same result — but a test named "isBelowMinimumStock returns true when stock is low" explains itself.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "early-return-flattens-nesting",
      title: "Early returns flatten deep nesting",
      summary: "The same validation logic, once deeply nested and once flattened with guard clauses.",
      code: `function validateNested(form) {
  if (form.email) {
    if (form.email.includes("@")) {
      if (form.password) {
        if (form.password.length >= 8) {
          return { valid: true };
        } else {
          return { valid: false, reason: "Password too short" };
        }
      } else {
        return { valid: false, reason: "Password required" };
      }
    } else {
      return { valid: false, reason: "Invalid email" };
    }
  } else {
    return { valid: false, reason: "Email required" };
  }
}

function validateFlat(form) {
  if (!form.email) return { valid: false, reason: "Email required" };
  if (!form.email.includes("@")) return { valid: false, reason: "Invalid email" };
  if (!form.password) return { valid: false, reason: "Password required" };
  if (form.password.length < 8) return { valid: false, reason: "Password too short" };
  return { valid: true };
}

function App() {
  const form = { email: "not-an-email", password: "" };
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>Nested version: {JSON.stringify(validateNested(form))}</p>
      <p>Flat version: {JSON.stringify(validateFlat(form))}</p>
      <small>Same behavior — but each guard clause in validateFlat can be tested as one isolated case.</small>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
