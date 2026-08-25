import type { Topic } from "../../types";

export const useReducerTopic: Topic = {
  id: "use-reducer",
  title: "useReducer",
  category: "Core Hooks",
  shortExplanation:
    "useReducer manages state via a reducer function (state, action) => newState. It returns [state, dispatch]; instead of setting state directly, components dispatch action objects describing what happened.",
  longExplanation:
    "useReducer is an alternative to useState that centralizes 'how state changes' into a single pure function, the reducer, instead of scattering setState calls across event handlers. You call useReducer(reducer, initialState) and get back the current state plus a dispatch function. Components never mutate state directly; they dispatch a plain object (an 'action', conventionally with a type field) describing what happened, and the reducer computes the next state from the current state and that action. This is especially useful when: state is an object with several sub-values that change together, the next state depends on the previous state in a non-trivial way, or you want the update logic testable in isolation from any component (a reducer is just a function — no rendering required to test it). It also pairs naturally with useContext to build a small Redux-like store without adding a state-management library. A reducer must be pure: given the same state and action it always returns the same result, with no side effects (no fetches, no timers, no mutating the arguments) — side effects belong in an effect or event handler that dispatches an action afterward.",
  examples: [
    {
      id: "counter-reducer",
      title: "Counter with a reducer",
      summary: "The same counter as useState, expressed as actions + reducer.",
      code: `function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      <p>Count: <strong>{state.count}</strong></p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
        <button onClick={() => dispatch({ type: "increment" })}>+1</button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "todo-reducer",
      title: "Todo list with add/toggle/remove",
      summary: "A reducer is a natural fit for multi-shape list updates.",
      code: `function todosReducer(todos, action) {
  switch (action.type) {
    case "add":
      return [...todos, { id: Date.now(), text: action.text, done: false }];
    case "toggle":
      return todos.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));
    case "remove":
      return todos.filter((t) => t.id !== action.id);
    default:
      return todos;
  }
}

function App() {
  const [todos, dispatch] = useReducer(todosReducer, []);
  const [text, setText] = useState("");

  function addTodo(e) {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch({ type: "add", text });
    setText("");
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 280 }}>
      <form onSubmit={addTodo} style={{ display: "flex", gap: 8 }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New todo" />
        <button type="submit">Add</button>
      </form>
      <ul style={{ paddingLeft: 18, margin: 0 }}>
        {todos.map((t) => (
          <li key={t.id}>
            <label style={{ textDecoration: t.done ? "line-through" : "none" }}>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => dispatch({ type: "toggle", id: t.id })}
              />{" "}
              {t.text}
            </label>{" "}
            <button onClick={() => dispatch({ type: "remove", id: t.id })}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "lazy-init-reducer",
      title: "Lazy initialization with useReducer",
      summary: "Pass an init function as the third argument to compute initial state once.",
      code: `function init(initialCount) {
  return { count: initialCount, history: [initialCount] };
}

function reducer(state, action) {
  if (action.type === "increment") {
    const count = state.count + 1;
    return { count, history: [...state.history, count] };
  }
  if (action.type === "reset") {
    return init(action.initialCount);
  }
  return state;
}

function App() {
  const [state, dispatch] = useReducer(reducer, 0, init);

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>Count: <strong>{state.count}</strong></p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => dispatch({ type: "increment" })}>+1</button>
        <button onClick={() => dispatch({ type: "reset", initialCount: 0 })}>Reset</button>
      </div>
      <small>History: {state.history.join(" -> ")}</small>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "form-reducer",
      title: "Form state as a single reducer",
      summary: "One dispatch shape for every field, plus a reset action.",
      code: `const initialForm = { name: "", email: "", agreed: false };

function formReducer(state, action) {
  switch (action.type) {
    case "field":
      return { ...state, [action.field]: action.value };
    case "reset":
      return initialForm;
    default:
      return state;
  }
}

function App() {
  const [form, dispatch] = useReducer(formReducer, initialForm);

  return (
    <form
      style={{ display: "grid", gap: 10, maxWidth: 280 }}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => dispatch({ type: "field", field: "name", value: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => dispatch({ type: "field", field: "email", value: e.target.value })}
      />
      <label style={{ display: "flex", gap: 6 }}>
        <input
          type="checkbox"
          checked={form.agreed}
          onChange={(e) => dispatch({ type: "field", field: "agreed", value: e.target.checked })}
        />
        I agree to the terms
      </label>
      <button type="button" onClick={() => dispatch({ type: "reset" })}>
        Reset form
      </button>
      <pre style={{ margin: 0, fontSize: 12 }}>{JSON.stringify(form, null, 2)}</pre>
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "reducer-vs-state",
      title: "useReducer vs. useState side-by-side",
      summary: "Same feature (a toggleable list), two different state strategies.",
      code: `function reducer(state, action) {
  if (action.type === "toggle") {
    return state.map((item, i) => (i === action.index ? !item : item));
  }
  return state;
}

function WithReducer() {
  const [items, dispatch] = useReducer(reducer, [false, false, false]);
  return (
    <div>
      <strong>useReducer:</strong>{" "}
      {items.map((on, i) => (
        <button key={i} onClick={() => dispatch({ type: "toggle", index: i })}>
          {on ? "ON" : "off"}
        </button>
      ))}
    </div>
  );
}

function WithState() {
  const [items, setItems] = useState([false, false, false]);
  function toggle(index) {
    setItems((prev) => prev.map((v, i) => (i === index ? !v : v)));
  }
  return (
    <div>
      <strong>useState:</strong>{" "}
      {items.map((on, i) => (
        <button key={i} onClick={() => toggle(i)}>
          {on ? "ON" : "off"}
        </button>
      ))}
    </div>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <WithReducer />
      <WithState />
    </div>
  );
}

render(<App />);`,
    },
  ],
};
