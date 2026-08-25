import type { Topic } from "../../types";

export const reactJsxIfStatementsTopic: Topic = {
  id: "react-jsx-if-statements",
  title: "React JSX If Statements",
  category: "JSX",
  shortExplanation:
    "Since if is a statement and JSX only accepts expressions inside {}, conditional rendering in React relies on a handful of idiomatic patterns instead: an early return from the component function, the ternary operator (cond ? a : b), the && short-circuit pattern for 'render this or render nothing', and computing an if/else result into a variable before the final return.",
  longExplanation:
    "React components are just functions, which means all of ordinary JavaScript's control flow is available above the return statement — it's only inside the JSX markup itself, between curly braces, that the expression-only rule kicks in. The most direct pattern is an early return: check a condition near the top of the component and return a different piece of JSX (or null) before reaching the 'main' render path, which is ideal for loading states, error states, or permission gates. Inside the markup, the ternary operator is the closest expression-level equivalent to if/else, and it composes cleanly with other JSX. When there's no 'else' case — you either render something or render nothing — the && operator is the idiomatic shorthand, because JSX treats false, null, and undefined as 'render nothing', so condition && <Component /> renders the component when condition is truthy and renders nothing when it's falsy. This is also the source of a well-known gotcha: if the left-hand side of && is a number rather than an explicit boolean (count && <Badge />), then when count is 0 the expression evaluates to 0 itself rather than false, and 0 is a valid renderable value, so React prints a stray '0' on the page instead of nothing. The fix is to force a real boolean, either with count > 0 && ... or Boolean(count) && .... The fourth pattern — computing an if/else block into a local variable before the return — is useful when the conditional logic is more than a one-liner or involves several branches, since cramming a multi-branch decision into a nested ternary quickly becomes unreadable. None of these patterns is objectively 'correct' in isolation; picking between them is mostly about matching the complexity of the condition to the readability of the syntax.",
  examples: [
    {
      id: "early-return",
      title: "Early return from the component",
      summary: "Return a different JSX tree before reaching the component's main render path.",
      code: `function UserPanel({ user }) {
  if (!user) {
    return <p style={{ color: "#6b7280" }}>No user is signed in.</p>;
  }

  return (
    <div style={{ display: "grid", gap: 4 }}>
      <strong>{user.name}</strong>
      <span style={{ fontSize: 13, color: "#6b7280" }}>{user.email}</span>
    </div>
  );
}

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const user = { name: "Ada Lovelace", email: "ada@example.com" };

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <UserPanel user={signedIn ? user : null} />
      <button onClick={() => setSignedIn((s) => !s)}>
        {signedIn ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "ternary-operator",
      title: "The ternary operator",
      summary: "cond ? a : b as an inline expression-level if/else.",
      code: `function App() {
  const [isPaid, setIsPaid] = useState(false);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>
        Status:{" "}
        {isPaid ? (
          <strong style={{ color: "#16a34a" }}>Paid</strong>
        ) : (
          <strong style={{ color: "#dc2626" }}>Unpaid</strong>
        )}
      </p>
      <button onClick={() => setIsPaid((p) => !p)}>Toggle status</button>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "and-short-circuit",
      title: "The && short-circuit pattern",
      summary: "Render something, or render nothing, with condition && <Component />.",
      code: `function App() {
  const [showTip, setShowTip] = useState(true);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <button onClick={() => setShowTip((t) => !t)}>Toggle tip</button>
      {showTip && (
        <p style={{ padding: 8, background: "#eff6ff", borderRadius: 6, fontSize: 13 }}>
          Tip: && renders the right side only when the left side is truthy.
        </p>
      )}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "variable-before-return",
      title: "Computing if/else into a variable",
      summary: "For multi-branch logic, assign the JSX to a variable before the final return.",
      code: `function ShippingNote({ total }) {
  let note;
  if (total >= 100) {
    note = <span style={{ color: "#16a34a" }}>Free shipping!</span>;
  } else if (total >= 50) {
    note = <span style={{ color: "#d97706" }}>Add \${(100 - total).toFixed(2)} for free shipping.</span>;
  } else {
    note = <span style={{ color: "#6b7280" }}>Standard shipping rates apply.</span>;
  }

  return (
    <p>
      Total: \${total.toFixed(2)} — {note}
    </p>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <ShippingNote total={30} />
      <ShippingNote total={70} />
      <ShippingNote total={120} />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "and-falsy-zero-gotcha",
      title: "The && falsy-zero gotcha",
      summary: "count && <Badge /> renders a stray 0 when count is 0; compare it to the fixed version.",
      code: `function BuggyBadge({ count }) {
  // count is 0 (a valid, renderable value) rather than false when there are
  // no items, so React prints the literal "0" instead of nothing.
  return <div>{count && <span> ({count} new)</span>}</div>;
}

function FixedBadge({ count }) {
  // Force a real boolean so the falsy case renders nothing.
  return <div>{count > 0 && <span> ({count} new)</span>}</div>;
}

function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div>
        Buggy: Inbox<BuggyBadge count={0} />
      </div>
      <div>
        Fixed: Inbox<FixedBadge count={0} />
      </div>
      <div>
        Buggy with items: Inbox<BuggyBadge count={3} />
      </div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
