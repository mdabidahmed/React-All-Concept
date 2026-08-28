import type { Topic } from "../../types";

export const tsGenericComponentsTopic: Topic = {
  id: "ts-generic-components",
  title: "Generic React Components",
  category: "TypeScript with React",
  shortExplanation: `A component can take its own generic type parameter, just like a function or interface, so its prop types depend on whatever type is used at each call site.

- \`function List<T>({ items, renderItem }: ListProps<T>)\` works for a list of any item type, while keeping \`renderItem\` fully typed to that exact type

- \`<List items={users} renderItem={(user) => user.name} />\` infers \`T\` as \`User\` from the \`items\` array — \`renderItem\`'s parameter is then safely typed as \`User\`, with no cast needed anywhere

- This is what makes a genuinely reusable list/table/select component *fully type-safe* for every item type it's ever used with, instead of falling back to \`any\``,
  longExplanation: `A component like \`List\` that renders an array of items and delegates *how* each item looks to a \`renderItem\` callback is one of the most commonly reused shapes in a real UI codebase — the exact same rendering logic applies whether the list holds users, products, or todo items. Typing it with a fixed, concrete item type (\`items: User[]\`) would only work for one specific kind of list; typing it with \`any\` would work for every kind of list, but throw away all the safety around what \`renderItem\` actually receives. A **generic component** solves this exactly the way a generic function or interface does — by making the item's type a parameter of the component itself, decided fresh at each place the component is used.

- **The props interface is generic first, exactly like a generic interface:** \`interface ListProps<T> { items: T[]; renderItem: (item: T) => React.ReactNode; }\`. Both \`items\` and \`renderItem\` reference the same \`T\`, which is what ties them together — whatever type \`items\` turns out to hold, \`renderItem\` is guaranteed to receive exactly that type as its parameter, never something else and never \`any\`
- **The component function itself repeats the same type parameter:** \`function List<T>({ items, renderItem }: ListProps<T>) { return <ul>{items.map((item, i) => <li key={i}>{renderItem(item)}</li>)}</ul>; }\`. Nothing about the component's *body* looks different from a non-generic version — the generic part is entirely in the type signature, describing the relationship between \`items\` and \`renderItem\` precisely
- **At the call site, \`T\` is inferred automatically from the \`items\` array passed in — no explicit type argument is normally needed.** \`<List items={users} renderItem={(user) => user.name} />\` infers \`T\` as \`User\` purely from \`users\`'s own type, and that inference immediately flows into \`renderItem\`'s parameter: \`user\` inside the callback is fully typed as \`User\`, with every one of \`User\`'s real properties available with autocomplete, and any nonexistent property caught immediately as an error — exactly as if a completely separate, hand-written \`UserList\` component had been built just for this one case
- **A syntax detail worth knowing in a \`.tsx\` file: writing \`<List<User> items={users} ... />\` to supply the type argument explicitly looks almost identical to opening a JSX tag, and this is one of the rare spots where being explicit is sometimes needed** — usually when \`items\` is empty and there's nothing for TypeScript to infer \`T\` from, similar to the empty-array situation covered under generic functions. In practice, though, most real usages have a non-empty \`items\` array, so inference handles it silently the overwhelming majority of the time
- **This pattern scales to any "takes a collection, renders each item some caller-defined way" component** — a generic \`Table<T>\`, a generic \`Select<T>\` (where an option's underlying value can be any type, not just a string), a generic \`Autocomplete<T>\` all follow the exact same shape: one or more props hold values of type \`T\`, one or more callback props receive or return values of type \`T\`, and the whole component stays reusable across completely unrelated data shapes without ever touching \`any\`
- **The value this unlocks over a non-generic, \`any\`-typed version isn't just about avoiding a few casts — it changes what the component can catch.** With \`any\`, passing \`renderItem={(item) => item.nonexistentProperty}\` would silently compile and only fail at runtime, deep inside the render. With the generic version, that exact same mistake is caught immediately at compile time, right where it was written, because TypeScript actually knows \`item\`'s real shape from the \`items\` array supplied at that specific call site
- Generic components compose naturally with everything covered earlier in this category — a generic \`List<T>\`'s \`renderItem\` prop is just an ordinary function-type prop (from "Typing React Props"), its \`children\`-equivalent output is typed with \`React.ReactNode\` (from "Typing children Props"), and nothing about being *generic* changes any of those individual typing rules

Generic components are where generics and React's own component model meet directly, and they're genuinely one of the more powerful patterns available once a codebase has more than one or two truly generic collection-rendering needs — a single well-typed \`List<T>\` or \`Table<T>\` can replace what would otherwise be a family of near-duplicate, single-purpose components, without sacrificing any of the type safety each of those separate versions would have had on their own.`,
  examples: [
    {
      id: "generic-list-component",
      title: "A generic List<T> component",
      summary: "The same List component renders users and products, each with a fully-typed renderItem callback.",
      code: `interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul style={{ display: "grid", gap: 4, listStyle: "none", padding: 0 }}>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

interface User {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
}

function App() {
  const users: User[] = [
    { id: 1, name: "Ada Lovelace" },
    { id: 2, name: "Grace Hopper" },
  ];

  const products: Product[] = [
    { id: 1, title: "Keyboard", price: 49 },
    { id: 2, title: "Mouse", price: 25 },
  ];

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <List items={users} renderItem={(user) => user.name} />
      <List items={products} renderItem={(product) => product.title + " — $" + product.price} />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "generic-component-catches-typos",
      title: "Type safety renderItem gets from T",
      summary: "renderItem's parameter is fully typed to T — a typo'd property is caught at compile time, not at runtime.",
      code: `interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul style={{ display: "grid", gap: 4, listStyle: "none", padding: 0 }}>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

interface Task {
  id: number;
  title: string;
  done: boolean;
}

function App() {
  const tasks: Task[] = [
    { id: 1, title: "Write tests", done: true },
    { id: 2, title: "Ship feature", done: false },
  ];

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <List
        items={tasks}
        renderItem={(task) => (task.done ? "[x] " : "[ ] ") + task.title}
      />
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try renderItem={"{"}(task) =&gt; task.notARealProperty{"}"} in the editor — rejected immediately, since T
        here is known to be exactly Task.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "generic-select-component",
      title: "A generic Select<T> for non-string option values",
      summary: "The underlying option value can be any type T, not just a string, while staying fully type-checked.",
      code: `interface SelectOption<T> {
  value: T;
  label: string;
}

interface SelectProps<T> {
  options: SelectOption<T>[];
  selected: T;
  onChange: (value: T) => void;
}

function Select<T>({ options, selected, onChange }: SelectProps<T>) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onChange(option.value)}
          style={{
            background: option.value === selected ? "#4f46e5" : "#e5e7eb",
            color: option.value === selected ? "white" : "#111827",
            border: "none",
            borderRadius: 6,
            padding: "6px 10px",
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function App() {
  const [priority, setPriority] = useState<number>(2);

  const priorityOptions: SelectOption<number>[] = [
    { value: 1, label: "Low" },
    { value: 2, label: "Medium" },
    { value: 3, label: "High" },
  ];

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Select options={priorityOptions} selected={priority} onChange={setPriority} />
      <p>Selected priority level: {priority}</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "explicit-type-argument-jsx",
      title: "Supplying the type argument explicitly in JSX",
      summary: "<List<Task> ...> is needed when there's nothing in an empty items array for TypeScript to infer from.",
      code: `interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  emptyLabel: string;
}

function List<T>({ items, renderItem, emptyLabel }: ListProps<T>) {
  if (items.length === 0) {
    return <p style={{ color: "#6b7280" }}>{emptyLabel}</p>;
  }
  return (
    <ul style={{ display: "grid", gap: 4, listStyle: "none", padding: 0 }}>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

interface Task {
  id: number;
  title: string;
}

function App() {
  const emptyTasks: Task[] = [];

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {/* Explicit <List<Task>> — with an empty array, there's nothing to infer T from otherwise. */}
      <List<Task>
        items={emptyTasks}
        renderItem={(task) => task.title}
        emptyLabel="No tasks yet"
      />
    </div>
  );
}

render(<App />);`,
    },
  ],
};
