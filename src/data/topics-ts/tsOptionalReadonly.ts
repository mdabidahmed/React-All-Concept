import type { Topic } from "../../types";

export const tsOptionalReadonlyTopic: Topic = {
  id: "ts-optional-readonly",
  title: "TypeScript Optional and Readonly Modifiers",
  category: "Interfaces & Types",
  shortExplanation: `\`?\` marks a property as **optional** — it may or may not be present on a given object. \`readonly\` marks a property as **fixed after creation** — it can be set once, but never reassigned afterward.

- \`nickname?: string;\` means an object can be valid with or without \`nickname\` — its type inside code is \`string | undefined\`
- \`readonly id: string;\` allows reading \`id\` freely but blocks \`obj.id = "new"\` anywhere outside the object's initial creation
- \`readonly\` also applies to arrays: \`readonly string[]\` (or \`ReadonlyArray<string>\`) blocks \`.push()\`, \`.pop()\`, and index reassignment
- \`Readonly<T>\` is a built-in utility type that makes **every** property of an existing type \`T\` readonly, all at once, without rewriting the shape by hand`,
  longExplanation: `\`?\` and \`readonly\` are two small property modifiers that solve two completely different problems — whether a property has to be there at all, and whether it can change once it is. They're often introduced together because they both attach directly to a property declaration, but understanding them as answering different questions makes each one easier to reason about on its own.

**Optional properties (\`?\`)**

- Adding \`?\` after a property name — \`nickname?: string;\` — means an object can be considered valid for that interface or type whether or not \`nickname\` is present. Both \`{ name: "Ada" }\` and \`{ name: "Ada", nickname: "Countess" }\` satisfy an interface with an optional \`nickname\`.
- Inside code, an optional property's type is implicitly widened to include \`undefined\` — \`nickname?: string\` behaves like \`nickname: string | undefined\` for the purposes of using it. This means TypeScript requires a check (\`if (user.nickname)\`, or the \`??\` / \`?.\` operators) before treating it as a definite \`string\`, since it might genuinely be missing.
- Optional properties are common on configuration objects, partial updates, and any shape where some fields are only sometimes relevant.

**Readonly properties**

- Adding \`readonly\` before a property name — \`readonly id: string;\` — means that property can be set when the object is first created, but any later attempt to reassign it (\`obj.id = "new-id";\`) is a compile-time error, no matter where that assignment is attempted from.
- \`readonly\` only prevents **reassigning** the property itself — it does not make the value it holds immutable. \`readonly items: string[]\` still allows \`items.push(...)\`, because pushing mutates the array's contents without reassigning the \`items\` property to a new array. To also lock down the contents of an array, the property's type itself needs to be a readonly array.

**Readonly arrays**

- \`readonly string[]\` (equivalently written \`ReadonlyArray<string>\`) is a distinct array type that exposes only the non-mutating methods (\`.map\`, \`.filter\`, \`.slice\`, reading by index) and removes the mutating ones (\`.push\`, \`.pop\`, \`.splice\`, index assignment) from what's allowed at compile time. A property typed \`readonly tags: readonly string[]\` combines both ideas: the \`tags\` property can't be reassigned to a different array, *and* the array it holds can't be mutated in place either.
- This is a compile-time-only restriction, just like every other type annotation — at runtime, a "readonly array" is a completely ordinary JavaScript array with no special behavior; TypeScript alone refuses to compile code that calls a mutating method on a value typed this way.

**The \`Readonly<T>\` utility type**

- Manually adding \`readonly\` to every single property of a large existing type is tedious and easy to get inconsistent. \`Readonly<T>\` is a built-in "utility type" that takes any type \`T\` and produces a new type with every one of its properties automatically marked \`readonly\`: \`type FrozenUser = Readonly<User>;\` produces a version of \`User\` where none of the original properties can be reassigned, without writing out the shape a second time by hand.
- \`Readonly<T>\` only affects the type used at compile time — calling it doesn't freeze an actual object at runtime (that's what \`Object.freeze()\` does, a genuinely separate, runtime mechanism). A common, robust pattern pairs both together: \`Object.freeze(someObject) as Readonly<SomeType>\`, so the compiler *and* the runtime agree the object shouldn't change.

\`?\` and \`readonly\` frequently show up on the very same property declaration together — \`readonly nickname?: string;\` is completely valid, meaning the property may be absent, but if present, it can never be reassigned once set. Treating the two as answering separate questions — "does it have to be there?" versus "can it change afterward?" — makes combinations like this easy to read correctly.`,
  examples: [
    {
      id: "optional-properties-basic",
      title: "Optional properties with ?",
      summary: "An object is valid with or without nickname — but it must be checked before being used as a string.",
      code: `interface Profile {
  name: string;
  nickname?: string;
}

function greet(profile: Profile): string {
  // profile.nickname might be undefined — the ?? fallback handles that safely.
  const displayName = profile.nickname ?? profile.name;
  return "Hello, " + displayName + "!";
}

function App() {
  const withNickname: Profile = { name: "Grace Hopper", nickname: "Amazing Grace" };
  const withoutNickname: Profile = { name: "Ada Lovelace" };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{greet(withNickname)}</p>
      <p>{greet(withoutNickname)}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "readonly-property-basic",
      title: "A readonly property can only be set once",
      summary: "id is assigned at creation and can never be reassigned afterward, anywhere.",
      code: `interface Ticket {
  readonly id: string;
  status: string;
}

function App() {
  const ticket: Ticket = { id: "TCK-001", status: "open" };

  // Reassigning "status" is fine — it isn't readonly.
  ticket.status = "closed";

  // ticket.id = "TCK-002"; // Error: "id" is readonly and cannot be reassigned.

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Ticket {ticket.id} — status: {ticket.status}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Uncomment the "ticket.id = ..." line in the editor to see the compile-time error.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "readonly-arrays",
      title: "readonly arrays block mutating methods",
      summary: "A readonly string[] permits reading and mapping, but not push, pop, or index assignment.",
      code: `function summarize(tags: readonly string[]): string {
  // Reading, mapping, and filtering are all fine on a readonly array.
  return tags.map((tag) => "#" + tag).join(" ");

  // tags.push("new-tag"); // Error: push does not exist on a readonly array type.
}

function App() {
  const tags: readonly string[] = ["react", "typescript", "vite"];

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{summarize(tags)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "readonly string[]" (same as ReadonlyArray&lt;string&gt;) exposes only non-mutating methods at compile time.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "readonly-utility-type",
      title: "The Readonly<T> utility type",
      summary: "Readonly<User> marks every property of User as readonly, all at once, without rewriting the shape.",
      code: `interface User {
  name: string;
  email: string;
}

type FrozenUser = Readonly<User>;

function App() {
  const user: FrozenUser = { name: "Ada Lovelace", email: "ada@example.com" };

  // user.name = "Someone Else"; // Error: "name" is readonly via Readonly<User>.

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{user.name} — {user.email}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Readonly&lt;User&gt; is equivalent to manually marking every property of User as readonly, generated automatically.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
