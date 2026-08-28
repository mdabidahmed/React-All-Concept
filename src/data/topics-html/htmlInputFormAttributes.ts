import type { Topic } from "../../types";

export const htmlInputFormAttributesTopic: Topic = {
  id: "html-input-form-attributes",
  title: "HTML Input Form Attributes",
  category: "HTML Forms",
  shortExplanation: `A handful of attributes let a single \`<input>\` **override** the form it belongs to, or belong to a form it isn't even nested inside.

- \`form\` — associates an input with a \`<form>\` elsewhere on the page, by matching the form's \`id\`
- \`formaction\` — overrides that specific button's submission URL
- \`formmethod\` — overrides that specific button's submission method (\`get\`/\`post\`)
- These are niche, used for advanced page layouts rather than everyday forms`,
  longExplanation: `Normally an \`<input>\` or \`<button>\` belongs to whichever \`<form>\` visually contains it in the markup. These attributes exist for the less common case where that's not possible or not desired.

- \`form="form-id"\` — placed on an \`<input>\` (or button), this associates it with a \`<form id="form-id">\` located **anywhere else on the page**, even outside that form's own markup. This matters for layouts where an input can't be physically nested inside the \`<form>\` tag — for example, a field placed in a page header or sidebar that should still submit along with a form rendered further down the page
- \`formaction="/alternate-url"\` — placed on a \`type="submit"\` button, this overrides the form's own \`action\` just for that one button. This is how a single form can offer more than one outcome from the same fields — for example, "Save as draft" (posts to \`/drafts\`) and "Publish" (posts to \`/publish\`) as two different buttons in the same \`<form>\`
- \`formmethod="get"\` (or \`"post"\`) — similarly overrides the form's \`method\` for just that one button
- There are a few sibling attributes with the same idea (\`formtarget\`, \`formnovalidate\`, \`formenctype\`) — all follow the same pattern of "override this one thing, just for this one button"

These are genuinely uncommon in everyday form-building — most forms have exactly one submit button and one destination — but they're useful to recognize when a form's markup has an input living outside the \`<form>\` tag, or multiple submit buttons that clearly do different things. Because they all describe where/how data is *sent* to a server, they aren't something this sandbox can fully demonstrate live; the examples below show the structure and let a click reveal what *would* happen.`,
  examples: [
    {
      id: "form-attribute-association",
      title: "Associating an input with a distant form",
      summary: "This input isn't inside the <form> tag at all, but the form attribute still ties it to that form.",
      code: `function App() {
  const [note, setNote] = useState("");
  const [submittedNote, setSubmittedNote] = useState("");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
      <div style={{ padding: 8, borderRadius: 6, background: "#f3f4f6" }}>
        <label>
          Outside the form tag entirely, but still tied to it via form="my-form":
          <input
            form="my-form"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ display: "block", marginTop: 4 }}
          />
        </label>
      </div>
      <form
        id="my-form"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmittedNote(note);
        }}
      >
        <button type="submit">Submit "my-form"</button>
      </form>
      {submittedNote && <p style={{ margin: 0 }}>Submitted note: {submittedNote}</p>}
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "formaction-two-destinations",
      title: "Two submit buttons, two destinations",
      summary: "formAction lets one button override where the same form's data would be sent.",
      code: `function App() {
  const [title, setTitle] = useState("My post");
  const [lastAction, setLastAction] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const clicked = event.nativeEvent.submitter;
    const destination = clicked && clicked.getAttribute("formaction");
    setLastAction((destination || "/publish") + " (title: " + title + ")");
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 280 }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" />
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" formAction="/drafts">
          Save as draft
        </button>
        <button type="submit" formAction="/publish">
          Publish
        </button>
      </div>
      {lastAction && <small style={{ color: "#6b7280" }}>Would submit to: {lastAction}</small>}
    </form>
  );
}

render(<App />);`,
    },
    {
      id: "formmethod-conceptual",
      title: "formMethod, conceptually",
      summary: "A lighter, descriptive example — the override pattern is the same as formAction, just for method instead.",
      code: `function App() {
  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 320 }}>
      <p style={{ margin: 0, fontSize: 13 }}>
        A form declared with <code>method="post"</code> normally sends every submit as a POST.
        A button with <code>formMethod="get"</code> would submit that one click as a GET instead,
        with the same fields — useful for something like a "share this filter as a link" button
        living inside an otherwise POST-based form.
      </p>
      <form action="/search" method="post" onSubmit={(e) => e.preventDefault()}>
        <input name="q" placeholder="Search term" style={{ marginBottom: 8, display: "block" }} />
        <button type="submit">Search (POST, as the form specifies)</button>{" "}
        <button type="submit" formMethod="get">
          Share as link (GET, overridden)
        </button>
      </form>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
