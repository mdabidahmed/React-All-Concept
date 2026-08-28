import type { Topic } from "../../types";

export const cssCommentsTopic: Topic = {
  id: "css-comments",
  title: "CSS Comments",
  category: "CSS Basics",
  shortExplanation: `A CSS comment is written \`/* like this */\` — everything between the markers is ignored by the browser, no matter how many lines it spans.

- Starts with \`/*\`, ends with \`*/\` — there is ==no single-line== \`//\` form in CSS
- Comments **cannot be nested** — the first \`*/\` closes the comment, even if another \`/*\` appears before it
- Common uses: leaving notes for future readers, and temporarily "commenting out" a declaration or rule to disable it without deleting it`,
  longExplanation: `CSS has exactly one comment syntax: \`/* ... */\`. Anything between the opening \`/*\` and the closing \`*/\` — whether it's a few words on one line or several full rules spanning many lines — is completely ignored when the browser parses the stylesheet. Unlike JavaScript or many other languages, CSS has **no** \`//\` single-line comment form; typing \`// this is a comment\` in a stylesheet does not comment anything out, it's simply invalid CSS that gets silently ignored as an unrecognized declaration.

Comments can appear almost anywhere in a stylesheet: before a rule, inside a declaration block, or even in the middle of a value list, though the most readable placements are above a rule (explaining what it's for) or at the end of a line (a quick clarifying note). They have zero effect on layout, specificity, or the cascade — they exist purely for the humans reading the file.

One important limitation: CSS comments **do not nest**. Given \`/* outer /* inner */ still outer */\`, the parser closes the comment at the *first* \`*/\` it encounters — right after "inner" — which means "still outer */" is left dangling as real, unparsed CSS text, likely breaking whatever follows. This trips people up most often when trying to comment out a block of CSS that *already contains* a comment inside it — wrapping it in another \`/* */\` pair doesn't fully suppress the inner one the way nested comments would in some programming languages.

In practice, comments in CSS serve two everyday purposes:

- **Leaving notes for future readers** (including your future self) — explaining *why* a value is what it is, especially for anything non-obvious: \`/* z-index bumped above the modal backdrop (999) */\`, or \`/* Safari-only fix, see issue #482 */\`. Good CSS comments explain intent and reasoning, not just what the code already says at a glance
- **Temporarily disabling a rule or declaration** without deleting it — wrapping a line or block in \`/* */\` turns off its effect instantly while keeping the original code in place, handy while debugging a layout issue ("is this margin causing the problem? comment it out and see") or while deciding whether a style is still needed before committing to removing it

Because comments are stripped out at build time by most real-world tooling (minifiers, bundlers) before a stylesheet ships to production, they cost nothing in the shipped file size — there's little reason to be stingy with them in source files. The main discipline is keeping them accurate: a comment that no longer matches the code it describes is worse than no comment at all, since it actively misleads the next reader.`,
  examples: [
    {
      id: "basic-comment-syntax",
      title: "Basic /* ... */ comment syntax",
      summary: "A comment above a rule and an inline comment, neither of which affects the rendered result.",
      code: `function CommentedStyles() {
  return (
    <style>{\`
      /* This entire block styles the "callout" box below. */
      .callout {
        background: #fef9c3; /* soft yellow background */
        padding: 12px;
        border-radius: 6px;
        /* border-left adds a colored accent stripe on the left edge */
        border-left: 4px solid #ca8a04;
      }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <CommentedStyles />
      <div className="callout">
        The comments above explain this rule but produce no visual output themselves.
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "commenting-out-a-declaration",
      title: "Temporarily disabling one declaration",
      summary: "Wrapping a single declaration in /* */ turns it off without deleting it.",
      code: `function ToggleCommentStyles() {
  return (
    <style>{\`
      .box {
        background: #dbeafe;
        padding: 14px;
        border-radius: 8px;
        /* text-align: center;  <-- disabled while debugging left/right alignment */
        font-weight: 600;
      }
    \`}</style>
  );
}

function App() {
  return (
    <div>
      <ToggleCommentStyles />
      <div className="box">
        text-align is commented out above, so this text stays left-aligned
        (the default) instead of being centered.
      </div>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "comments-do-not-nest",
      title: "Why comments can't be nested",
      summary: "The first */ closes the comment early, leaving trailing text as broken, unparsed CSS.",
      code: `function BrokenNestedComment() {
  return (
    <style>{\`
      /* Attempting to comment out a block that already has a comment inside:
      .would-be-hidden {
        /* color: red; */
        background: blue;
      }
      still outer, but this text is now unparsed CSS, not a comment */

      .safe-example {
        background: #f3f4f6;
        padding: 10px;
        border-radius: 6px;
      }
    \`}</style>
  );
}

function App() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <BrokenNestedComment />
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        The comment above closes at the FIRST */ it finds, not the last one —
        this is why CSS comments cannot be safely nested.
      </p>
      <div className="safe-example">This unrelated rule still renders fine.</div>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
