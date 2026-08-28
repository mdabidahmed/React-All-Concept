import type { Topic } from "../../types";
import { CypressDiagram } from "../../components/molecules/Diagrams/CypressDiagram";

export const testingCypressTopic: Topic = {
  id: "testing-cypress",
  title: "Testing with Cypress",
  category: "Testing",
  shortExplanation: `**Cypress** is an end-to-end (E2E) testing tool that drives the *real, running app* inside a *real browser* — it doesn't test an isolated function or component, it tests a whole user flow.

- \`cy.visit(url)\` loads a page; \`cy.get(selector)\` finds an element
- \`.click()\` / \`.type(text)\` act like a real user interacting with the page
- \`cy.contains(text)\` finds an element by its visible text, useful for asserting on results
- Where Jest tests fast, isolated pieces, Cypress tests the whole app working together, top to bottom`,
  longExplanation: `Cypress tests run inside an actual browser, against the actual app — not a simulated DOM. A test opens the real page, clicks real buttons, types into real inputs, and checks what actually shows up, the same way a person testing the app manually would.

- A typical test chains commands: \`cy.visit("/login")\` loads the login page, \`cy.get("#email").type("ada@example.com")\` finds the email field and types into it, \`cy.get("button[type=submit]").click()\` submits the form, and \`cy.contains("Welcome back")\` asserts that text appears afterward
- Because it drives a real browser, Cypress catches problems that unit tests can't — a button that's visually covered by another element, a CSS issue that hides an error message, a real network request that fails in a way a mock never would
- The tradeoff is speed: spinning up a browser and waiting for real network/render timing makes E2E tests much slower than unit tests, which is exactly why the testing pyramid keeps the number of E2E tests small and reserves them for the most critical user flows (login, checkout, signup) rather than every possible interaction
- Cypress and Jest solve different problems: Jest answers "does this function/component behave correctly in isolation, fast?"; Cypress answers "does this actual feature work end-to-end, the way a real user would experience it?"

This sandbox has no real browser automation available, so the examples below ==simulate== a Cypress run: a small fake app to interact with, the real Cypress command syntax shown as text, and a "Run E2E test" button that replays the same steps against the fake app step by step.`,
  diagram: CypressDiagram,
  examples: [
    {
      id: "simulated-login-flow",
      title: "Simulating a Cypress login test, step by step",
      summary: "A fake login form, a Cypress script shown as text, and a button that replays those steps automatically.",
      code: `function LoginForm({ email, setEmail, submitted, onSubmit }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} style={{ display: "grid", gap: 8, maxWidth: 260 }}>
      <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Log in</button>
      {submitted && <p style={{ color: "#15803d" }}>Welcome back, {email}!</p>}
    </form>
  );
}

const cypressScript = \`cy.visit("/login")
cy.get("#email").type("ada@example.com")
cy.get("button[type=submit]").click()
cy.contains("Welcome back")\`;

function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(0);

  function runTest() {
    setEmail("");
    setSubmitted(false);
    setStep(1);
    setTimeout(() => { setEmail("ada@example.com"); setStep(2); }, 400);
    setTimeout(() => { setSubmitted(true); setStep(3); }, 900);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 12, borderRadius: 6, fontSize: 12 }}>{cypressScript}</pre>
      <button onClick={runTest}>Run E2E test</button>
      <p style={{ fontSize: 12, color: "#6b7280" }}>Step: {step}/3</p>
      <LoginForm email={email} setEmail={setEmail} submitted={submitted} onSubmit={() => setSubmitted(true)} />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "asserting-with-contains",
      title: "Asserting on the page with cy.contains",
      summary: "A simulated assertion that checks whether specific text appears on the fake page after an action.",
      code: `function Cart({ items, onAdd }) {
  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 260 }}>
      <button onClick={onAdd}>Add item to cart</button>
      <p>Cart has {items} item{items === 1 ? "" : "s"}</p>
    </div>
  );
}

function App() {
  const [items, setItems] = useState(0);
  const [checked, setChecked] = useState(null);

  function runAssertion() {
    // Simulating: cy.contains("Cart has 1 item")
    const pageText = "Cart has " + items + " item" + (items === 1 ? "" : "s");
    setChecked(pageText === "Cart has 1 item");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <Cart items={items} onAdd={() => setItems((i) => i + 1)} />
      <button onClick={runAssertion}>Assert: cy.contains("Cart has 1 item")</button>
      {checked !== null && (
        <p style={{ color: checked ? "#15803d" : "#b91c1c" }}>{checked ? "PASS" : "FAIL"}</p>
      )}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "multi-step-signup",
      title: "A multi-step signup flow, simulated end to end",
      summary: "A two-step signup form driven automatically, standing in for a longer Cypress user-journey test.",
      code: `function SignupWizard({ step, name, email, onNext }) {
  if (step === 0) {
    return <p>Step 1: enter your name — <strong>{name || "(empty)"}</strong></p>;
  }
  if (step === 1) {
    return <p>Step 2: enter your email — <strong>{email || "(empty)"}</strong></p>;
  }
  return <p style={{ color: "#15803d" }}>Signed up as {name} ({email})!</p>;
}

const cypressScript = \`cy.visit("/signup")
cy.get("#name").type("Grace Hopper")
cy.get("#next").click()
cy.get("#email").type("grace@example.com")
cy.get("#finish").click()
cy.contains("Signed up as Grace Hopper")\`;

function App() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function runTest() {
    setStep(0); setName(""); setEmail("");
    setTimeout(() => setName("Grace Hopper"), 300);
    setTimeout(() => setStep(1), 600);
    setTimeout(() => setEmail("grace@example.com"), 900);
    setTimeout(() => setStep(2), 1200);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <pre style={{ background: "#0f172a", color: "#e2e8f0", padding: 12, borderRadius: 6, fontSize: 12 }}>{cypressScript}</pre>
      <button onClick={runTest}>Run E2E test</button>
      <SignupWizard step={step} name={name} email={email} />
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "jest-vs-cypress",
      title: "The same login feature: Jest's job vs. Cypress's job",
      summary: "Jest checks the validation function in isolation; Cypress checks the whole flow through a real browser.",
      code: `function isValidLogin(email, password) {
  return email.includes("@") && password.length >= 8;
}

function App() {
  // What a Jest unit test would check: the function alone, instantly.
  const jestCheck = isValidLogin("ada@example.com", "password123") === true;

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <p style={{ color: jestCheck ? "#15803d" : "#b91c1c" }}>
        Jest-style check (function only): {jestCheck ? "PASS" : "FAIL"}
      </p>
      <pre style={{ background: "#f1f5f9", padding: 8, borderRadius: 6, fontSize: 12 }}>
        {"A Cypress test for the same feature would instead:\\n" +
          "1. Open a real browser to /login\\n" +
          "2. Type into the real email and password fields\\n" +
          "3. Click the real submit button\\n" +
          "4. Check that the real page navigates to /dashboard"}
      </pre>
      <small>Same feature, two different questions: "is the logic correct?" vs. "does the whole thing work for a user?"</small>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
