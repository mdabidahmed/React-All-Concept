import type { Topic } from "../../types";

export const htmlFormAttributesTopic: Topic = {
  id: "html-form-attributes",
  title: "HTML Form Attributes",
  category: "HTML Forms",
  shortExplanation: `A \`<form>\` element itself carries attributes that control **where** its data goes and **how** the browser handles the submission.

- \`action\` — the URL the form's data is sent to
- \`method\` — \`get\` (data appended to the URL) or \`post\` (data sent in the request body)
- \`target\` — where to display the response (e.g. a new tab)
- \`autocomplete\` — whether the browser may suggest previously entered values
- \`novalidate\` — skips the browser's built-in validation on submit`,
  longExplanation: `These attributes live on the \`<form>\` tag itself (not on individual inputs) and describe the mechanics of submitting the whole form to a server. Most of them need an actual server to fully demonstrate, so they're explained here in prose, with runnable examples for the two that have a visible effect without one.

- \`action="/submit-url"\` — tells the browser *where* to send the form's data when it submits. Without JavaScript intercepting the submission, the browser navigates to this URL, sending the form's fields along with it
- \`method="get"\` vs \`method="post"\` — controls *how* the data is sent:
  - \`get\` appends the form's data to the \`action\` URL as a query string (e.g. \`?name=Alice&age=30\`), which is visible in the address bar, bookmarkable, and size-limited — suited to searches or filters, not sensitive data
  - \`post\` sends the data in the request body instead, invisible in the URL, with no practical size limit — the conventional choice for anything that creates or changes data (signups, comments, payments)
- \`target="_blank"\` — like the \`target\` attribute on a link, this controls where the *response* to the submission opens: the same tab (default), a new tab (\`_blank\`), or a named frame
- \`autocomplete="on"\` (the default) lets the browser suggest previously typed values for matching fields; \`autocomplete="off"\` disables those suggestions — useful for one-time codes, unique IDs, or fields that shouldn't be pre-filled from history
- \`novalidate\` tells the browser to skip its own built-in validation (like \`required\` or \`type="email"\` checks) when the form is submitted, leaving validation entirely to your own JavaScript

In this sandbox, forms don't submit to a real server, so \`action\`, \`method\`, and \`target\` are conceptual here — a real \`.html\` file or a form that posts to a real backend is where their effect actually shows up. \`autocomplete\` and \`novalidate\`, by contrast, change visible browser behavior right in the sandbox.`,
  examples: [
    {
      id: "get-vs-post-explained",
      title: "get vs. post, side by side",
      summary: "A visual comparison of where each method places the form's data — no real server needed to see the difference conceptually.",
      code: `function App() {
  const [name, setName] = useState("Alice");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <div style={{ padding: 10, borderRadius: 6, background: "#f3f4f6" }}>
        <strong>method="get"</strong> would navigate to:
        <div style={{ fontFamily: "monospace", fontSize: 13 }}>
          /submit?name={encodeURIComponent(name)}
        </div>
      </div>
      <div style={{ padding: 10, borderRadius: 6, background: "#f3f4f6" }}>
        <strong>method="post"</strong> would navigate to:
        <div style={{ fontFamily: "monospace", fontSize: 13 }}>/submit</div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>
          (with {"{ name: \\"" + name + "\\" }"} sent invisibly in the request body)
        </div>
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "autocomplete-off",
      title: "Disabling autocomplete on a field",
      summary: "autocomplete=\"off\" tells the browser not to suggest previously entered values for this field.",
      code: `function App() {
  const [code, setCode] = useState("");

  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ display: "grid", gap: 8, maxWidth: 260 }}>
      <label>
        One-time code (no autocomplete suggestions)
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoComplete="off"
          placeholder="123456"
          style={{ display: "block", marginTop: 4 }}
        />
      </label>
      <small style={{ color: "#6b7280" }}>
        JSX spells it \`autoComplete\` (capital C); plain HTML uses lowercase \`autocomplete\`.
      </small>
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "novalidate-effect",
      title: "novalidate skips built-in validation",
      summary: "Toggling noValidate changes whether the browser blocks submission of an invalid email field.",
      code: `function App() {
  const [skipValidation, setSkipValidation] = useState(false);
  const [attempts, setAttempts] = useState(0);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setAttempts((a) => a + 1);
      }}
      noValidate={skipValidation}
      style={{ display: "grid", gap: 8, maxWidth: 280 }}
    >
      <label style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13 }}>
        <input
          type="checkbox"
          checked={skipValidation}
          onChange={(e) => setSkipValidation(e.target.checked)}
        />
        novalidate (skip browser validation)
      </label>
      <input type="email" required placeholder="you@example.com" />
      <button type="submit">Submit</button>
      <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>
        Submits accepted: {attempts}. Try submitting empty or with invalid text, with the
        checkbox on and off, to see the browser's own validation popup appear or get skipped.
      </p>
    </form>
  );
}

render(<App />);`,
    },
  ],
};
