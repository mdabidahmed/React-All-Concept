import type { Topic } from "../../types";

export const useStateTopic: Topic = {
  id: "use-state",
  title: "useState",
  category: "Core Hooks",
  shortExplanation:
    "useState adds local, re-render-triggering state to a function component. Call it with an initial value, get back a [value, setter] pair, and call the setter to update the value and re-render.",
  longExplanation:
    "useState is the most basic React hook for giving a function component its own memory. Calling useState(initial) returns a tuple: the current value, and a setter function that updates it. Every call to the setter schedules a re-render with the new value. React preserves state between renders by associating each useState call with a stable 'slot' in that component instance, which is why hooks must be called in the same order on every render (never inside conditionals or loops). The initial value is only used on the very first render; on subsequent renders React ignores the argument and returns the stored value. If the next state depends on the previous state, prefer the updater-function form (setValue(prev => prev + 1)) instead of reading the outer variable, because state updates can be batched and the outer variable may be stale by the time the update actually runs. State is local to the component instance: two rendered instances of the same component each get their own independent state.",
  examples: [
    {
      id: "counter",
      title: "Basic counter",
      summary: "The classic increment/decrement/reset counter.",
      code: `function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      <p>Count: <strong>{count}</strong></p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setCount((c) => c - 1)}>-1</button>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "functional-updates",
      title: "Functional updates avoid stale state",
      summary: "Why setCount(c => c + 1) is safer than setCount(count + 1) in a loop.",
      code: `function App() {
  const [count, setCount] = useState(0);

  function addThreeWrong() {
    // Each call closes over the SAME stale "count", so this only adds 1.
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  function addThreeRight() {
    // Each updater reads the latest value, so this correctly adds 3.
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  }

  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      <p>Count: <strong>{count}</strong></p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={addThreeWrong}>+3 (wrong)</button>
        <button onClick={addThreeRight}>+3 (right)</button>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "object-state",
      title: "Updating object state immutably",
      summary: "Spread the previous object so React sees a new reference.",
      code: `function App() {
  const [profile, setProfile] = useState({ name: "Ada", age: 30 });

  function birthday() {
    setProfile((prev) => ({ ...prev, age: prev.age + 1 }));
  }

  function rename(name) {
    setProfile((prev) => ({ ...prev, name }));
  }

  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      <p>{profile.name} is {profile.age} years old.</p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={birthday}>Birthday +1</button>
        <button onClick={() => rename("Grace")}>Rename to Grace</button>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "lazy-init",
      title: "Lazy initial state",
      summary: "Pass a function to useState to avoid recomputing an expensive value.",
      code: `function expensiveInitialValue() {
  console.log("computing initial state...");
  let total = 0;
  for (let i = 0; i < 1000; i++) total += i;
  return total;
}

function App() {
  // The function form only runs once, on mount — not on every re-render.
  const [total] = useState(expensiveInitialValue);
  const [tick, setTick] = useState(0);

  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      <p>Precomputed total: <strong>{total}</strong></p>
      <button onClick={() => setTick((t) => t + 1)}>Re-render ({tick})</button>
      <small>Open the console: the log only fires once, on first mount.</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "form-fields",
      title: "Controlled form fields",
      summary: "Drive multiple inputs from a single state object.",
      code: `function App() {
  const [form, setForm] = useState({ email: "", subscribe: true });

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form style={{ display: "grid", gap: 10, maxWidth: 280 }} onSubmit={(e) => e.preventDefault()}>
      <label style={{ display: "grid", gap: 4 }}>
        Email
        <input
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@example.com"
        />
      </label>
      <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <input
          type="checkbox"
          checked={form.subscribe}
          onChange={(e) => update("subscribe", e.target.checked)}
        />
        Subscribe to updates
      </label>
      <pre style={{ margin: 0, fontSize: 12 }}>{JSON.stringify(form, null, 2)}</pre>
    </form>
  );
}

render(<App />);`,
    },
  ],
};
