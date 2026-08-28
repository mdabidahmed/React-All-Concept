import type { Topic } from "../../types";

export const tsReadonlyPropertiesTopic: Topic = {
  id: "ts-readonly-properties",
  title: "TypeScript Readonly Class Properties",
  category: "Classes & OOP",
  shortExplanation: `A class property marked \`readonly\` can be set **once** — either at its declaration or inside the constructor — and never reassigned again anywhere else, including from other methods on the same instance.

- \`readonly id: string;\` set inside the constructor, then locked for the lifetime of that instance
- Constructor shorthand works too: \`constructor(readonly id: string) {}\`
- \`readonly\` is about **reassignment**, not visibility — it's a completely separate, ==orthogonal== concern from \`public\`/\`private\`/\`protected\`, and the two combine freely: \`private readonly secret: string;\``,
  longExplanation: `A \`readonly\` property on a class works the same way \`readonly\` works on an interface or a plain object type: once the property has been given its initial value, TypeScript refuses to compile any later code that tries to assign it a new one — the only place a \`readonly\` property is ever allowed to be *set* is at its declaration or inside the constructor.

- **Setting at declaration**: \`readonly maxRetries = 3;\` gives the property its one and only value right in the class body. Every instance gets that same value, and no method — not even one defined on the same class — is allowed to change it afterward.
- **Setting in the constructor**: \`readonly id: string; constructor(id: string) { this.id = id; }\` lets each instance receive a different value at creation time, while still locking it down permanently once construction finishes. This is the more common pattern, since it lets each object have its own fixed identity or configuration decided when it's built.
- **Constructor parameter shorthand** combines with \`readonly\` exactly the way it combines with access modifiers: \`constructor(readonly id: string) {}\` declares the property and assigns it from the parameter in one step, with no separate \`this.id = id;\` line needed.
- The restriction applies **everywhere outside the constructor**, including other instance methods. A method like \`resetId(): void { this.id = "new"; }\` is a compile-time error the moment \`id\` is \`readonly\` — it makes no difference that the method belongs to the very same class; only the constructor (and the declaration itself) gets a pass.
- \`readonly\` is entirely **orthogonal** to the access modifiers (\`public\`, \`private\`, \`protected\`) covered in an earlier topic — the two answer completely different questions. An access modifier controls *where* a member can be read or written from at all; \`readonly\` controls whether it can be *reassigned*, regardless of who's doing the reassigning. Because they're independent, every combination is valid and meaningful: \`public readonly id: string;\` is freely readable from anywhere but never reassignable; \`private readonly secretKey: string;\` can only even be read from inside the class, and even there, never reassigned after construction.
- Just like \`readonly\` on an interface property, a \`readonly\` class property that holds an **array or object** only protects the property binding itself, not the contents of what it holds. \`readonly items: string[]\` stops \`this.items = []\` from ever happening again after construction, but it does not stop \`this.items.push(...)\`, since pushing mutates the existing array rather than reassigning the property to a different one. Locking down the contents too requires typing the property itself as a readonly array, exactly as with interfaces.
- \`readonly\` is a **compile-time-only** guarantee, consistent with every other TypeScript-specific feature — once compiled to plain JavaScript, the check disappears entirely, and nothing at runtime physically prevents the underlying property from being reassigned (unlike a genuinely immutable data structure). Its value is in catching accidental reassignment while writing and maintaining code, not in providing runtime tamper-proofing.

A useful mental model: reach for \`readonly\` any time a property represents something that's fundamentally decided once and for all at the moment an object comes into existence — an id, a creation timestamp, a fixed configuration value passed in at construction — and should never legitimately change again for that object's entire lifetime, regardless of which part of the codebase might otherwise be tempted to touch it.`,
  examples: [
    {
      id: "readonly-set-at-declaration",
      title: "readonly set directly at declaration",
      summary: "maxRetries is fixed for every instance and can never be reassigned by any method.",
      code: `class NetworkClient {
  readonly maxRetries = 3;
  attempts = 0;

  recordAttempt(): void {
    this.attempts += 1; // fine — "attempts" is not readonly

    // this.maxRetries = 5; // Error: "maxRetries" is readonly and was already set at declaration.
  }
}

function App() {
  const client = new NetworkClient();
  client.recordAttempt();
  client.recordAttempt();

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Max retries: {client.maxRetries}</p>
      <p>Attempts so far: {client.attempts}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "readonly-set-in-constructor",
      title: "readonly set in the constructor, via shorthand",
      summary: "Each Order instance gets its own fixed id, locked permanently after construction.",
      code: `class Order {
  status = "pending";

  // Constructor parameter shorthand + readonly: declared, assigned, and locked in one step.
  constructor(readonly id: string) {}

  markShipped(): void {
    this.status = "shipped"; // fine — "status" is not readonly

    // this.id = "new-id"; // Error: "id" is readonly and can only be set in the constructor.
  }
}

function App() {
  const order = new Order("ORD-9001");
  order.markShipped();

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Order {order.id} — status: {order.status}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "id" was set once in the constructor and can never change again, even from methods on the same class.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "readonly-combined-with-private",
      title: "readonly combined with private — two independent concerns",
      summary: "apiKey is both hidden from outside code (private) AND unreassignable (readonly).",
      code: `class ApiConnection {
  // private controls WHERE it can be accessed from; readonly controls WHETHER it can be reassigned.
  // Both apply independently at the same time here.
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  maskedKey(): string {
    return this.apiKey.slice(0, 4) + "****";
  }
}

function App() {
  const connection = new ApiConnection("sk-live-12345");

  // connection.apiKey;         // Error: private — not accessible from outside the class.
  // connection.apiKey = "new"; // Error: private AND readonly — blocked for two separate reasons.

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>API key: {connection.maskedKey()}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "private" and "readonly" are independent — either one alone would already block the commented-out lines.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "readonly-array-property-nuance",
      title: "readonly protects the property, not automatically the array's contents",
      summary: "The tags array can still be mutated in place unless it's also typed as a readonly array.",
      code: `class Article {
  readonly tags: string[];

  constructor(tags: string[]) {
    this.tags = tags;
  }

  addTag(tag: string): void {
    // this.tags = [...this.tags, tag]; // Error: reassigning "tags" itself is blocked by readonly.
    this.tags.push(tag); // Allowed: mutating the existing array's contents is NOT a reassignment.
  }
}

function App() {
  const article = new Article(["typescript"]);
  article.addTag("classes");

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Tags: {article.tags.join(", ")}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        readonly here only stops "this.tags = ..."; to also block ".push()", "tags" would need to be typed as "readonly string[]".
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
