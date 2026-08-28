import type { QuizQuestion } from "../../types/quiz";

export const jsControlFlowQuestions: QuizQuestion[] = [
  {
    id: "js-control-flow-1",
    question: "What does console.log(0 == '0', 0 === '0'); log?",
    type: "single",
    options: ["true false", "false true", "true true", "false false"],
    correctIndexes: [0],
    explanation:
      "== (loose equality) coerces operands to a common type before comparing, so 0 == '0' is true once the string is converted to a number; === (strict equality) requires both value and type to match, and since a number is never the same type as a string, 0 === '0' is false.",
  },
  {
    id: "js-control-flow-2",
    question:
      "Why do most style guides recommend using === (strict equality) over == (loose equality)?",
    type: "single",
    options: [
      "=== compares both value and type without converting operands, avoiding surprising results from implicit type coercion that == can produce",
      "=== is faster in every JavaScript engine, while == is always slower",
      "== only works with numbers, while === works with all data types",
      "=== and == always produce identical results, so the recommendation is purely stylistic",
    ],
    correctIndexes: [0],
    explanation:
      "Loose equality (==) coerces mismatched types before comparing, which can produce unintuitive results, such as '' == 0 being true, while strict equality (===) skips coercion entirely, making comparisons more predictable.",
  },
  {
    id: "js-control-flow-3",
    question:
      "What does console.log(null == undefined, null === undefined); log?",
    type: "single",
    options: ["true false", "false true", "true true", "false false"],
    correctIndexes: [0],
    explanation:
      "null and undefined are considered loosely equal to each other, a special case in the == algorithm, but they are different types, so strict equality with === correctly reports them as not equal.",
  },
  {
    id: "js-control-flow-4",
    question:
      "Which of the following values are falsy in JavaScript (that is, they evaluate to false in a boolean context)?",
    type: "multi",
    options: [
      "0",
      "'' (an empty string)",
      "'0' (a string containing the character zero)",
      "NaN",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "The complete list of falsy values in JavaScript is false, 0, '' (empty string), null, undefined, and NaN; '0' is a non-empty string and, like any non-empty string, is actually truthy.",
  },
  {
    id: "js-control-flow-5",
    question: "What does console.log(Boolean([]), Boolean({})); log?",
    type: "single",
    options: ["true true", "false false", "true false", "false true"],
    correctIndexes: [0],
    explanation:
      "In JavaScript, every object and array is truthy regardless of whether it has any properties or elements, so even an empty array or empty object converts to true.",
  },
  {
    id: "js-control-flow-6",
    question:
      "What does this code log? let user = null; console.log(user && user.name);",
    type: "single",
    options: [
      "null",
      "undefined",
      "It throws a TypeError trying to read 'name' of null",
      "true",
    ],
    correctIndexes: [0],
    explanation:
      "&& short-circuits: if the left operand is falsy (null is falsy), it returns that left operand immediately without evaluating the right side, which is exactly why this pattern is used to avoid errors from accessing properties on null or undefined.",
  },
  {
    id: "js-control-flow-7",
    question:
      "What does this code log? let name = ''; console.log(name || 'Guest');",
    type: "single",
    options: ["Guest", "'' (an empty string)", "undefined", "true"],
    correctIndexes: [0],
    explanation:
      "|| returns its right-hand operand whenever the left one is falsy; since an empty string is falsy, the expression evaluates to 'Guest', a common (if imperfect) pattern for supplying default values.",
  },
  {
    id: "js-control-flow-8",
    question:
      "What does this code log? let count = 0; console.log(count || 10, count ?? 10);",
    type: "single",
    options: ["10 0", "0 10", "10 10", "0 0"],
    correctIndexes: [0],
    explanation:
      "|| falls back to its right side for any falsy left value, and since 0 is falsy, it returns 10; ?? only falls back when the left side is specifically null or undefined, and since 0 is neither, it returns 0 unchanged.",
  },
  {
    id: "js-control-flow-9",
    question:
      "What does this code log? let score = 75; if (score >= 90) { console.log('A'); } else if (score >= 80) { console.log('B'); } else if (score >= 70) { console.log('C'); } else { console.log('D'); }",
    type: "single",
    options: ["C", "B", "D", "A"],
    correctIndexes: [0],
    explanation:
      "Conditions in an if/else-if chain are checked in order and the first true branch runs; 75 fails the >= 90 and >= 80 checks but satisfies >= 70, so 'C' is logged and the remaining branches are skipped.",
  },
  {
    id: "js-control-flow-10",
    question:
      "What does this code log? let age = 16; console.log(age >= 18 ? 'adult' : 'minor');",
    type: "single",
    options: ["minor", "adult", "true", "false"],
    correctIndexes: [0],
    explanation:
      "The ternary operator (condition ? valueIfTrue : valueIfFalse) evaluates age >= 18, which is false for 16, so it returns the value after the colon, 'minor'.",
  },
  {
    id: "js-control-flow-11",
    question:
      "What does this code log? let day = 2; switch (day) { case 1: console.log('Mon'); case 2: console.log('Tue'); case 3: console.log('Wed'); break; case 4: console.log('Thu'); }",
    type: "single",
    options: [
      "Tue then Wed",
      "Tue only",
      "Mon then Tue then Wed",
      "Nothing is logged",
    ],
    correctIndexes: [0],
    explanation:
      "Execution jumps to the matching case (day === 2) and then keeps running every subsequent case's code until it hits a break; since case 2 has no break, it 'falls through' into case 3's log before the break statement finally stops it there.",
  },
  {
    id: "js-control-flow-12",
    question:
      "Which of the following statements about JavaScript's switch statement are true?",
    type: "multi",
    options: [
      "Case values are compared to the switch expression using strict equality (===)",
      "The default case must always be written as the very last case in the switch block",
      "Without a break statement, execution falls through into the next case's code",
      "default runs only when no other case matches, regardless of where it's positioned in the block",
    ],
    correctIndexes: [0, 2, 3],
    explanation:
      "switch compares using strict equality, executes through subsequent cases when a break is missing, and its default clause runs when nothing else matches even if it isn't written last, though placing it last is the common convention.",
  },
  {
    id: "js-control-flow-13",
    question:
      "Which of the following statements about JavaScript's loop types are true?",
    type: "multi",
    options: [
      "A classic 'for (let i = 0; i < arr.length; i++)' loop is useful when you need the index of each element",
      "for...of iterates over the values of an iterable, like an array or string, making it well-suited for arrays when you just need each element",
      "for...in iterates over the enumerable property keys of an object, which makes it appropriate for plain objects but risky for arrays",
      "for...of and for...in always produce identical results when used on the same array",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "The classic for loop gives direct index access, for...of yields values from any iterable and is the natural fit for arrays, and for...in yields keys or property names and is intended for objects; using for...in on an array can pick up unexpected enumerable properties, which is why it isn't recommended there.",
  },
  {
    id: "js-control-flow-14",
    question:
      "What does this code log? const colors = ['red', 'green']; for (const key in colors) { console.log(typeof key); }",
    type: "single",
    options: ["string string", "number number", "string number", "undefined undefined"],
    correctIndexes: [0],
    explanation:
      "for...in always yields property keys as strings, even for arrays where the keys are numeric indexes; this is one reason for...of, which yields the actual values, is generally preferred for iterating arrays.",
  },
  {
    id: "js-control-flow-15",
    question:
      "What does this code log? let n = 5; do { console.log(n); n++; } while (n < 5);",
    type: "single",
    options: ["5", "Nothing is logged", "5 6", "It loops forever"],
    correctIndexes: [0],
    explanation:
      "A do...while loop always runs its body at least once before checking the condition, so it logs 5 first; only after that does it check n < 5, which is now false since n is 6, so the loop stops without running again.",
  },
  {
    id: "js-control-flow-16",
    question:
      "What does this code log? for (let i = 1; i <= 5; i++) { if (i === 3) continue; if (i === 5) break; console.log(i); }",
    type: "single",
    options: ["1 2 4", "1 2 3 4", "1 2 4 5", "1 2"],
    correctIndexes: [0],
    explanation:
      "continue skips only the rest of the current iteration, so 3 is skipped but the loop moves on, while break stops the loop entirely, so once i reaches 5 the loop ends before logging it, leaving 1, 2, and 4 logged.",
  },
];
