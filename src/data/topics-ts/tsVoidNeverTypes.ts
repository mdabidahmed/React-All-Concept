import type { Topic } from "../../types";

export const tsVoidNeverTypesTopic: Topic = {
  id: "ts-void-never-types",
  title: "TypeScript void and never Types",
  category: "Functions",
  shortExplanation: `\`void\` and \`never\` both describe functions that don't produce a normal, usable value — but for very different reasons. \`void\` means the function ==doesn't return anything meaningful== (though it may technically return \`undefined\`); \`never\` means the function ==never returns at all==, because it always throws or loops forever.

- \`function log(message: string): void { console.log(message); }\` — the caller shouldn't use its return value
- \`function fail(message: string): never { throw new Error(message); }\` — control flow never reaches the end of this function
- \`never\` also shows up when TypeScript narrows a union down to nothing left — the basis of *exhaustiveness checking*`,
  longExplanation: `\`void\` and \`never\` are easy to lump together as "functions with no useful return value," but they describe two genuinely different situations, and confusing them hides real bugs.

- \`void\` is the type TypeScript infers automatically for a function with no \`return\` statement, or only a bare \`return;\`. It means: this function *does* return control to the caller normally, execution continues right after the call — it just doesn't produce anything the caller should use. A \`void\`-typed function can still technically return \`undefined\` under the hood, but the type communicates *intent*: ignore whatever comes back.
- \`never\` describes a function that **cannot complete normally at all** — it either always throws an exception, or never finishes (an infinite loop with no escape). Unlike \`void\`, calling a \`never\`-typed function means execution never returns to whatever called it; control flow simply doesn't come back.
- The distinction matters for how each can be used: a \`never\`-typed function's call can be placed directly in a \`return\` position of another function — \`return fail("bad input");\` — and TypeScript accepts it, because it knows execution will never actually fall through past that point, so there's no missing return value to worry about.
- \`never\` has a special property: it's assignable to *every* other type (since a value that can never occur can't violate any type's constraints), but nothing else is assignable to \`never\` (except \`never\` itself). This one fact is what powers **exhaustiveness checking**.
- The classic exhaustiveness pattern: given a union type like a shape with several \`kind\` variants, a \`switch\` statement handles every variant explicitly, then falls through to a \`default\` branch. If every case really was handled, TypeScript narrows the value reaching \`default\` down to \`never\` — nothing is left. Passing that value into a helper like \`function assertNever(x: never): never { throw new Error(...); }\` compiles cleanly.
- The payoff comes later: if a new variant gets added to the union but a case for it is forgotten in the \`switch\`, that unhandled variant now flows into the \`default\` branch too — so the value there is no longer \`never\`, and the \`assertNever(x)\` call becomes a compile-time error, pointing directly at the exact spot that needs updating, instead of silently doing the wrong thing at runtime.
- A quick way to keep them straight: \`void\` says "don't use what comes back"; \`never\` says "nothing ever comes back."

Both types exist purely to make the *absence* of a meaningful return value explicit and checkable, rather than leaving it as an unstated assumption a future change could quietly violate.`,
  examples: [
    {
      id: "basic-void-function",
      title: "A void function",
      summary: "log has no meaningful return value — callers shouldn't use one.",
      code: `function logMessage(message: string): void {
  console.log(message);
  // return true; // Error: a "void" function shouldn't return a meaningful value.
}

function App() {
  logMessage("Application started");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Called logMessage("Application started") — check the console.</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "void" tells callers: don't rely on this function's return value, even if it technically returns undefined.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "never-always-throws",
      title: "A never function that always throws",
      summary: "fail never returns, so using it in a return position is valid.",
      code: `function fail(message: string): never {
  throw new Error(message);
}

function getDiscount(code: string): number {
  if (code === "SAVE10") {
    return 10;
  }
  if (code === "SAVE20") {
    return 20;
  }
  return fail("Unknown discount code: " + code);
}

function App() {
  let result: string;
  try {
    const discount = getDiscount("SAVE10");
    result = "Discount: " + discount + "%";
  } catch (error) {
    result = "Error handled safely.";
  }

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{result}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "fail" is typed "never" because it always throws — it never actually returns control to "getDiscount", so using it in a "return" position is still perfectly valid.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "never-infinite-loop-sketch",
      title: "never for a function that loops forever",
      summary: "Sketched as a comment only — an actual infinite loop would freeze the sandbox.",
      code: `// A function that never returns because it loops forever is also typed "never".
// (Shown here as a comment-only sketch, since actually running an infinite loop
// would freeze this live sandbox.)
//
//   function pollForever(): never {
//     while (true) {
//       checkSomething();
//     }
//   }

function assertUnreachable(message: string): never {
  throw new Error(message);
}

function App() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>See the commented "pollForever" sketch above the component in the editor.</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Both an infinite loop and an always-throwing function share the same "never" return type — control simply never comes back to the caller.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "never-exhaustiveness-check",
      title: "Exhaustiveness checking with never",
      summary: "A forgotten case in the switch would fail to compile at the default branch.",
      code: `type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "triangle"; base: number; height: number };

function assertNever(value: never): never {
  throw new Error("Unhandled shape: " + JSON.stringify(value));
}

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    case "square":
      return shape.side * shape.side;
    case "triangle":
      return 0.5 * shape.base * shape.height;
    default:
      return assertNever(shape);
  }
}

function App() {
  const circleArea = area({ kind: "circle", radius: 2 }).toFixed(2);
  const squareArea = area({ kind: "square", side: 3 });

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Circle area: {circleArea}</p>
      <p>Square area: {squareArea}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        If a new shape variant were added to "Shape" but not handled above, "shape" in the default branch would no longer be "never" — TypeScript would flag the "assertNever(shape)" call as a compile error immediately.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
