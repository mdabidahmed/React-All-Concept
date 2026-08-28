import type { Topic } from "../../types";

export const jsDatesTopic: Topic = {
  id: "js-dates",
  title: "JavaScript Dates",
  category: "Objects & Arrays",
  shortExplanation: `The built-in \`Date\` object represents a single moment in time, and offers methods for reading and formatting it.

- \`new Date()\` — the current moment; \`new Date(2026, 0, 15)\` — a specific date
- \`.getFullYear()\`, \`.getMonth()\`, \`.getDate()\`, \`.getDay()\`, \`.getHours()\` read out individual parts
- ==Classic gotcha==: \`.getMonth()\` is **zero-indexed** — January is \`0\`, December is \`11\`
- Basic date math (like "add N days") is done by reading a part out, adding to it, and setting it back — JavaScript's \`Date\` has no built-in \`.addDays()\``,
  longExplanation: `A \`Date\` object represents one specific point in time, stored internally as a count of milliseconds since a fixed reference point (January 1, 1970). While the internal representation is a plain number, \`Date\` provides a large set of methods for reading, comparing, and formatting that moment in familiar calendar terms.

- **Creating a \`Date\`**: calling \`new Date()\` with no arguments captures the **current** moment, based on the system clock. To represent a specific date instead, pass individual components: \`new Date(year, monthIndex, day, hours, minutes, seconds)\` — for example, \`new Date(2026, 0, 15)\` represents January 15th, 2026. A \`Date\` can also be built from a date string, such as \`new Date("2026-01-15")\`, though string parsing can behave inconsistently across environments for anything beyond the standard ISO format (\`YYYY-MM-DD\`), so constructing from explicit numeric components is generally the more reliable choice
- **Reading parts of a date** is done through a family of "getter" methods: \`.getFullYear()\` returns the four-digit year; \`.getDate()\` returns the day of the month (\`1\`-\`31\`); \`.getDay()\` returns the day of the *week* as a number, \`0\` for Sunday through \`6\` for Saturday (easy to confuse with \`.getDate()\` by name alone); \`.getHours()\`, \`.getMinutes()\`, and \`.getSeconds()\` return the time-of-day components
- **The classic gotcha**: **\`.getMonth()\` is zero-indexed** — January returns \`0\`, February returns \`1\`, all the way to December returning \`11\`. This is easily the single most well-known \`Date\` quirk in JavaScript, and it trips up nearly everyone at least once: displaying a date's month directly from \`.getMonth()\` without adding \`1\` first will show a month that's one behind the actual calendar month. The reason is largely historical, inherited from an old Java date API JavaScript's original \`Date\` was modeled after, but the behavior has stuck around ever since for backward compatibility
- **Formatting a date for display** has no single built-in "just make it readable" method — instead, you either build a string manually by combining the getter methods (\`.getMonth() + 1\`, \`.getDate()\`, \`.getFullYear()\`, joined with separators), or use the more powerful \`.toLocaleDateString()\` / \`.toLocaleTimeString()\` methods, which format a date according to a given locale and options object: \`date.toLocaleDateString("en-US")\` produces something like \`"1/15/2026"\`, while passing an options object can request a longer form like \`"January 15, 2026"\`. \`.toLocaleDateString()\` is generally the more robust, more maintainable choice for real display purposes, since it correctly handles locale-specific ordering and month names without manual string-building
- **Basic date math**, such as "what date is 10 days from now," has no dedicated built-in method either — the standard approach is to read the day-of-month out with \`.getDate()\`, add the desired number of days to it, and pass that (possibly out-of-range) number back into \`.setDate()\`. This works correctly even across month and year boundaries, because \`Date\` automatically "rolls over" an out-of-range value — setting the date to day \`35\` of a 31-day month correctly advances into the next month, rather than throwing an error. The same rollover pattern works for \`.setMonth()\`, \`.setFullYear()\`, and the other setters
- Two \`Date\` objects can be compared using the regular comparison operators (\`<\`, \`>\`) directly, since JavaScript converts them to their underlying millisecond timestamp for the comparison — but they are **not** considered \`===\` equal even if they represent the exact same moment, the same reference-vs-value distinction that applies to objects generally. Subtracting one \`Date\` from another (\`dateB - dateA\`) yields the difference in **milliseconds**, which is the standard way to compute an elapsed duration between two moments

\`Date\` is one of JavaScript's oldest and quirkiest built-in objects — modern JavaScript code increasingly reaches for the newer \`Temporal\` API (still stabilizing across environments) or a dedicated date library for anything beyond simple cases, but understanding \`Date\`'s core methods, and especially the zero-indexed month gotcha, remains essential since it's still everywhere in existing JavaScript code.`,
  examples: [
    {
      id: "current-vs-specific-date",
      title: "Creating the current date vs. a specific date",
      summary: "new Date() captures right now; passing components builds an exact date instead.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const now = new Date();
    print("new Date() -> " + now.toString());

    const specific = new Date(2026, 0, 15);
    print("new Date(2026, 0, 15) -> " + specific.toString());
    print("(month argument 0 means January — more on that below)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run date-creation demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 100 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "getmonth-zero-indexed",
      title: "The getMonth() zero-index gotcha",
      summary: "getMonth() returns 0 for January — add 1 to get the calendar month people expect.",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const date = new Date(2026, 0, 15);
    print("Date represents: January 15, 2026");
    print("date.getFullYear() -> " + date.getFullYear());
    print("date.getMonth() -> " + date.getMonth() + "  (0 means January, NOT month 0 of some other system!)");
    print("date.getMonth() + 1 -> " + (date.getMonth() + 1) + "  (the calendar month people actually expect)");
    print("date.getDate() -> " + date.getDate() + "  (day of the month)");
    print("date.getDay() -> " + date.getDay() + "  (day of the WEEK — 0 is Sunday)");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run getMonth() demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 130 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "formatting-for-display",
      title: "Formatting a date for display",
      summary: "Manual string-building compared against the built-in toLocaleDateString().",
      code: `function App() {
  const [log, setLog] = useState([]);

  function print(value) {
    setLog((prev) => [...prev, String(value)]);
  }

  function run() {
    setLog([]);
    const date = new Date(2026, 7, 25);

    const manual = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    print("Manual formatting -> " + manual);

    const shortLocale = date.toLocaleDateString("en-US");
    print("date.toLocaleDateString('en-US') -> " + shortLocale);

    const longLocale = date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    print("With a long-month options object -> " + longLocale);
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button onClick={run}>Run formatting demo</button>
      <pre style={{ background: "#111827", color: "#d1fae5", padding: 12, borderRadius: 6, minHeight: 110 }}>
        {log.length === 0 ? "// output appears here" : log.join("\\n")}
      </pre>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "add-days-interactive",
      title: "Basic date math: adding days",
      summary: "An interactive input adds N days to a fixed start date, correctly rolling into the next month.",
      code: `function App() {
  const [daysToAdd, setDaysToAdd] = useState(20);

  const startDate = new Date(2026, 7, 25); // August 25, 2026
  const resultDate = new Date(startDate);
  resultDate.setDate(resultDate.getDate() + daysToAdd);

  function format(date) {
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }

  return (
    <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
      <p>Start date: <strong>{format(startDate)}</strong></p>
      <label>
        Days to add:{" "}
        <input
          type="number"
          value={daysToAdd}
          onChange={(e) => setDaysToAdd(Number(e.target.value))}
        />
      </label>
      <p>Result: <strong>{format(resultDate)}</strong></p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Try 20 days from August 25 — it correctly rolls over into September, even though setDate()
        was only ever told about a day-of-month number, not a month change.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
