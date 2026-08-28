import type { Topic } from "../../types";

export const tsTypeInferenceTopic: Topic = {
  id: "ts-type-inference",
  title: "TypeScript Type Inference",
  category: "TS Basics",
  shortExplanation: `TypeScript doesn't require a type annotation on every single value — it can often figure the type out on its own just by looking at what's assigned.

- \`let x = 5;\` — TypeScript infers \`x: number\` without you writing it anywhere
- Inference locks in at the initial value, so \`let x = 5; x = "hi";\` is still an error, even with no annotation in sight
- Explicit annotations still matter for function *parameters* (there's nothing to infer from until the function is called) and to intentionally document or widen a type
- ==Contextual typing== lets TypeScript infer a callback's parameter types from the context it's used in, like \`.map()\` or an event handler`,
  longExplanation: `Writing \`: number\` after every single variable would get exhausting fast, and TypeScript doesn't require it — the compiler is quite good at looking at the right-hand side of an assignment and figuring out the type on its own. This is called **type inference**, and it's a big part of why idiomatic TypeScript code doesn't look nearly as cluttered with annotations as people expect.

- The simplest case: \`let x = 5;\` — TypeScript looks at the literal \`5\` and infers \`x: number\`, exactly as if you'd written the annotation yourself. From that point on, \`x\` is checked as a \`number\` everywhere it's used, including a later reassignment like \`x = "hi";\`, which is rejected even though no annotation ever appeared in the source
- Inference works for objects and arrays too: \`const point = { x: 1, y: 2 };\` infers a shape with two \`number\` properties, and \`const names = ["Ada", "Grace"];\` infers \`string[]\`, all without a single explicit type anywhere
- Where inference *can't* help is function **parameters**. A parameter has no initial value to look at — it only gets one the moment the function is called, which is too late for the compiler to infer anything useful ahead of time. \`function double(n) { return n * 2; }\` leaves \`n\` completely untyped (effectively \`any\`) unless you write \`function double(n: number)\` yourself. This is the one place an annotation is routinely *required*, not just optional
- Return types, by contrast, usually *can* be inferred just fine from what the function body returns, so many style guides only bother annotating a return type when it adds real documentation value for a public function, or when you deliberately want the compiler to hold you to a specific return shape even if the implementation changes later
- **Contextual typing** is inference running in the other direction: instead of inferring a type from a value, TypeScript infers a value's type from the *context* it's used in. The classic example is a callback: in \`numbers.map((n) => n * 2)\`, \`n\` gets no annotation at all, yet TypeScript already knows \`numbers\` is \`number[]\`, so it infers that \`.map\`'s callback parameter — and therefore \`n\` — must be a \`number\`. The same thing happens with DOM event handlers, where the expected handler signature tells TypeScript what shape the event argument has
- Explicit annotations are still worth adding even when inference would technically work, any time the annotation is documentation for future readers, or a deliberate guard rail: a function's return type annotation, for instance, will flag an error at the \`return\` statement itself if a future edit accidentally changes what's returned — catching the mistake right where it was introduced, rather than wherever the now-wrong value happens to be used later

The practical rule of thumb: let inference do the work for local variables and simple expressions, and reach for an explicit annotation at the *boundaries* — function parameters (required), and public function returns or exported values (optional, but often worth the clarity).`,
  examples: [
    {
      id: "inference-from-an-initial-value",
      title: "Inference from an initial value",
      summary: "let x = 5 is inferred as number, with no annotation written anywhere.",
      code: `function App() {
  let x = 5; // inferred as number, no annotation written
  x = 10; // fine — still a number

  const label = "Count: " + x; // inferred as string

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{label}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try "x = 'ten'" below in the editor — TypeScript rejects it even though x never got an
        explicit type annotation.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "parameters-need-annotations",
      title: "Function parameters need annotations",
      summary: "There's nothing to infer a parameter's type from until the function is actually called.",
      code: `function App() {
  // Parameters have nothing to infer from until the function is called,
  // so they need an explicit annotation:
  function double(n: number): number {
    return n * 2;
  }

  const result = double(21);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>double(21) = {result}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        The ": number" return type here is actually inferable too — "n * 2" is obviously a number —
        so only the parameter "n: number" is strictly required.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "contextual-typing-in-a-callback",
      title: "Contextual typing in a callback",
      summary: "TypeScript infers a callback parameter's type from how the array itself is typed.",
      code: `function App() {
  const numbers = [1, 2, 3, 4];

  // TypeScript infers "n: number" here purely from context — numbers is number[],
  // so .map's callback parameter is contextually known to be a number. No annotation needed.
  const doubled = numbers.map((n) => n * 2);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>original: {numbers.join(", ")}</p>
      <p>doubled: {doubled.join(", ")}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "n" is fully type-checked as a number inside the callback, even though "n" has no
        annotation at all.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "explicit-annotation-as-documentation",
      title: "When an explicit annotation adds clarity anyway",
      summary: "Inference would work here too, but the return type documents the intended public shape.",
      code: `interface Summary {
  total: number;
  average: number;
}

function summarize(nums: number[]): Summary {
  const total = nums.reduce((sum, n) => sum + n, 0);
  return { total, average: total / nums.length };
}

function App() {
  const summary = summarize([10, 20, 30]);

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>total: {summary.total}</p>
      <p>average: {summary.average}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Without ": Summary", TypeScript would infer the exact same shape here — the annotation
        is for the humans reading the signature, and to catch a future accidental change.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
