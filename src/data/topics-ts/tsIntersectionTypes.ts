import type { Topic } from "../../types";

export const tsIntersectionTypesTopic: Topic = {
  id: "ts-intersection-types",
  title: "TypeScript Intersection Types",
  category: "Interfaces & Types",
  shortExplanation: `An **intersection type**, written \`TypeA & TypeB\`, combines two (or more) types into one new type that has *everything* from both — every property, every requirement, all at once.

- \`type AdminUser = User & { permissions: string[] };\` — an \`AdminUser\` must satisfy \`User\` AND the extra object shape
- Similar goal to extending an interface, but a different mechanism: \`&\` works on *any* type, not only interfaces
- Intersecting two object types with a **conflicting** property (same name, incompatible types) usually collapses that property to \`never\` — a signal something's wrong`,
  longExplanation: `An **intersection type** combines multiple types into a single type that satisfies all of them simultaneously, using the \`&\` operator: \`type Combined = TypeA & TypeB;\`. A value typed as \`Combined\` must have every property \`TypeA\` requires *and* every property \`TypeB\` requires — the intersection adds requirements together rather than offering a choice between them (that's what a union, \`|\`, does instead).

- The most common use is combining a base object shape with additional fields, without declaring a brand-new interface: \`type AdminUser = User & { permissions: string[] };\`. Any object assigned to \`AdminUser\` must have all of \`User\`'s properties plus a \`permissions\` array — functionally very similar to \`interface AdminUser extends User { permissions: string[] }\` from the previous topic.
- **Intersections vs. extending an interface** achieve a similar practical result for object shapes, but they work differently and have different reach. \`extends\` is a feature of interfaces specifically — it reads naturally as "this is a more specific version of that," and TypeScript gives clear, targeted errors when an extended interface's members conflict. An intersection with \`&\` works on any type at all, including type aliases, unions, and primitives, not just interfaces or object shapes — it reads more mechanically as "combine these two type definitions into one." For straightforward, single-inheritance-style object shapes, both largely produce the same day-to-day experience; intersections earn their keep specifically where a plain \`extends\` clause wouldn't apply, such as combining two independent type aliases on the fly, or building a "mixin"-style type from several smaller pieces without declaring a new named interface for the combination.
- **Combining several independent pieces** is a natural fit for intersections: \`type Timestamped = { createdAt: Date };\`, \`type Identified = { id: string };\`, then \`type Entity = Timestamped & Identified & { name: string };\` builds one shape out of three separate, independently-reusable pieces, without any of them needing to know about each other in advance the way \`extends\` would require them to be interfaces.
- **Conflicting members** are where intersections get subtle. If \`TypeA\` says a property is a \`string\` and \`TypeB\` says the same property name is a \`number\`, the intersection doesn't pick one or error out immediately — it computes the intersection of the two property types themselves. Since no value can be both a \`string\` and a \`number\` at once, that property's effective type becomes \`never\`, meaning the object as a whole becomes essentially impossible to construct validly. Seeing \`never\` show up unexpectedly on a property is usually a sign that two intersected types were never meant to be combined in the first place.
- **Intersections aren't limited to object shapes.** \`&\` can combine unions, function types, and primitives-with-brands (a common advanced pattern for creating distinct "nominal-like" types out of otherwise-identical primitives, such as \`type UserId = string & { __brand: "UserId" };\`). This flexibility — working uniformly across every kind of type — is the main practical advantage an intersection has over \`extends\`, which is scoped specifically to interfaces.
- Like every other type-level construct, an intersection type exists purely at **compile time**. \`&\` never runs any code, merges no actual objects at runtime, and adds no overhead — it only affects what TypeScript will accept as valid where the combined type is expected.

The rule of thumb from the previous topics still applies here: reach for \`extends\` when the relationship is a clean, single-purpose "this interface builds on that one," and reach for an intersection when combining independently-defined types, working with a \`type\` alias rather than an interface, or building a type from pieces that were never designed with a single shared \`extends\` hierarchy in mind.`,
  examples: [
    {
      id: "basic-intersection",
      title: "Combining two object types into one",
      summary: "AdminUser must satisfy both User and the extra permissions object shape.",
      code: `type User = {
  name: string;
  email: string;
};

type AdminUser = User & {
  permissions: string[];
};

function App() {
  const admin: AdminUser = {
    name: "Grace Hopper",
    email: "grace@example.com",
    permissions: ["delete-users", "edit-content"],
  };

  // const incomplete: AdminUser = { name: "Ada", permissions: [] };
  // Error above: missing "email" — the intersection still requires everything from User.

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{admin.name} ({admin.email})</p>
      <p>Permissions: {admin.permissions.join(", ")}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "combining-independent-pieces",
      title: "Building one shape out of several independent pieces",
      summary: "Entity is composed from three separately-reusable type aliases via &.",
      code: `type Timestamped = {
  createdAt: string;
};

type Identified = {
  id: string;
};

type Entity = Timestamped & Identified & {
  name: string;
};

function App() {
  const record: Entity = {
    id: "rec-001",
    name: "Quarterly Report",
    createdAt: "2026-01-15",
  };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{record.name} (#{record.id})</p>
      <p>Created: {record.createdAt}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Timestamped, Identified, and the inline name field never needed to know about each other in advance.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "extends-vs-intersection-side-by-side",
      title: "extends vs. & achieving a similar result",
      summary: "AdminViaExtends and AdminViaIntersection end up requiring the exact same shape.",
      code: `interface Base {
  name: string;
}

// Same practical outcome, two different mechanisms:
interface AdminViaExtends extends Base {
  permissions: string[];
}

type AdminViaIntersection = Base & {
  permissions: string[];
};

function App() {
  const a: AdminViaExtends = { name: "Ada", permissions: ["read"] };
  const b: AdminViaIntersection = { name: "Grace", permissions: ["write"] };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{a.name}: {a.permissions.join(", ")}</p>
      <p>{b.name}: {b.permissions.join(", ")}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Same requirements either way — "extends" reads as inheritance, "&" reads as combining two definitions.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "conflicting-property-becomes-never",
      title: "A conflicting property collapses to never",
      summary: "Intersecting a string id with a number id leaves no valid value for that property at all.",
      code: `type HasStringId = { id: string };
type HasNumberId = { id: number };

// id's effective type here is "string & number", which no real value can ever satisfy — it becomes "never".
type Broken = HasStringId & HasNumberId;

function App() {
  // "id" is still a valid property NAME on Broken — only its VALUE type collapsed to "never".
  const onlyKeyOnBroken: keyof Broken = "id";

  // const attempt: Broken = { id: "abc" }; // Error: string is not assignable to "never".
  // const attempt2: Broken = { id: 123 };  // Error: number is not assignable to "never".

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Broken's only key is "{onlyKeyOnBroken}", but its value type is "never" — no object can ever satisfy it.</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Seeing "never" appear unexpectedly on an intersected property is a sign two incompatible types were combined.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
