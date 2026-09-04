import type { QuizQuestion } from "../../types/quiz";

export const mongodbUpdateDeleteQuestions: QuizQuestion[] = [
  {
    id: "mongodb-update-delete-1",
    question:
      "A collection has several documents matching { status: 'inactive' }. What does db.users.updateOne({ status: 'inactive' }, { $set: { status: 'archived' } }) do?",
    type: "single",
    options: [
      "It updates only the first document that matches the filter, setting its status field to 'archived'",
      "It updates every document matching the filter, setting all their status fields to 'archived'",
      "It replaces the entire first matching document with { status: 'archived' }, discarding its other fields",
      "It throws an error because updateOne requires a filter that matches a unique _id",
    ],
    correctIndexes: [0],
    explanation:
      "updateOne() applies to the first document that matches the filter (in whatever order MongoDB encounters them), and $set updates only the named field while leaving all other fields in the document untouched.",
  },
  {
    id: "mongodb-update-delete-2",
    question:
      "A developer runs db.users.updateOne({ _id: id }, { status: 'archived' }) expecting to update the status field, but MongoDB rejects the call with an error. Why?",
    type: "single",
    options: [
      "Because updateOne() requires the update argument to contain update operators like $set; a plain field:value document with no operator is not accepted",
      "Because the filter { _id: id } is missing the $eq operator",
      "Because updateOne() can only update documents that already contain a status field",
      "Because status is a reserved word in MongoDB and cannot be used as a field name",
    ],
    correctIndexes: [0],
    explanation:
      "Unlike replaceOne(), updateOne() (and updateMany()) require the update document to be built from atomic operators such as $set, $inc, or $unset; passing a plain object with no operator triggers an 'update document requires atomic operators' error rather than silently guessing what you meant.",
  },
  {
    id: "mongodb-update-delete-3",
    question:
      "What does db.products.updateMany({ category: 'clearance' }, { $set: { onSale: true } }) do?",
    type: "single",
    options: [
      "Sets onSale to true on every document matching category: 'clearance', not just the first one",
      "Sets onSale to true only on the first document matching category: 'clearance'",
      "Creates a new document with category: 'clearance' and onSale: true if none already exists",
      "Removes the category field from every matching document",
    ],
    correctIndexes: [0],
    explanation:
      "updateMany() applies the update to every document that matches the filter, in contrast to updateOne(), which stops after modifying the first match it finds.",
  },
  {
    id: "mongodb-update-delete-4",
    question:
      "A document is { _id: 1, name: 'Kit', price: 10 }. After db.items.updateOne({ _id: 1 }, { $set: { price: 12, discount: 2 } }) runs, what does the document look like?",
    type: "single",
    options: [
      "{ _id: 1, name: 'Kit', price: 12, discount: 2 } -- price is overwritten and discount is added as a new field",
      "{ _id: 1, price: 12, discount: 2 } -- name is removed because it wasn't included in $set",
      "{ _id: 1, name: 'Kit', price: 10, discount: 2 } -- price stays unchanged since $set only adds new fields",
      "It throws an error because discount does not already exist on the document",
    ],
    correctIndexes: [0],
    explanation:
      "$set overwrites a field's value if it already exists (price) and creates it if it doesn't (discount); every field left out of $set, like name, is untouched.",
  },
  {
    id: "mongodb-update-delete-5",
    question:
      "What does db.users.updateOne({ _id: 1 }, { $unset: { middleName: '' } }) do?",
    type: "single",
    options: [
      "Removes the middleName field from the document entirely",
      "Sets middleName to an empty string ''",
      "Sets middleName to null but keeps the field present on the document",
      "Throws an error because $unset requires a non-empty value to be provided",
    ],
    correctIndexes: [0],
    explanation:
      "$unset deletes the specified field from the document; the value given (commonly '' or 1) is just a placeholder to satisfy the syntax and is otherwise ignored by MongoDB.",
  },
  {
    id: "mongodb-update-delete-6",
    question:
      "A document has { _id: 1, views: 40 }. What is the result of db.posts.updateOne({ _id: 1 }, { $inc: { views: 5 } })?",
    type: "single",
    options: [
      "views becomes 45",
      "views becomes 5",
      "views stays 40, because $inc only initializes fields that don't already exist",
      "It throws an error because views already holds a numeric value",
    ],
    correctIndexes: [0],
    explanation:
      "$inc increments a field's current value by the given amount in place, so 40 + 5 = 45; it updates the existing number directly rather than requiring the app to read the value first and write it back.",
  },
  {
    id: "mongodb-update-delete-7",
    question:
      "What does db.accounts.updateOne({ _id: 1 }, { $inc: { balance: -20 } }) do if the matched document does not yet have a balance field at all?",
    type: "single",
    options: [
      "It creates the balance field and sets it to -20, since $inc treats a missing field as if it started at 0",
      "It throws an error, because $inc cannot be applied to a field that doesn't already exist",
      "It leaves the document unchanged, since there's no existing value to increment",
      "It sets balance to 20, ignoring the negative sign",
    ],
    correctIndexes: [0],
    explanation:
      "When the target field is missing, $inc treats it as starting from 0 and creates it with the increment applied, so a -20 increment on a missing field produces -20; a negative amount decrements a value just as a positive amount increments it.",
  },
  {
    id: "mongodb-update-delete-8",
    question:
      "A document is { _id: 1, tags: ['sale'] }. What is the result of db.items.updateOne({ _id: 1 }, { $push: { tags: 'new' } })?",
    type: "single",
    options: [
      "tags becomes ['sale', 'new'] -- 'new' is appended to the end of the existing array",
      "tags becomes ['new'] -- the array is replaced entirely with the pushed value",
      "tags becomes ['new', 'sale'] -- 'new' is inserted at the start of the array",
      "It throws an error because tags already contains one element",
    ],
    correctIndexes: [0],
    explanation:
      "$push appends the given value to the end of an existing array field; it does not replace, reorder, or remove any of the array's current contents.",
  },
  {
    id: "mongodb-update-delete-9",
    question:
      "A single updateOne() call uses the update document { $set: { status: 'active' }, $inc: { loginCount: 1 }, $unset: { tempFlag: '' } }. Which statements about this call are true?",
    type: "multi",
    options: [
      "Multiple update operators can be combined in one update document, and MongoDB applies all of them to the matched document",
      "status is set to 'active', loginCount is incremented by 1, and tempFlag is removed, all as a single atomic operation",
      "Only the first operator in the object ($set) is actually applied; the rest are silently ignored",
      "This call requires three separate round trips to the database, one for each operator",
    ],
    correctIndexes: [0, 1],
    explanation:
      "A single update document can combine several operators such as $set, $inc, and $unset, and MongoDB applies every one of them to the matched document as one atomic operation, not just the first operator listed and not as multiple separate calls.",
  },
  {
    id: "mongodb-update-delete-10",
    question:
      "A collection has 5 documents matching { status: 'expired' }. What does db.sessions.deleteOne({ status: 'expired' }) do?",
    type: "single",
    options: [
      "Deletes only the first document matching the filter; the other 4 remain in the collection",
      "Deletes all 5 documents that match the filter",
      "Deletes the entire collection, since more than one document matches the filter",
      "Throws an error because deleteOne requires the filter to match exactly one document",
    ],
    correctIndexes: [0],
    explanation:
      "deleteOne() removes at most one document -- the first one encountered that matches the filter -- even when many documents match, leaving the rest untouched.",
  },
  {
    id: "mongodb-update-delete-11",
    question:
      "A developer runs db.sessions.deleteOne({ token: 'abc123' }) and gets back { acknowledged: true, deletedCount: 0 }. What does this result mean?",
    type: "single",
    options: [
      "No document matched the filter, so nothing was deleted; this is a normal, successful outcome, not an error",
      "The operation failed because of a network error",
      "A document was deleted, but MongoDB failed to record which one",
      "The token field does not exist anywhere in the collection's schema, so the query is invalid",
    ],
    correctIndexes: [0],
    explanation:
      "deleteOne() and deleteMany() never throw simply because no documents matched; deletedCount: 0 just reports that zero documents were removed, which happens whenever the filter matches nothing.",
  },
  {
    id: "mongodb-update-delete-12",
    question: "What is the effect of running db.users.deleteMany({})?",
    type: "single",
    options: [
      "It deletes every document in the users collection, since an empty filter matches all documents",
      "It does nothing, since an empty filter object matches no documents",
      "It deletes only documents that currently have no fields set on them",
      "It throws an error because deleteMany requires a non-empty filter to be provided",
    ],
    correctIndexes: [0],
    explanation:
      "An empty filter {} matches every document in the collection, so deleteMany({}) removes all of them -- effectively wiping the collection's contents while the collection and its indexes remain -- making it one of the most dangerous one-liners in MongoDB.",
  },
  {
    id: "mongodb-update-delete-13",
    question:
      "Which of the following statements about deleteOne() and deleteMany() are correct?",
    type: "multi",
    options: [
      "deleteOne() removes at most one matching document; deleteMany() removes every matching document",
      "Both methods return a result object whose deletedCount reports how many documents were actually removed",
      "deleteMany({}) removes all documents but leaves the collection itself and its indexes in place",
      "deleteOne() and deleteMany() permanently delete the collection, including its index definitions",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "deleteOne()/deleteMany() only remove documents matching their filter and report how many were removed via deletedCount; even deleteMany({}) only empties the collection's documents -- it does not drop the collection or its indexes the way db.collection.drop() would.",
  },
  {
    id: "mongodb-update-delete-14",
    question:
      "A document is { _id: 1, name: 'Kit', price: 10, tags: ['sale'] }. Compare db.items.updateOne({ _id: 1 }, { $set: { price: 12 } }) with db.items.replaceOne({ _id: 1 }, { price: 12 }). Which statements are true?",
    type: "multi",
    options: [
      "The updateOne() call only changes price to 12, leaving name and tags untouched",
      "The replaceOne() call replaces the whole document with { _id: 1, price: 12 }, removing name and tags",
      "Both calls produce the exact same resulting document",
      "replaceOne() cannot change the value of _id even though it replaces everything else in the document",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "updateOne() with $set only touches the named field, while replaceOne() swaps out the entire document body (so name and tags disappear because they weren't included in the replacement), with the one exception that _id is preserved and cannot be altered by a replacement document.",
  },
];
