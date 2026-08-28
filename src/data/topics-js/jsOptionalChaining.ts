import type { Topic } from "../../types";

export const jsOptionalChainingTopic: Topic = {
  id: "js-optional-chaining",
  title: "JavaScript Optional Chaining and Nullish Coalescing",
  category: "Browser & Modern JS",
  shortExplanation: `\`?.\` (**optional chaining**) safely reads a nested property without a manual chain of null checks — if anything along the path is \`null\`/\`undefined\`, the whole expression short-circuits to \`undefined\` instead of throwing. \`??\` (**nullish coalescing**) supplies a default value, but ==only== when the left side is \`null\` or \`undefined\` — unlike \`||\`, which also overrides falsy-but-valid values like \`0\` or \`""\`.

- \`user?.address?.city\` reads three levels deep, safely, in one expression
- \`count ?? 10\` keeps \`0\` as a real, intentional value; \`count || 10\` would incorrectly replace it with \`10\`
- Both were added specifically to replace verbose, error-prone manual guard-clause chains`,
  longExplanation: `Before **optional chaining** existed, safely reading a deeply nested property — one that might not exist at any level along the way — required either a manual chain of \`&&\` checks or a nested series of \`if\` statements. Reading \`user.address.city\` directly is dangerous if \`user\` or \`user.address\` might be \`null\` or \`undefined\`: accessing a property *of* \`null\`/\`undefined\` throws a \`TypeError\` immediately, crashing the surrounding code. The traditional guard was writing out every intermediate step by hand: \`user && user.address && user.address.city\` — each \`&&\` short-circuits the whole expression to a falsy value the moment any link in the chain is missing, before ever attempting the next \`.\` access. It works, but it scales badly: a five-level-deep path needs five separate checks, repeated in full every single time that path is read anywhere in the codebase.

**Optional chaining** (\`?.\`) replaces that entire manual pattern with one compact operator. \`user?.address?.city\` reads exactly like the equivalent property chain, except each \`?.\` checks, right before accessing the next property, whether the value on its left is \`null\` or \`undefined\` — if it is, the *entire remaining expression* short-circuits immediately to \`undefined\`, with no error thrown, no matter how many more \`.\`s were still to come. Beyond plain property access, \`?.\` extends to two other common shapes: \`obj?.method?.()\` calls a method only if it actually exists (skipping the call, rather than throwing, if it's missing), and \`obj?.[key]\` does the same for bracket-notation, computed-key access.

**Nullish coalescing** (\`??\`) solves an adjacent but genuinely different problem: providing a fallback default value. \`value ?? defaultValue\` evaluates to \`value\` if \`value\` is anything other than \`null\` or \`undefined\`, and falls back to \`defaultValue\` only in those two specific cases. The reason this operator exists at all — rather than everyone just continuing to use the older \`||\` for defaults — is a sharp, easy-to-miss distinction. \`||\` (logical OR) falls back to its right-hand side whenever the left side is **any falsy value**, and JavaScript's falsy values include several perfectly legitimate, intentional pieces of data: \`0\`, an empty string, \`false\`, and \`NaN\`, alongside \`null\`/\`undefined\`. This means \`count || 10\` silently replaces a genuine, intentional \`count\` of \`0\` with \`10\` — almost certainly not what was meant if \`0\` is a valid, expected value for \`count\` to hold (an empty cart, a fresh score, a muted volume). \`count ?? 10\` fixes exactly this: it only falls back to \`10\` when \`count\` is actually missing (\`null\`/\`undefined\`), leaving a real \`0\` completely untouched.

The two operators are frequently combined in exactly the pattern their names suggest: safely reach into a possibly-missing nested structure, then supply a default for the end result if that path turned out to be missing — \`user?.settings?.volume ?? 50\` reads as "the user's volume setting if it genuinely exists anywhere along that chain, otherwise 50." Both operators were added to the language specifically to replace the older generation of verbose, repetitive, and easy-to-get-subtly-wrong guard-clause patterns with something that reads as a single, clear intention in one line.`,
  examples: [
    {
      id: "before-after-optional-chaining",
      title: "Manual guard chain vs. optional chaining",
      summary: "Both give the same safe result — one just needs far less typing.",
      code: `function App() {
  const [hasAddress, setHasAddress] = useState(true);

  const user = hasAddress
    ? { name: "Ada", address: { city: "London" } }
    : { name: "Ada" };

  const manualCity = user && user.address && user.address.city;
  const chainedCity = user?.address?.city;

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input type="checkbox" checked={hasAddress} onChange={(e) => setHasAddress(e.target.checked)} />
        user has an address
      </label>
      <p>Manual guard chain: <strong>{String(manualCity)}</strong></p>
      <p>user?.address?.city: <strong>{String(chainedCity)}</strong></p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>Both give the same safe result — one just needs far less typing.</p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "optional-call-and-bracket",
      title: "Optional calls and optional bracket access",
      summary: "obj?.method?.() skips a missing method safely; obj?.[key] does the same for computed keys.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const withLogger = { log: (msg) => "logged: " + msg };
    const withoutLogger = {};

    print("withLogger.log?.('hi'): " + withLogger.log?.("hi"));
    print("withoutLogger.log?.('hi'): " + withoutLogger.log?.("hi"));

    const settings = { theme: "dark" };
    const key = "theme";
    print("settings?.[key]: " + settings?.[key]);
    print("undefined?.[key]: " + undefined?.[key]);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run optional call and bracket access</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "nullish-vs-or-with-zero",
      title: "?? keeps a real 0; || replaces it",
      summary: "Set count to 0 and watch the two operators disagree.",
      code: `function App() {
  const [count, setCount] = useState(0);

  const withOr = count || 10;
  const withNullish = count ?? 10;

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span>count =</span>
        <input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} style={{ padding: 8, width: 80 }} />
      </div>
      <p>count || 10: <strong>{withOr}</strong></p>
      <p>count ?? 10: <strong>{withNullish}</strong></p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Set count to 0 — || incorrectly swaps it for 10, while ?? correctly keeps the real 0.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "combining-both-with-default",
      title: "Combining ?. and ?? for a safe default",
      summary: "user?.settings?.volume ?? 50 — a real 0 is preserved, a missing settings object falls back.",
      code: `function App() {
  const [hasSettings, setHasSettings] = useState(false);

  const user = hasSettings
    ? { name: "Ada", settings: { volume: 0 } }
    : { name: "Ada" };

  const volume = user?.settings?.volume ?? 50;

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input type="checkbox" checked={hasSettings} onChange={(e) => setHasSettings(e.target.checked)} />
        user has a settings object (with volume set to 0)
      </label>
      <p>user?.settings?.volume ?? 50: <strong>{volume}</strong></p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        With settings present, the real volume of 0 is correctly used — it's only replaced by 50 when settings itself is missing.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
