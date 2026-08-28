import type { Topic } from "../../types";

export const jsFunctionMethodsTopic: Topic = {
  id: "js-function-methods",
  title: "JavaScript call, apply, and bind",
  category: "Functions",
  shortExplanation: `Every function has three built-in methods for controlling exactly what \`this\` refers to when it runs.

- \`.call(thisValue, arg1, arg2, ...)\` — runs the function immediately, with \`this\` and arguments passed *individually*
- \`.apply(thisValue, [arg1, arg2, ...])\` — same as \`.call\`, but arguments are passed as a *single array*
- \`.bind(thisValue, ...)\` — returns a **new function** with \`this\` (and optionally some arguments) *permanently* locked in, without calling it yet
- A common real use: **borrowing** a method that belongs to one object and running it against another`,
  longExplanation: `Because a regular function's \`this\` is determined by *how* it's called rather than *where* it's defined, JavaScript provides three built-in methods — available on every function — for explicitly controlling what \`this\` should be during a call. They're less commonly needed in modern code (arrow functions and class syntax cover many of the same needs), but understanding them clarifies how \`this\` actually works, and they still show up in real codebases.

- **\`.call(thisArg, arg1, arg2, ...)\`** invokes the function *immediately*, setting \`this\` inside it to \`thisArg\`, and passing any further arguments individually, exactly as if they'd been passed to a normal call: \`greet.call(person, "Hello")\` runs \`greet\`, with \`this\` set to \`person\` and the string \`"Hello"\` as the first regular argument
- **\`.apply(thisArg, argsArray)\`** does exactly the same thing as \`.call\`, with one difference: the arguments are supplied as a *single array* (or array-like value) instead of listed individually: \`greet.apply(person, ["Hello"])\` is equivalent to the \`.call\` example above. \`.apply\` is especially handy when the arguments already exist as an array, or when the number of arguments isn't known ahead of time — historically it was also the standard way to pass an array as individual arguments to a function like \`Math.max\`, before the spread operator (\`Math.max(...numbers)\`) offered a cleaner alternative for that specific case
- **\`.bind(thisArg, arg1, ...)\`** is different from the other two in one crucial way: it does **not** call the function right away. Instead, it returns a **brand new function** with \`this\` permanently locked to \`thisArg\` (and, optionally, some leading arguments permanently pre-filled — called "partial application"). That new function can be called later, stored, passed around, or handed off as a callback, and no matter how *it* ends up being called, its \`this\` stays fixed to whatever was bound
- A classic, practical use of these is **method borrowing**: taking a method that belongs to one object's prototype (say, an array method) or another object entirely, and running it against a different object that doesn't natively have that method, as long as its shape is compatible. For example, an array-like object (such as a plain object with numeric keys and a \`length\`, or a DOM \`NodeList\`) can borrow \`Array.prototype.slice\` via \`.call\` to convert itself into a genuine array
- \`.bind\` is also the classic fix for the common "losing \`this\`" problem when passing an object method as a callback: \`button.addEventListener("click", obj.handleClick)\` loses \`obj\` as \`this\` when the browser later calls it, but \`button.addEventListener("click", obj.handleClick.bind(obj))\` guarantees \`this\` stays \`obj\` no matter who calls it. This is the same underlying problem arrow functions solve lexically — \`.bind\` solves it explicitly, at the call-setup site, and remains useful anywhere a regular function (not an arrow function) already exists and needs its \`this\` nailed down
- None of \`.call\`, \`.apply\`, or \`.bind\` have any effect on an **arrow function's** \`this\` — since arrow functions never have their own \`this\` to begin with, attempting to override it with these methods is silently ignored; the arrow function's lexical \`this\` wins regardless

A useful way to remember the three: "**C**all is **c**omma-separated arguments, **A**pply is an **a**rray of arguments, **B**ind doesn't call — it builds" a new function for later.`,
  examples: [
    {
      id: "call-basic",
      title: ".call() — invoke with a chosen this and listed arguments",
      summary: "The same standalone function runs against two different objects via call().",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function introduce(city) {
    return "Hi, I'm " + this.name + " from " + city + ".";
  }

  const ada = { name: "Ada" };
  const grace = { name: "Grace" };

  function run() {
    setLog([]);
    print(introduce.call(ada, "London"));
    print(introduce.call(grace, "New York"));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run .call() demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 80 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "apply-with-array",
      title: ".apply() — same idea, arguments as an array",
      summary: "Arguments already stored in an array get passed straight through with apply().",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function total(tax, shipping) {
    return "Subtotal for " + this.label + ": " + (this.subtotal + tax + shipping);
  }

  const order = { label: "Order #1", subtotal: 100 };
  const extraCosts = [8, 5];

  function run() {
    setLog([]);
    print("extraCosts array: [" + extraCosts.join(", ") + "]");
    print(total.apply(order, extraCosts));
    print("Math.max.apply(null, [3, 7, 2]) -> " + Math.max.apply(null, [3, 7, 2]) + "  (a classic pre-spread use of apply)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run .apply() demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "bind-new-function",
      title: ".bind() — a new function with this locked in",
      summary: "bind() returns a reusable function instead of calling immediately, fixing a lost-this callback bug.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);

    const car = {
      brand: "Volvo",
      describe: function () {
        return "This car is a " + this.brand;
      },
    };

    const looseReference = car.describe;
    const boundReference = car.describe.bind(car);

    print("Calling the method normally: " + car.describe());
    print("Calling a loose, unbound reference: " + looseReference());
    print("Calling the bound reference: " + boundReference());
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run .bind() demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "method-borrowing",
      title: "Borrowing a method with call()",
      summary: "An array-like object borrows Array.prototype.slice to become a real array.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);

    const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
    print("arrayLike: " + JSON.stringify(arrayLike));
    print("Array.isArray(arrayLike) -> " + Array.isArray(arrayLike));

    const realArray = Array.prototype.slice.call(arrayLike);
    print("Borrowed slice via call() -> " + JSON.stringify(realArray));
    print("Array.isArray(realArray) -> " + Array.isArray(realArray));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run method-borrowing demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
