import type { Topic } from "../../types";

export const jsClassesTopic: Topic = {
  id: "js-classes",
  title: "JavaScript Classes",
  category: "Advanced Concepts",
  shortExplanation: `A **class** is a template for creating objects that share the same methods and initialization logic — introduced as cleaner syntax for a pattern JavaScript already had (see the *prototypes* topic).

- \`constructor(...)\` runs automatically each time \`new\` creates an instance, typically to set initial property values
- Methods are written inside the class body with no \`function\` keyword, and are automatically shared by every instance
- \`new ClassName(...)\` creates an actual instance — calling a class without \`new\` throws an error`,
  longExplanation: `A **class** is JavaScript's syntax for defining a blueprint that many similar objects can be created from — a \`User\` class describes what every user object will have (a \`name\`, an \`email\`) and what it can do (\`.greet()\`), and then \`new User(...)\` stamps out actual instances from that blueprint, each with its own data but sharing the same behavior.

A class body typically starts with a \`constructor\` method — a special method that runs automatically, exactly once, every time \`new\` is used to create an instance. Its job is almost always to receive some initial values as parameters and store them onto the new instance using \`this\`: \`this.name = name;\`. Whatever the constructor sets on \`this\` becomes that instance's own, independent properties — two different instances created from the same class never share these values; changing one user's \`name\` never touches another user's.

Regular methods are written directly inside the class body with no \`function\` keyword and no comma separating them: \`greet() { return "Hi, I'm " + this.name; }\`. Unlike constructor-assigned properties, methods are **not** copied individually onto every instance — they live in one shared place (the class's \`prototype\`, covered in its own topic) and every instance simply has access to them. This matters for memory: creating a thousand instances of a class with five methods does not create five thousand separate copies of those method functions; it creates one copy of each method, shared by reference.

Creating an actual instance requires the \`new\` keyword: \`const ada = new User("Ada", "ada@example.com");\`. \`new\` does several things in one step: it creates a brand-new empty object, links that object's prototype to the class, runs the constructor with \`this\` bound to that new object, and returns the finished object. Forgetting \`new\` — calling \`User("Ada", ...)\` directly — is a mistake JavaScript actually catches for you with real classes: unlike old-style constructor functions, calling a \`class\` without \`new\` throws a \`TypeError\` immediately, rather than silently producing broken behavior.

It's worth being upfront about what a class *actually is* under the hood: it is primarily **syntax sugar**. Before the \`class\` keyword existed, JavaScript developers built this exact same pattern — shared methods, per-instance data, \`new\` to construct — using plain functions and manually attaching methods to a function's \`prototype\`. The \`class\` syntax doesn't introduce a new capability or a fundamentally different object system; it gives the *same* underlying prototype-based mechanism a cleaner, more familiar-looking syntax (closer to class-based languages like Java or Python), which is why \`typeof SomeClass\` is still, genuinely, \`"function"\`. Understanding that connection — that a class's methods really do live on a prototype object, just like the *prototypes* topic describes — makes a lot of otherwise-mysterious JavaScript behavior make sense.`,
  examples: [
    {
      id: "defining-and-instantiating",
      title: "Defining a class and creating two instances",
      summary: "Each instance keeps its own data, but they share the exact same greet method.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    class User {
      constructor(name, email) {
        this.name = name;
        this.email = email;
      }
      greet() {
        return "Hi, I'm " + this.name;
      }
    }

    const ada = new User("Ada", "ada@example.com");
    const grace = new User("Grace", "grace@example.com");

    print(ada.greet());
    print(grace.greet());
    print("ada.name: " + ada.name + ", grace.name: " + grace.name);
    print("Same greet method, shared: " + (ada.greet === grace.greet));
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Create two Users</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "bank-account-instance",
      title: "A class instance that keeps state across renders",
      summary: "A BankAccount instance is just a regular object — its balance persists between clicks.",
      code: `function App() {
  class BankAccount {
    constructor(balance) {
      this.balance = balance;
    }
    deposit(amount) {
      this.balance += amount;
    }
    withdraw(amount) {
      this.balance -= amount;
    }
  }

  const accountRef = useRef(null);
  if (accountRef.current === null) {
    accountRef.current = new BankAccount(100);
  }
  const [, forceRender] = useState(0);

  function deposit() {
    accountRef.current.deposit(20);
    forceRender((n) => n + 1);
  }

  function withdraw() {
    accountRef.current.withdraw(20);
    forceRender((n) => n + 1);
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>Balance: <strong>{accountRef.current.balance}</strong></p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={deposit}>Deposit 20</button>
        <button onClick={withdraw}>Withdraw 20</button>
      </div>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        The same BankAccount instance keeps its own balance across re-renders — a class instance is just a regular object.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "new-required",
      title: "Calling a class without new throws",
      summary: "Unlike old-style constructor functions, ES classes always require new.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    class Widget {
      constructor(label) {
        this.label = label;
      }
    }
    const ok = new Widget("Panel");
    print("new Widget('Panel').label: " + ok.label);
    try {
      const broken = Widget("Panel");
      print("Widget('Panel') without new: " + broken);
    } catch (error) {
      print("Calling Widget() without new threw: " + error.message);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Call with and without new</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 90 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
