import type { QuizQuestion } from "../../types/quiz";

export const mongodbAggregationQuestions: QuizQuestion[] = [
  {
    id: "mongodb-aggregation-1",
    question:
      "What is the core idea behind MongoDB's aggregation pipeline?",
    type: "single",
    options: [
      "Documents flow through an ordered sequence of stages, where each stage transforms the output of the previous one to produce a final result",
      "It runs a single SQL query against a temporary relational table generated from the collection",
      "It filters documents using the same syntax as find(), but can never reshape or compute new fields",
      "It replaces indexes entirely, so aggregation queries never need index support",
    ],
    correctIndexes: [0],
    explanation:
      "An aggregation pipeline is an array of stages; each stage takes the documents produced by the previous stage as its input and passes its transformed output to the next, letting you filter, reshape, group, and combine data in one operation.",
  },
  {
    id: "mongodb-aggregation-2",
    question:
      "How does using the aggregation pipeline generally differ from a plain find() call?",
    type: "single",
    options: [
      "find() applies a single filter and optional field projection to shape output, while the aggregation pipeline can chain many stages (filtering, grouping, reshaping, joining, and more) in sequence",
      "find() can group documents and compute averages, while the aggregation pipeline can only filter documents",
      "There is no real difference; aggregate() is simply an older, deprecated alias for find()",
      "find() can join data from another collection, while the aggregation pipeline cannot",
    ],
    correctIndexes: [0],
    explanation:
      "find() is designed for a single filter-and-shape operation, a query plus optional projection, sort, and limit, whereas the aggregation pipeline supports composing many stages together, including grouping, computed fields, and joins via $lookup, none of which find() can do on its own.",
  },
  {
    id: "mongodb-aggregation-3",
    question: "Which statement about the $match stage is accurate?",
    type: "single",
    options: [
      "$match filters documents using the same query syntax as find(), and is commonly placed as early as possible in the pipeline to reduce the number of documents later stages must process",
      "$match can only be used as the very last stage of a pipeline",
      "$match requires a completely different query syntax than find() does",
      "$match can only match on the _id field",
    ],
    correctIndexes: [0],
    explanation:
      "$match takes the same kind of query document you'd pass to find(), and placing it early, ideally first, lets MongoDB filter out non-matching documents immediately, reducing the work, and often letting it use an index, for the stages that follow.",
  },
  {
    id: "mongodb-aggregation-4",
    question:
      "Which of the following are good reasons to place a $match stage as early as possible in an aggregation pipeline?",
    type: "multi",
    options: [
      "Fewer documents flow into the following stages, reducing the amount of work they have to do",
      "An early $match on indexed fields can let MongoDB use an index, similar to how find() would",
      "It reduces the memory needed for stages like $group or $sort that must hold documents in memory",
      "$match is required to be the first stage; a pipeline without $match first fails to run",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "Filtering early means every later stage processes fewer documents, an indexed field in an early $match can enable an index scan just like a normal query, and memory-heavy stages like $group or $sort have less data to hold; however, $match is not mandatory or required to be first, it's simply good practice whenever filtering early is possible.",
  },
  {
    id: "mongodb-aggregation-5",
    question:
      "In a $group stage such as { $group: { _id: '$category', total: { $sum: 1 } } }, what does the _id field represent?",
    type: "single",
    options: [
      "The grouping key: an expression whose distinct values determine how documents are bucketed into groups, not a normal document's unique _id",
      "The unique _id of the first document encountered in each group",
      "A required reference back to the original collection's _id index",
      "It has no special meaning and is simply a leftover field name copied from find()",
    ],
    correctIndexes: [0],
    explanation:
      "Inside $group, _id is repurposed as the grouping key: MongoDB creates one output document per distinct value of that expression, here, each distinct category, which is a different meaning from the usual per-document _id field.",
  },
  {
    id: "mongodb-aggregation-6",
    question:
      "What does { $group: { _id: '$department', avgSalary: { $avg: '$salary' } } } compute?",
    type: "single",
    options: [
      "One output document per distinct department, each containing the average salary of documents in that department",
      "A single document with the average salary across the entire collection",
      "The department that has the single highest salary",
      "One output document per input document, each annotated with its department's average salary so far",
    ],
    correctIndexes: [0],
    explanation:
      "$group buckets input documents by the _id expression, here $department, and computes one accumulator value, the average salary, per bucket, producing exactly one output document for each distinct department.",
  },
  {
    id: "mongodb-aggregation-7",
    question:
      "Why does { $group: { _id: '$status', count: { $sum: 1 } } } produce a count of documents per status?",
    type: "single",
    options: [
      "Because $sum: 1 adds the literal number 1 for every document in the group, so the running total ends up equal to the number of documents in that group",
      "Because $sum: 1 counts only documents where some field equals exactly 1",
      "Because $group automatically renames a special built-in count field to 'count' whenever it sees the number 1",
      "It doesn't actually count documents; the count field here always evaluates to 1",
    ],
    correctIndexes: [0],
    explanation:
      "$sum: 1 is a common idiom: instead of summing a document's field, it sums the constant 1 once per document in the group, so the accumulated total equals the number of documents that fell into that group, effectively counting them.",
  },
  {
    id: "mongodb-aggregation-8",
    question:
      "Which of the following are valid accumulator operators usable inside a $group stage?",
    type: "multi",
    options: ["$sum", "$avg", "$push", "$filter"],
    correctIndexes: [0, 1, 2],
    explanation:
      "$sum, $avg, and $push are all $group accumulators, summing or averaging values across a group, or collecting them into an array; $filter is a different kind of operator used to select elements out of an array field, not to accumulate values across a group.",
  },
  {
    id: "mongodb-aggregation-9",
    question:
      "What does { $group: { _id: '$authorId', titles: { $push: '$title' } } } produce for each group?",
    type: "single",
    options: [
      "An array field named titles containing the title value from every document in that group, in the order they were processed",
      "A single string joining every title in the group with commas",
      "Only the first title encountered in the group",
      "The count of distinct titles in the group",
    ],
    correctIndexes: [0],
    explanation:
      "$push appends the given expression's value from every document in the group into an array, so titles ends up holding one entry per document in that group, useful for collecting related values without deduplicating or numerically aggregating them.",
  },
  {
    id: "mongodb-aggregation-10",
    question:
      "A pipeline includes { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }. What does this produce?",
    type: "single",
    options: [
      "A single output document with totalRevenue summed across every input document, since a null grouping key places all documents into one group",
      "One output document per distinct amount value",
      "An error, because _id cannot be set to null in a $group stage",
      "No documents, because null never matches anything",
    ],
    correctIndexes: [0],
    explanation:
      "Using _id: null makes every input document belong to the same single group, so accumulators like $sum compute one grand-total value across the whole input, a common pattern for collection-wide totals.",
  },
  {
    id: "mongodb-aggregation-11",
    question:
      "What does { $project: { name: 1, email: 1, _id: 0 } } do to each document passing through it?",
    type: "single",
    options: [
      "Keeps only the name and email fields, and drops _id, removing every other field from the output document",
      "Adds two new fields called name and email, each set to the value 1",
      "Deletes the name and email fields, keeping everything else",
      "Renames the _id field to 0 in the output",
    ],
    correctIndexes: [0],
    explanation:
      "In $project, a value of 1 includes a field in the output while all unspecified fields are dropped by default; _id is the one field included by default even without being listed, so it must be explicitly set to 0 to exclude it, as shown here.",
  },
  {
    id: "mongodb-aggregation-12",
    question:
      "What does { $project: { total: { $multiply: ['$price', '$quantity'] } } } add to each output document?",
    type: "single",
    options: [
      "A computed field named total, equal to price multiplied by quantity for that document",
      "It multiplies every existing field in the document by 2",
      "It replaces the document's _id with the product of price and quantity",
      "Nothing; $project cannot compute new values, only include or exclude existing fields",
    ],
    correctIndexes: [0],
    explanation:
      "$project can include computed fields built from expressions, not just pass through existing ones; here $multiply produces a new total field from multiplying two existing fields together, alongside any fields explicitly included.",
  },
  {
    id: "mongodb-aggregation-13",
    question:
      "Which statements about $sort, $limit, and $skip as aggregation pipeline stages are true?",
    type: "multi",
    options: [
      "They apply the same sorting, limiting, and skipping concepts as the .sort(), .limit(), and .skip() cursor methods used with find()",
      "They can be used as pipeline stages wherever a pipeline needs them, not just at the very end",
      "The order these stages appear in the pipeline can change the result; for example, $sort before $limit picks the top N in that order, while $limit before $sort does not",
      "$skip and $limit can only be used together with $group, never with $match alone",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "$sort, $limit, and $skip mirror find()'s cursor modifiers but can be placed anywhere a pipeline needs them, for example sorting mid-pipeline before a $group, and because stages run in order, putting $sort before $limit produces a genuine top-N result while reversing the order limits an arbitrarily-ordered set first; none of these stages requires $group to be present.",
  },
  {
    id: "mongodb-aggregation-14",
    question: "What does $lookup do in an aggregation pipeline?",
    type: "single",
    options: [
      "Performs a left-outer-join style operation, matching documents from another collection via localField/foreignField, and adding them as a new array field on each input document",
      "Deletes documents from another collection that don't match the current one",
      "Copies every document from another collection into the current one, merging their fields together",
      "Looks up a single field's value from an index without returning the whole document",
    ],
    correctIndexes: [0],
    explanation:
      "$lookup performs a left-outer join against another collection in the same database, matching documents where the specified localField equals the foreignField, and attaches all matches as a new array field on the input document, an empty array if none match.",
  },
  {
    id: "mongodb-aggregation-15",
    question:
      "After running { $lookup: { from: 'orders', localField: '_id', foreignField: 'customerId', as: 'customerOrders' } }, a developer writes doc.customerOrders.total to read the first matched order's total. Why does this fail?",
    type: "single",
    options: [
      "$lookup always adds customerOrders as an array of matched documents, even when there's only one match, so it must be accessed with an index, like customerOrders[0].total",
      "$lookup never actually adds the specified 'as' field to the output document",
      "$lookup requires localField and foreignField to have identical names",
      "customerOrders is a plain string, not an object or array, so .total is invalid syntax",
    ],
    correctIndexes: [0],
    explanation:
      "$lookup's output field, named by 'as', is always an array of the matching documents from the foreign collection, regardless of how many matches were found, so accessing a field directly on it, rather than on an array element, doesn't work as intended.",
  },
  {
    id: "mongodb-aggregation-16",
    question:
      "A pipeline is: [ { $match: { status: 'completed' } }, { $group: { _id: '$customerId', totalSpent: { $sum: '$amount' } } }, { $sort: { totalSpent: -1 } } ]. What does this produce?",
    type: "single",
    options: [
      "One document per customer who has at least one completed order, each showing that customer's total spend across their completed orders, ordered from highest spender to lowest",
      "A single document with the combined total of every completed order in the collection",
      "Every completed order document, sorted by amount, with no grouping applied",
      "One document per customer showing their total spend across all orders, including uncompleted ones",
    ],
    correctIndexes: [0],
    explanation:
      "The $match stage first keeps only completed orders, $group then buckets the remaining documents by customerId and sums each customer's amount into totalSpent, and the final $sort orders those per-customer totals from highest to lowest, so only completed orders count and the sort applies to the grouped totals, not the raw orders.",
  },
];
