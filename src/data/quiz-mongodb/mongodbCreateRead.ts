import type { QuizQuestion } from "../../types/quiz";

export const mongodbCreateReadQuestions: QuizQuestion[] = [
  {
    id: "mongodb-create-read-1",
    question:
      "You run: db.books.insertOne({ title: 'Dune' }); without providing an _id field. What happens to _id?",
    type: "single",
    options: [
      "MongoDB automatically generates a new ObjectId and stores it as the document's _id",
      "The insert fails, because _id must always be supplied explicitly by the caller",
      "MongoDB stores the document with no _id field at all, since it's optional",
      "MongoDB sets _id to the string 'Dune', copying the title field",
    ],
    correctIndexes: [0],
    explanation:
      "insertOne() only requires an _id if you want to control its value; if the field is missing, the driver generates a unique ObjectId and stores it as _id before the write completes.",
  },
  {
    id: "mongodb-create-read-2",
    question:
      "After running: const result = db.books.insertOne({ title: 'Dune' }); what does the returned result object let you access?",
    type: "single",
    options: [
      "The generated _id of the newly inserted document, via result.insertedId",
      "The full inserted document, including every field, via result.document",
      "The total number of documents currently in the collection, via result.count",
      "Nothing useful; insertOne() always returns undefined",
    ],
    correctIndexes: [0],
    explanation:
      "insertOne() resolves with an object that includes an acknowledged flag and insertedId, the _id assigned to (or generated for) the new document — not the whole document and not a collection count.",
  },
  {
    id: "mongodb-create-read-3",
    question:
      "Which of the following are true about db.orders.insertMany([{ item: 'pen' }, { item: 'cup' }]);?",
    type: "multi",
    options: [
      "It inserts both documents in a single call, generating an ObjectId for each one that lacks an _id",
      "Its result includes an insertedIds value containing the _id generated for each inserted document",
      "insertMany() requires its argument to be an array of documents, not a single document object",
      "Its result exposes a single insertedId, exactly the same shape as insertOne()'s result",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "insertMany() takes an array of documents and inserts them together, auto-generating an ObjectId for any that omit _id; unlike insertOne(), which returns a single insertedId, insertMany() returns insertedIds, a map of each document's index to its generated or provided _id.",
  },
  {
    id: "mongodb-create-read-4",
    question:
      "A developer writes: db.orders.insertMany({ item: 'pen' }); intending to insert one order. What actually happens?",
    type: "single",
    options: [
      "It throws an error, because insertMany() expects an array of documents, and a bare object isn't a valid array argument",
      "It silently wraps the object in an array and inserts it as a single document, identical to insertOne()",
      "It inserts the object's fields as if they were separate top-level documents",
      "It succeeds and behaves exactly like insertOne(), since MongoDB treats the two calls as aliases",
    ],
    correctIndexes: [0],
    explanation:
      "insertMany() is strictly typed to accept an array of documents; passing a single object instead of an array (e.g. [{...}]) throws an error rather than being auto-corrected, which is exactly why insertOne() exists as the single-document counterpart.",
  },
  {
    id: "mongodb-create-read-5",
    question: "What does db.products.find({}); return?",
    type: "single",
    options: [
      "A cursor over every document in the products collection, since an empty filter object matches all documents",
      "An empty result, because {} matches nothing by definition",
      "An error, because find() requires at least one field in its filter",
      "Only documents that literally have no fields at all",
    ],
    correctIndexes: [0],
    explanation:
      "An empty filter object places no conditions on any field, so every document in the collection satisfies it; find({}) is the standard way to retrieve an entire collection.",
  },
  {
    id: "mongodb-create-read-6",
    question:
      "What does db.products.find({ category: 'shoes', inStock: true }); return?",
    type: "single",
    options: [
      "Only documents where category equals 'shoes' AND inStock equals true — listing multiple fields in a filter combines them with an implicit AND",
      "Documents where category equals 'shoes' OR inStock equals true",
      "Documents where either field is present, regardless of its value",
      "An error, because a filter object can only contain one field at a time",
    ],
    correctIndexes: [0],
    explanation:
      "When a query filter lists several fields, MongoDB requires all of them to match — it's treated as an implicit AND; an explicit $or must be used if OR logic is actually intended.",
  },
  {
    id: "mongodb-create-read-7",
    question: "What is the key difference in what find() and findOne() return?",
    type: "single",
    options: [
      "find() returns a cursor you can iterate to get an array-like list of matching documents, while findOne() returns a single matching document directly, or null if nothing matches",
      "find() and findOne() always return an identical array of matching documents",
      "find() returns a single document, while findOne() returns a cursor over all matches",
      "findOne() returns the total count of matching documents rather than any document data",
    ],
    correctIndexes: [0],
    explanation:
      "find() is built for potentially many results and returns a cursor that yields zero or more documents, while findOne() is built for the common case of wanting just one document, returning that document object directly or null when there's no match.",
  },
  {
    id: "mongodb-create-read-8",
    question:
      "What does db.users.findOne({ email: 'nobody@example.com' }); return if no document has that email?",
    type: "single",
    options: [
      "null",
      "An empty array, []",
      "An empty object, {}",
      "undefined, and accessing any property on it throws immediately",
    ],
    correctIndexes: [0],
    explanation:
      "findOne() always resolves to either the first matching document or null when there is no match; it never returns an empty array, since it's designed to hand back a single document, not a list.",
  },
  {
    id: "mongodb-create-read-9",
    question:
      "What does db.products.find({ price: { $gte: 20, $lte: 50 } }); return?",
    type: "single",
    options: [
      "Documents where price is between 20 and 50, inclusive of both boundary values",
      "Documents where price is strictly greater than 20 and strictly less than 50, excluding both boundaries",
      "Documents where price equals either 20 or 50, and no other value",
      "Documents where price is less than 20 or greater than 50",
    ],
    correctIndexes: [0],
    explanation:
      "$gte means 'greater than or equal to' and $lte means 'less than or equal to,' so combining them on the same field requires price to fall within the range 20 to 50, including both endpoints.",
  },
  {
    id: "mongodb-create-read-10",
    question:
      "What does db.users.find({ role: { $in: ['admin', 'editor'] } }); return?",
    type: "single",
    options: [
      "Documents where role equals either 'admin' or 'editor'",
      "Documents where role equals both 'admin' and 'editor' simultaneously",
      "Documents where role is not 'admin' and not 'editor'",
      "Documents where role is an array containing exactly ['admin', 'editor']",
    ],
    correctIndexes: [0],
    explanation:
      "$in matches a field against any value in the given array, so it's a concise way to express 'role is admin OR editor'; $nin is its inverse, matching documents whose field value is not in the array.",
  },
  {
    id: "mongodb-create-read-11",
    question:
      "Which of the following are valid MongoDB query comparison operators?",
    type: "multi",
    options: ["$eq", "$ne", "$like", "$gt"],
    correctIndexes: [0, 1, 3],
    explanation:
      "MongoDB's comparison operators include $eq, $ne, $gt, $gte, $lt, $lte, $in, and $nin; $like is a SQL pattern-matching operator with no equivalent in MongoDB's query language (MongoDB instead uses $regex for pattern matching).",
  },
  {
    id: "mongodb-create-read-12",
    question:
      "What does db.products.find({ $or: [{ price: { $lt: 10 } }, { onSale: true }] }); return?",
    type: "single",
    options: [
      "Documents where price is less than 10, OR onSale is true (or both)",
      "Documents where price is less than 10 AND onSale is true, at the same time",
      "Documents where neither condition is true",
      "An error, since $or cannot be combined with an array of conditions",
    ],
    correctIndexes: [0],
    explanation:
      "$or takes an array of condition objects and matches a document if at least one of them is true, unlike listing multiple fields directly in a filter object, which is combined with an implicit AND.",
  },
  {
    id: "mongodb-create-read-13",
    question:
      "Which of the following statements about the $not and $nor operators are correct?",
    type: "multi",
    options: [
      "$not negates the result of a single operator expression on one field, e.g. matching where a field is NOT greater than a value",
      "$nor takes an array of condition objects and matches documents that fail every one of those conditions",
      "$not and $nor are interchangeable and always produce identical results",
      "$nor can only be used with exactly one condition in its array, never more",
    ],
    correctIndexes: [0, 1],
    explanation:
      "$not inverts a single field-level condition, while $nor inverts an entire list of conditions, matching only documents that satisfy none of them; they operate at different scopes (single expression vs. array of clauses), so they aren't interchangeable, and $nor's array can hold two or more conditions.",
  },
  {
    id: "mongodb-create-read-14",
    question:
      "What does db.users.find({}, { name: 1, email: 1 }); return for each matching document?",
    type: "single",
    options: [
      "Only the name, email, and _id fields — listing fields with a value of 1 switches the projection into include-only mode, and _id is still included by default",
      "Every field except name and email",
      "Only the name and email fields, with _id automatically removed",
      "The entire document, since projection only affects sorting, not which fields are returned",
    ],
    correctIndexes: [0],
    explanation:
      "Setting a field to 1 in the projection puts it into inclusive mode, returning just the listed fields; _id is a special case that's still included automatically unless it's explicitly set to 0, which trips up many newcomers.",
  },
  {
    id: "mongodb-create-read-15",
    question:
      "What does db.users.find({}, { password: 0 }); return for each matching document?",
    type: "single",
    options: [
      "Every field except password — setting a field to 0 excludes just that field, and every other field, including _id, is still returned",
      "Only the password field itself",
      "No fields at all, since 0 excludes everything by default",
      "Every field except password and _id, since exclusion projections always drop _id too",
    ],
    correctIndexes: [0],
    explanation:
      "A projection using 0 works in exclude mode: the named field is dropped and every other field is kept, including _id — _id is the one field that's included by default in both include and exclude projections unless you explicitly write _id: 0.",
  },
  {
    id: "mongodb-create-read-16",
    question:
      "What does db.products.find().sort({ price: -1 }).skip(10).limit(5); return?",
    type: "single",
    options: [
      "The 11th through 15th most expensive products, since sort({ price: -1 }) orders from highest to lowest price, skip(10) drops the first 10 results, and limit(5) keeps the next 5",
      "The 5 cheapest products overall, ignoring the skip and sort entirely",
      "The first 10 products only, since limit(5) is overridden by skip(10)",
      "All products sorted by price ascending, since -1 means ascending order",
    ],
    correctIndexes: [0],
    explanation:
      "In a sort document, -1 means descending order (1 means ascending); skip() and limit() are commonly chained after sort() to implement pagination, where skip(n) jumps past the first n results of the sorted order and limit(m) caps how many of the remaining results come back.",
  },
];
