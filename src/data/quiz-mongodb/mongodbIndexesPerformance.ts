import type { QuizQuestion } from "../../types/quiz";

export const mongodbIndexesPerformanceQuestions: QuizQuestion[] = [
  {
    id: "mongodb-indexes-performance-1",
    question: "Why do indexes exist in MongoDB?",
    type: "single",
    options: [
      "They let MongoDB find documents matching a query without scanning every document in the collection, similar to an index in the back of a book",
      "They automatically validate the schema of every document before it's inserted",
      "They compress documents on disk to save storage space",
      "They replace the need for a query's filter conditions entirely",
    ],
    correctIndexes: [0],
    explanation:
      "An index is an ordered data structure over one or more fields that lets the query engine jump directly to matching documents instead of examining every document in the collection, known as a full collection scan.",
  },
  {
    id: "mongodb-indexes-performance-2",
    question:
      "By default, what index does MongoDB automatically create when a new collection is created?",
    type: "single",
    options: [
      "A unique ascending index on the _id field",
      "A compound index covering every field in the first inserted document",
      "No index is created automatically; every collection starts with zero indexes",
      "A text index on all string fields",
    ],
    correctIndexes: [0],
    explanation:
      "MongoDB always creates a unique index on _id automatically so every document can be looked up efficiently and duplicate _id values are rejected; this default index cannot be dropped.",
  },
  {
    id: "mongodb-indexes-performance-3",
    question:
      "A developer runs db.users.dropIndex('_id_') to try to free up space. What happens?",
    type: "single",
    options: [
      "MongoDB rejects the operation, because the default index on _id cannot be dropped",
      "The index is dropped, and future queries on _id fall back to a collection scan",
      "The entire collection is deleted along with its index",
      "The index is dropped, but new documents can no longer be inserted into the collection",
    ],
    correctIndexes: [0],
    explanation:
      "The automatically created index on _id is required for MongoDB's internal operation and uniqueness guarantees, so attempts to drop it are rejected with an error.",
  },
  {
    id: "mongodb-indexes-performance-4",
    question:
      "Which of the following are genuine tradeoffs of adding an index to a collection?",
    type: "multi",
    options: [
      "Reads that use the index become faster because fewer documents need to be examined",
      "Writes (inserts, updates, deletes) can become slightly slower because the index must be updated to stay in sync with the data",
      "The index consumes additional disk and memory space beyond the collection's own data",
      "Indexes make it impossible to run queries that don't use the indexed field",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Indexes speed up matching reads, but every write that touches an indexed field must also update the index structure, and the index itself takes up storage; queries that don't use an index still work, they just fall back to a slower collection scan rather than becoming impossible.",
  },
  {
    id: "mongodb-indexes-performance-5",
    question: "What does db.products.createIndex({ price: 1 }) do?",
    type: "single",
    options: [
      "Creates an index on the price field sorted in ascending order",
      "Creates an index on the price field sorted in descending order",
      "Creates a unique constraint that forbids two products from sharing the same price",
      "Deletes any existing index on the price field",
    ],
    correctIndexes: [0],
    explanation:
      "In createIndex(), a value of 1 for a field means the index stores that field in ascending order, while -1 means descending order; neither direction alone enforces uniqueness, that requires the separate 'unique' option.",
  },
  {
    id: "mongodb-indexes-performance-6",
    question:
      "Which of the following statements about index sort direction (1 vs -1) are true?",
    type: "multi",
    options: [
      "1 means the field is indexed in ascending order, and -1 means descending order",
      "For a single-field index, MongoDB can typically scan it in either direction, so the direction rarely matters on its own",
      "For a compound index, the relative direction of each field can matter when a query needs to sort by multiple fields at once in mixed directions",
      "Once an index is created with direction 1, it can never be used to satisfy a query sorting in descending order",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "1 and -1 set ascending vs. descending order; a single-field index can be traversed in reverse to satisfy either sort direction, but for compound indexes the combination of directions chosen at creation time determines which multi-field, mixed-direction sorts can be served directly from the index.",
  },
  {
    id: "mongodb-indexes-performance-7",
    question:
      "A collection has a compound index db.orders.createIndex({ customerId: 1, status: 1 }). Which query can use this index efficiently?",
    type: "single",
    options: [
      "db.orders.find({ customerId: 'c1', status: 'shipped' })",
      "db.orders.find({ status: 'shipped' }) alone, because compound indexes support querying on any of their fields independently",
      "Only db.orders.find({ status: 'shipped', customerId: 'c1' }), because the fields must be listed in the filter in the same order as the index",
      "No query can use a compound index; only single-field indexes are usable by find()",
    ],
    correctIndexes: [0],
    explanation:
      "Compound indexes are usable as a prefix: a query on customerId alone, or on customerId and status together, can use this index efficiently, but a query on status alone generally cannot, because MongoDB needs the leftmost field(s) of the index present in the query; the order fields appear inside the filter object doesn't matter, only the order they were defined in the index.",
  },
  {
    id: "mongodb-indexes-performance-8",
    question:
      "A query filters for an exact match on one field, sorts by a second field, and filters a third field with a range comparison like $gt. What field order does the ESR rule recommend for the compound index that supports it?",
    type: "single",
    options: [
      "Equality field first, then the Sort field, then the Range field",
      "Range field first, then the Sort field, then the Equality field",
      "Whatever order the fields happen to appear in the query's filter object",
      "Alphabetical order of the field names",
    ],
    correctIndexes: [0],
    explanation:
      "The ESR rule (Equality, Sort, Range) recommends putting fields queried for an exact match first, then fields used for sorting, then fields used for a range comparison; this ordering lets MongoDB narrow down matches and satisfy the sort using the index before it has to scan across a range of values.",
  },
  {
    id: "mongodb-indexes-performance-9",
    question: "Which of the following statements about unique indexes are true?",
    type: "multi",
    options: [
      "db.users.createIndex({ email: 1 }, { unique: true }) prevents two documents from having the same email value",
      "A unique index allows at most one document to have a missing (or null) value for the indexed field, by default",
      "Unique indexes can be created on a combination of multiple fields, enforcing uniqueness on the combination rather than on each field alone",
      "Creating a unique index on a collection that already contains duplicate values automatically deletes the duplicate documents",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Unique indexes reject writes that would duplicate an existing indexed value, allow only one document with a missing/null value by default, and can be compound to enforce uniqueness across a combination of fields; however, creating a unique index on a collection that already has duplicates fails outright rather than silently deleting the offending documents.",
  },
  {
    id: "mongodb-indexes-performance-10",
    question:
      "A collection has a unique index on email. An insert fails with an error containing 'E11000 duplicate key error'. What does this mean?",
    type: "single",
    options: [
      "A document with the same email value already exists in the collection",
      "The email field is missing from the inserted document",
      "The collection has reached its maximum storage size",
      "The index itself is corrupted and needs to be rebuilt",
    ],
    correctIndexes: [0],
    explanation:
      "E11000 is MongoDB's duplicate key error code, raised when an insert or update would violate a unique index by creating a second document with a value already present in that indexed field.",
  },
  {
    id: "mongodb-indexes-performance-11",
    question:
      "Running db.orders.find({ status: 'pending' }).explain() shows a winning plan stage of COLLSCAN. What does this indicate?",
    type: "single",
    options: [
      "MongoDB scanned every document in the collection to find matches, because no usable index existed for this query",
      "MongoDB used an index to jump directly to the matching documents",
      "The query returned zero results",
      "The collection is corrupted and must be repaired",
    ],
    correctIndexes: [0],
    explanation:
      "COLLSCAN means the query planner performed a full collection scan, examining every document because it had no suitable index to use; an IXSCAN stage would instead indicate the planner used an index scan.",
  },
  {
    id: "mongodb-indexes-performance-12",
    question:
      "In the output of explain('executionStats'), one query shows nReturned: 5 and totalDocsExamined: 5. A second query shows nReturned: 5 and totalDocsExamined: 50000. What does the second result suggest?",
    type: "single",
    options: [
      "The second query is far less efficient: it had to examine many more documents than it actually returned, a sign the index isn't narrowing the search well, or that none is being used",
      "The second query is more efficient, because examining more documents means the index is more thorough",
      "Both queries are equally efficient, because they returned the same number of documents",
      "totalDocsExamined has no relationship to query performance",
    ],
    correctIndexes: [0],
    explanation:
      "A query is efficient when totalDocsExamined is close to nReturned, meaning the index (or scan) narrowed almost directly to the matching documents; a huge gap, like 50000 examined for only 5 returned, signals the query is examining far more documents than necessary, often because of a missing or poorly-matching index.",
  },
];
