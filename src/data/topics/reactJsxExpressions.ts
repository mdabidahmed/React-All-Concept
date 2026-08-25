import type { Topic } from "../../types";

export const reactJsxExpressionsTopic: Topic = {
  id: "react-jsx-expressions",
  title: "React JSX Expressions",
  category: "JSX",
  shortExplanation:
    "Anything inside curly braces {} in JSX is evaluated as a plain JavaScript expression and its result is inlined into the markup. That covers variables, function calls, arithmetic, ternaries, and array methods like .map() — but not statements such as if, for, or switch, because a statement doesn't produce a value.",
  longExplanation:
    "JSX is syntactic sugar over React.createElement calls, and curly braces are the escape hatch back into JavaScript-land: whatever expression you write between { and } is evaluated and its return value is dropped into the tree at that position. This is deliberately restricted to expressions — things that evaluate to a single value, like a variable reference, a function call, a template literal, a ternary, or a boolean && short-circuit — because JSX needs something it can render, and statements like if, for, switch, or variable declarations don't produce a value at all, they just perform an action. That's why you can't write {if (x) {...}} inside JSX and expect it to work; the fix is either to compute the value beforehand (an if/else assigned to a variable, or an early return from the component function) or to reach for an expression form that behaves like a conditional, most commonly the ternary operator or &&. The same rule is why rendering a list always goes through array.map() rather than a for loop written inline: map() is an expression that returns a new array of elements, and React knows how to render an array of JSX nodes directly. A few values render as nothing at all — null, undefined, true, and false all produce no output — which is exactly what makes the && pattern useful for conditionally rendering a chunk of UI, and exactly what causes the classic 'stray 0' bug when the left side of && evaluates to the number 0 instead of a boolean. Understanding this expressions-only boundary is foundational: nearly every other JSX pattern (conditional rendering, list rendering, computed attributes) is really just 'what expression do I put inside the braces.'",
  examples: [
    {
      id: "variable-interpolation",
      title: "Interpolating variables",
      summary: "Plain variables and template-literal-style string building inside curly braces.",
      code: `function App() {
  const user = "Ada";
  const role = "Engineer";

  return (
    <div style={{ display: "grid", gap: 4 }}>
      <p>Hello, {user}!</p>
      <p>Role: {role.toUpperCase()}</p>
      <p>{\`\${user} works as a \${role}\`}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "function-call-in-jsx",
      title: "Calling a function inside JSX",
      summary: "Any function call is an expression, so its return value can be embedded directly.",
      code: `function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function greet(name) {
  return "Welcome back, " + name + "!";
}

function App() {
  return (
    <div style={{ display: "grid", gap: 4 }}>
      <p>{greet("Grace")}</p>
      <p>Price: {formatCurrency(1999)}</p>
      <p>Today: {new Date(2024, 0, 1).toDateString()}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "arithmetic-and-computed-values",
      title: "Arithmetic and computed values",
      summary: "Numeric expressions, comparisons, and computed styles evaluate right inline.",
      code: `function App() {
  const price = 40;
  const quantity = 3;
  const taxRate = 0.08;

  const subtotal = price * quantity;
  const total = subtotal * (1 + taxRate);

  return (
    <div style={{ display: "grid", gap: 4, width: 220 }}>
      <p>Subtotal: \${subtotal}</p>
      <p>Total (with tax): \${total.toFixed(2)}</p>
      <p>In stock: {quantity > 0 ? "yes" : "no"}</p>
      <div
        style={{
          height: 8,
          borderRadius: 4,
          background: "#e5e7eb",
          width: Math.min(total, 200),
        }}
      />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "list-rendering-with-map",
      title: "Rendering a list with .map()",
      summary: "Array.map() is an expression, so it can build a list of elements directly inside {}.",
      code: `function App() {
  const fruits = ["apple", "banana", "cherry", "date"];

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>{fruits.length} fruits:</p>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {fruits.map((fruit, i) => (
          <li key={i}>{fruit.charAt(0).toUpperCase() + fruit.slice(1)}</li>
        ))}
      </ul>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "statements-vs-expressions",
      title: "Why if doesn't work inside {}",
      summary: "An if statement thrown inside {} is a syntax error; a ternary expression is the fix.",
      code: `function Status({ isOnline }) {
  // The following would NOT compile if uncommented, because "if" is a
  // statement, not an expression, and JSX only accepts expressions inside {}:
  //
  //   <p>{ if (isOnline) { "Online" } else { "Offline" } }</p>
  //
  // A ternary IS an expression, so it works fine:
  return <p>Status: {isOnline ? "Online" : "Offline"}</p>;
}

function App() {
  return (
    <div style={{ display: "grid", gap: 4 }}>
      <Status isOnline={true} />
      <Status isOnline={false} />
    </div>
  );
}

render(<App />);`,
    },
  ],
};
