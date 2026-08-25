import type { Topic } from "../../types";
import { UseContextDiagram } from "../../components/molecules/Diagrams/UseContextDiagram";

export const useContextTopic: Topic = {
  id: "use-context",
  title: "useContext",
  category: "Core Hooks",
  shortExplanation: `\`useContext\` reads a value from the nearest matching \`Context.Provider\` above it in the tree, letting deeply nested components consume shared data ==without prop drilling==.

- Wrap a subtree in \`<Context.Provider value={...}>\`
- Any descendant calls \`useContext(Context)\` to read that value directly
- No provider above? It falls back to \`createContext\`'s **default value**`,
  longExplanation: `React context solves *prop drilling* — passing a value through many intermediate components that don't actually need it, just to get it to one that does. \`createContext(defaultValue)\` creates a Context object with a **Provider** component; anywhere below a \`<Context.Provider value={...}>\` in the tree, \`useContext(Context)\` returns that value directly.

- If no provider is above the consumer, \`useContext\` falls back to the **default value** passed to \`createContext\`
- Every component that calls \`useContext(SomeContext)\` ==re-renders== whenever the provider's value changes
- Best used for data that's genuinely global to a subtree — theme, authenticated user, locale, a design-system config — not as a general state-management replacement
- A common pattern pairs context with \`useState\` or \`useReducer\` inside a small provider component, then exports a custom hook (e.g. \`useAuth()\`) that wraps \`useContext\` and throws a helpful error if it's used outside the provider

That last pattern is worth internalizing: it gives consumers a clean, purpose-built API instead of the raw context object, and catches a common mistake — forgetting the provider — with a clear error instead of a silent \`null\`.`,
  diagram: UseContextDiagram,
  examples: [
    {
      id: "theme-context",
      title: "Theme context with a Provider",
      summary: "Share a light/dark theme value without prop drilling.",
      code: `const ThemeContext = createContext("light");

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button
      style={{
        background: theme === "dark" ? "#1f2937" : "#f3f4f6",
        color: theme === "dark" ? "#f9fafb" : "#111827",
        border: "1px solid #d1d5db",
        borderRadius: 6,
        padding: "8px 12px",
      }}
    >
      I'm a {theme} button
    </button>
  );
}

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
        <ThemedButton />
        <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
          Toggle theme
        </button>
      </div>
    </ThemeContext.Provider>
  );
}

render(<App />);`,
    },
    {
      id: "default-value",
      title: "Default value without a Provider",
      summary: "useContext falls back to createContext's default when unwrapped.",
      code: `const LanguageContext = createContext("en");

function Greeting() {
  const lang = useContext(LanguageContext);
  const messages = { en: "Hello!", fr: "Bonjour !", es: "¡Hola!" };
  return <p>{messages[lang] ?? messages.en}</p>;
}

function App() {
  // No <LanguageContext.Provider> here, so Greeting uses the default "en".
  return <Greeting />;
}

render(<App />);`,
    },
    {
      id: "custom-hook-wrapper",
      title: "Custom hook wrapping useContext",
      summary: "Export useAuth() instead of the raw context for a nicer API + safety check.",
      code: `const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (name) => setUser({ name });
  const logout = () => setUser(null);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

function Profile() {
  const { user, login, logout } = useAuth();
  if (!user) return <button onClick={() => login("Ada")}>Log in</button>;
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <span>Welcome, {user.name}</span>
      <button onClick={logout}>Log out</button>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Profile />
    </AuthProvider>
  );
}

render(<App />);`,
    },
    {
      id: "nested-providers",
      title: "Overriding context in a nested Provider",
      summary: "The closest Provider above a consumer always wins.",
      code: `const ColorContext = createContext("blue");

function Swatch() {
  const color = useContext(ColorContext);
  return (
    <div style={{ padding: 12, background: color, color: "white", borderRadius: 6 }}>
      color: {color}
    </div>
  );
}

function App() {
  return (
    <ColorContext.Provider value="blue">
      <div style={{ display: "grid", gap: 10 }}>
        <Swatch />
        <ColorContext.Provider value="crimson">
          {/* This nested provider overrides the outer one for its subtree only */}
          <Swatch />
        </ColorContext.Provider>
      </div>
    </ColorContext.Provider>
  );
}

render(<App />);`,
    },
    {
      id: "context-plus-reducer",
      title: "Context + useReducer for shared state",
      summary: "A minimal global store built from context and a reducer.",
      code: `const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return { count: state.count + 1 };
    case "clear":
      return { count: 0 };
    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { count: 0 });
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

function AddToCartButton() {
  const { dispatch } = useContext(CartContext);
  return <button onClick={() => dispatch({ type: "add" })}>Add item</button>;
}

function CartBadge() {
  const { state, dispatch } = useContext(CartContext);
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <span>Cart: {state.count}</span>
      <button onClick={() => dispatch({ type: "clear" })}>Clear</button>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <AddToCartButton />
        <CartBadge />
      </div>
    </CartProvider>
  );
}

render(<App />);`,
    },
  ],
};
