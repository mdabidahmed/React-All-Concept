import type { Topic } from "../../types";

export const tsExtendingInterfacesTopic: Topic = {
  id: "ts-extending-interfaces",
  title: "TypeScript Extending Interfaces",
  category: "Interfaces & Types",
  shortExplanation: `An interface can **extend** one or more other interfaces with \`interface Admin extends User { ... }\`, inheriting every member of the base shape and adding more on top. This builds specific shapes out of shared, reusable pieces instead of repeating properties in every related interface.

- \`interface Admin extends User { permissions: string[]; }\` — every \`Admin\` is guaranteed to also have everything a \`User\` has
- An interface can extend **multiple** interfaces at once: \`interface Staff extends Person, Employable { ... }\`
- An object satisfying the extended interface must satisfy *all* of the inherited requirements, not just the new ones`,
  longExplanation: `As an app grows, many related object shapes tend to share a common core — a \`User\` and an \`AdminUser\` both have a name and an email, but the \`AdminUser\` also needs a list of permissions. Writing out the shared properties twice works, but it means any change to the shared fields has to be made in two places and can silently drift out of sync. **Extending an interface** solves this by declaring the shared shape once and building more specific shapes on top of it.

- The syntax is \`interface Derived extends Base { /* additional members */ }\`. Every member declared on \`Base\` becomes a requirement on \`Derived\` automatically — there's no need to repeat any of them. \`interface AdminUser extends User { permissions: string[]; }\` means: an \`AdminUser\` must have everything a \`User\` has (say, \`name\` and \`email\`), plus a \`permissions\` array.
- A value typed as the extended interface must genuinely satisfy the full combined shape. An object missing a property from the *base* interface fails to satisfy the *derived* interface just as surely as one missing a property declared directly on it — extension adds requirements, it never removes or relaxes any.
- An interface can extend **more than one** interface at the same time, by listing them comma-separated: \`interface Staff extends Person, Employable { department: string; }\`. The resulting \`Staff\` shape requires everything from \`Person\`, everything from \`Employable\`, and the new \`department\` property — combining several independent shapes into one. This is a common way to compose a type out of a handful of smaller, focused interfaces rather than one large one.
- If two extended interfaces both declare a property with the **same name but incompatible types**, TypeScript reports a compile-time error at the \`extends\` clause rather than silently picking one — it wants the conflict resolved explicitly rather than guessing which definition should win.
- A derived interface can **narrow** an inherited property to a more specific type, as long as the narrower type is still assignable to the original — for example, a base interface's \`id: string | number\` could be narrowed to \`id: string\` in a derived interface, since every \`string\` is already a valid \`string | number\`. It cannot widen a property to something incompatible with the base.
- Extending an interface is checked entirely at **compile time** and has zero runtime footprint — much like every other type-level construct in TypeScript, there's no actual object being built or copied behind the scenes. An object satisfying an extended interface is simply a plain object shaped correctly; nothing marks it at runtime as "an \`AdminUser\`" versus "a \`User\`" beyond which properties it happens to have.
- Extending interfaces achieves a very similar practical outcome to combining types with an **intersection** (\`TypeA & TypeB\`, covered in the next topic) — both let one shape build on others. The difference is mechanism and flexibility: \`extends\` only works between interfaces (or interface-compatible object types) and reads naturally as "this IS-A more specific version of that," while an intersection works with any type at all, including unions and primitives, and reads more as "smash these two type definitions together."

Extending interfaces is one of the main tools for modeling real hierarchies — a base \`Shape\` with \`area()\`, extended by \`Circle\` and \`Rectangle\` each adding their own specifics; a base \`Person\`, extended by \`Employee\` and further by \`Manager\`. Each level only declares what's new, while everything shared stays defined in exactly one place.`,
  examples: [
    {
      id: "basic-single-extends",
      title: "A basic single-interface extension",
      summary: "Dog extends Animal, inheriting name and adding its own breed property.",
      code: `interface Animal {
  name: string;
  sound: string;
}

interface Dog extends Animal {
  breed: string;
}

function describeDog(dog: Dog): string {
  return dog.name + " the " + dog.breed + " says " + dog.sound;
}

function App() {
  const rex: Dog = { name: "Rex", sound: "Woof", breed: "Labrador" };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{describeDog(rex)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Dog requires everything Animal requires (name, sound) plus its own breed.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "admin-extends-user",
      title: "Admin extends User: a more specific shape from a shared base",
      summary: "AdminUser must satisfy every User requirement plus its own permissions array.",
      code: `interface User {
  name: string;
  email: string;
}

interface AdminUser extends User {
  permissions: string[];
}

function canDeleteUsers(admin: AdminUser): boolean {
  return admin.permissions.includes("delete-users");
}

function App() {
  const admin: AdminUser = {
    name: "Grace Hopper",
    email: "grace@example.com",
    permissions: ["delete-users", "edit-content"],
  };

  // const incomplete: AdminUser = { name: "Ada", permissions: [] };
  // Error above: missing "email", which AdminUser still requires from User.

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{admin.name} ({admin.email})</p>
      <p>Can delete users: {canDeleteUsers(admin) ? "yes" : "no"}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "extending-multiple-interfaces",
      title: "Extending multiple interfaces at once",
      summary: "Staff combines everything from Person AND Employable, plus its own department field.",
      code: `interface Person {
  name: string;
  age: number;
}

interface Employable {
  employeeId: string;
  salary: number;
}

interface Staff extends Person, Employable {
  department: string;
}

function describeStaff(staff: Staff): string {
  return staff.name + " (#" + staff.employeeId + ") works in " + staff.department;
}

function App() {
  const staffMember: Staff = {
    name: "Ada Lovelace",
    age: 30,
    employeeId: "E-204",
    salary: 95000,
    department: "Engineering",
  };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{describeStaff(staffMember)}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Staff requires all of Person's members, all of Employable's members, and its own department.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "narrowing-an-inherited-property",
      title: "Narrowing an inherited property to a more specific type",
      summary: "Identifiable's id is string | number; StringIdEntity narrows it to just string.",
      code: `interface Identifiable {
  id: string | number;
}

// A derived interface may narrow an inherited property, as long as the narrower
// type still fits within the original — "string" fits within "string | number".
interface StringIdEntity extends Identifiable {
  id: string;
  label: string;
}

function App() {
  const entity: StringIdEntity = { id: "entity-42", label: "Widget" };

  // const numericId: StringIdEntity = { id: 42, label: "Bad" };
  // Error above: id must be a string here, even though the base interface allowed string | number.

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{entity.label} (id: {entity.id})</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        StringIdEntity narrows "id" from "string | number" down to just "string".
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
