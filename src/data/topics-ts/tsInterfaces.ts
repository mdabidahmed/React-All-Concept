import type { Topic } from "../../types";

export const tsInterfacesTopic: Topic = {
  id: "ts-interfaces",
  title: "TypeScript Interfaces",
  category: "Interfaces & Types",
  shortExplanation: `An **interface** describes the *shape* of an object — which properties it must have, and what type each one is.

- \`interface Point { x: number; y: number; }\` — any object matching this shape satisfies it
- Properties can be marked \`?\` (optional) or \`readonly\`
- TypeScript uses ==structural typing== — an object doesn't need to explicitly "implement" an interface, it just needs the right shape`,
  longExplanation: `Once an app has more than a handful of objects flowing around — a user, a product, an API response — writing out \`{ name: string, age: number }\` inline everywhere gets repetitive and error-prone. An \`interface\` gives that shape a name once, and every function, variable, or component prop can reference it by that name instead.

- The basic syntax lists each property and its type: \`interface User { name: string; email: string; age: number; }\`. A variable typed as \`User\` must have exactly those properties with matching types
- A property followed by \`?\` is **optional** — \`interface User { nickname?: string; }\` means an object can be a valid \`User\` with or without a \`nickname\`. Inside code, TypeScript will remind you to check whether an optional property exists before using it, since it might be \`undefined\`
- A property marked \`readonly\` can be set once (usually at creation) but never reassigned afterward — \`interface Point { readonly x: number; }\` — attempting \`point.x = 5\` later is a compile-time error
- TypeScript's type system is **structural**, not nominal — unlike some other typed languages, an object doesn't need to explicitly declare "I implement interface X." If it simply *has* all the required properties with the right types, TypeScript considers it compatible. This is often called "duck typing": if it walks like a duck and quacks like a duck, it's treated as a duck
- Interfaces can describe function shapes too, not just objects with data properties — but that's covered in more depth in the Functions category
- One interface can **extend** another (covered in the next topic), building up more specific shapes from simpler, shared ones — useful for modeling real hierarchies like a \`User\` and an \`AdminUser\` that has all of a \`User\`'s properties plus more

Interfaces are one of the two main ways to describe an object's shape in TypeScript — the other being \`type\` aliases, covered next, which can do almost everything an interface can plus a bit more, with a few practical trade-offs between the two worth knowing.`,
  examples: [
    {
      id: "basic-interface",
      title: "A basic interface describing an object shape",
      summary: "Any object matching the shape satisfies the User interface — no explicit \"implements\" needed.",
      code: `interface User {
  name: string;
  email: string;
  age: number;
}

function App() {
  const user: User = {
    name: "Ada Lovelace",
    email: "ada@example.com",
    age: 28,
  };

  return (
    <div>
      <p>{user.name} ({user.age}) — {user.email}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "optional-and-readonly",
      title: "Optional and readonly properties",
      summary: "nickname? can be omitted; readonly id can never be reassigned after creation.",
      code: `interface Profile {
  readonly id: number;
  name: string;
  nickname?: string;
}

function App() {
  const withNickname: Profile = { id: 1, name: "Grace Hopper", nickname: "Amazing Grace" };
  const withoutNickname: Profile = { id: 2, name: "Ada Lovelace" };

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <p>{withNickname.name} — aka "{withNickname.nickname}"</p>
      <p>{withoutNickname.name} — {withoutNickname.nickname ?? "no nickname set"}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try "withNickname.id = 5" in the editor — readonly blocks it at compile time.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "structural-typing",
      title: "Structural typing: shape matters, not the label",
      summary: "A plain object literal satisfies Point just by having the right properties — no explicit link required.",
      code: `interface Point {
  x: number;
  y: number;
}

function describe(point: Point): string {
  return "(" + point.x + ", " + point.y + ")";
}

function App() {
  // This object never says "I am a Point" — it just happens to match the shape.
  const location = { x: 10, y: 20 };

  return (
    <div>
      <p>{describe(location)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        TypeScript accepted "location" as a Point purely because its shape matches — this is structural typing.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "interface-for-props",
      title: "Interfaces describing function parameters",
      summary: "A CardProps-style interface makes a function's expected input completely explicit.",
      code: `interface CardInfo {
  title: string;
  count: number;
}

function renderSummary(info: CardInfo): string {
  return info.title + ": " + info.count + " items";
}

function App() {
  const cards: CardInfo[] = [
    { title: "Inbox", count: 4 },
    { title: "Drafts", count: 1 },
    { title: "Sent", count: 12 },
  ];

  return (
    <ul>
      {cards.map((card) => (
        <li key={card.title}>{renderSummary(card)}</li>
      ))}
    </ul>
  );
}

render(<App />);`,
    },
  ],
};
