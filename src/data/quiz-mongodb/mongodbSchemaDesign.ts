import type { QuizQuestion } from "../../types/quiz";

export const mongodbSchemaDesignQuestions: QuizQuestion[] = [
  {
    id: "mongodb-schema-design-1",
    question:
      "Which statement best describes MongoDB's default schema-less design?",
    type: "single",
    options: [
      "Documents within the same collection are not required to share the same fields or structure; MongoDB itself does not enforce a shape unless validation rules are added",
      "Every document in a collection must have identical field names and types, enforced automatically by MongoDB",
      "Schema-less means MongoDB cannot store nested objects or arrays inside a document",
      "Schema-less means a collection cannot have indexes until a schema is explicitly defined for it",
    ],
    correctIndexes: [0],
    explanation:
      "By default, MongoDB does not require documents in a collection to share fields, types, or structure; keeping a consistent shape is left to the application, or to optional $jsonSchema validation rules, rather than being enforced by the database itself.",
  },
  {
    id: "mongodb-schema-design-2",
    question:
      "A 'products' collection has one document { _id: 1, name: 'Mug', price: 9.99 } and another { _id: 2, name: 'Shirt', price: '19.99', size: 'L' }. Why does MongoDB accept both documents without complaint?",
    type: "single",
    options: [
      "Because MongoDB's schema-less design allows documents in the same collection to have different fields, and even different types for a field with the same name, unless validation rules say otherwise",
      "Because MongoDB automatically converts the string '19.99' to a number behind the scenes",
      "Because price is a reserved system field that MongoDB treats specially",
      "Because the two documents actually belong to two different, automatically created collections",
    ],
    correctIndexes: [0],
    explanation:
      "Without schema validation, MongoDB does not check that documents in a collection share the same fields or that a field always holds the same type; that flexibility enables rapid iteration, but it also means inconsistencies like a string price on one document and a numeric price on another can silently creep into the data.",
  },
  {
    id: "mongodb-schema-design-3",
    question:
      "Which of the following are accurate about MongoDB's schema-less nature?",
    type: "multi",
    options: [
      "It makes rapid iteration easier, since new fields can be added to some documents without migrating every existing document",
      "Without discipline in the application layer, it can lead to inconsistent document shapes that make querying and maintaining data harder over time",
      "It means MongoDB has no way to enforce required fields or field types, even if a team explicitly asks it to",
      "It guarantees that every document automatically receives default values for any field it's missing",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Schema-less design speeds up iteration because document shapes can evolve without a migration, but that same flexibility can produce inconsistent documents without application-level discipline; MongoDB can still enforce structure through optional $jsonSchema validation, and it never invents default values for fields that are simply missing.",
  },
  {
    id: "mongodb-schema-design-4",
    question:
      "What does it mean to 'design around query patterns' when modeling data in MongoDB, as opposed to normalizing data the way a relational database would?",
    type: "single",
    options: [
      "It means shaping documents and collections based on how the application will actually read and write data, even if that means some duplication, rather than splitting data into many normalized tables to avoid redundancy",
      "It means every collection must exactly mirror a relational table, with foreign keys enforced by the database",
      "It means avoiding indexes entirely, since MongoDB queries are always fast regardless of access pattern",
      "It means storing every field as a string so queries never fail because of a type mismatch",
    ],
    correctIndexes: [0],
    explanation:
      "Relational modeling optimizes for eliminating redundancy through normalization; MongoDB modeling instead optimizes for how the application actually queries the data, often embedding related data together, and accepting some duplication, so the common reads need only one query.",
  },
  {
    id: "mongodb-schema-design-5",
    question:
      "A blogging app almost always fetches a blog post together with its author's display name and avatar URL. Which modeling choice best reflects the principle that 'data accessed together should be stored together'?",
    type: "single",
    options: [
      "Embed a small copy of the author's display name and avatar URL directly inside each post document, so a single query returns everything the page needs",
      "Store only the author's _id on the post, and always run a separate query (or $lookup) to fetch the full author profile before rendering",
      "Store posts and authors in entirely unrelated collections with no connection between them at all",
      "Store the entire post content inside the author's document instead of giving posts their own collection",
    ],
    correctIndexes: [0],
    explanation:
      "Since the display name and avatar are read together with the post on essentially every request, embedding a small copy of that frequently-needed data avoids a second query or $lookup on the common read path, trading a bit of duplication for read speed.",
  },
  {
    id: "mongodb-schema-design-6",
    question:
      "What is the main performance benefit of embedding related data inside a single document instead of referencing it from another collection?",
    type: "single",
    options: [
      "A single query can retrieve the document and all of its embedded data together, avoiding the extra round trip a reference would require",
      "Embedded data automatically gets indexed for free, while referenced data can never be indexed",
      "Embedding removes the 16MB document size limit for that particular collection",
      "Embedding guarantees the data can never become inconsistent or duplicated",
    ],
    correctIndexes: [0],
    explanation:
      "Because an embedded document lives inside its parent, reading the parent also returns the embedded data in the very same query, whereas referenced data requires a separate query or an aggregation $lookup stage to join it back in.",
  },
  {
    id: "mongodb-schema-design-7",
    question:
      "An e-commerce app embeds a full copy of category details ({ name, description, iconUrl }) inside every one of its 500,000 product documents. Renaming a category later requires updating 500,000 documents. What does this illustrate about embedding?",
    type: "single",
    options: [
      "Embedding duplicates data, so when that data is shared across many documents and later changes, every copy has to be found and updated, which can be slow and error-prone",
      "Embedding is always faster to update than referencing, no matter how many documents share the embedded data",
      "MongoDB automatically keeps every embedded copy of the same data in sync with the original",
      "This is not a real concern, because embedded subdocuments cannot be edited after the parent document is inserted",
    ],
    correctIndexes: [0],
    explanation:
      "Embedding trades read speed for update cost: when the same piece of data is copied into many documents and that data later changes, every copy needs to be tracked down and updated, which is exactly the kind of shared, frequently changing data that's often a better fit for referencing.",
  },
  {
    id: "mongodb-schema-design-8",
    question:
      "What is the main tradeoff of referencing another document (storing its _id) instead of embedding its data?",
    type: "single",
    options: [
      "It avoids duplicating the referenced data, but reassembling the full picture requires an extra query or an aggregation $lookup stage to join the documents together",
      "It duplicates the referenced data across every document that points to it",
      "It removes the need to ever put an index on the referencing field",
      "It guarantees single-query reads with no additional lookups ever required",
    ],
    correctIndexes: [0],
    explanation:
      "Referencing keeps a single source of truth for the referenced data, avoiding duplication, but reconstructing the full related picture means either running a second query by _id or using $lookup in an aggregation pipeline to join the collections back together.",
  },
  {
    id: "mongodb-schema-design-9",
    question:
      "Which of the following statements about embedding versus referencing in MongoDB are accurate?",
    type: "multi",
    options: [
      "Embedding tends to favor fast reads of related data at the cost of potential duplication",
      "Referencing tends to avoid duplication at the cost of needing an extra query or $lookup to assemble related data",
      "MongoDB requires every one-to-many relationship to use referencing; embedding is not permitted for related data",
      "The right choice between embedding and referencing depends on factors like how large the related data is and how often it changes",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "Embedding and referencing are complementary tools rather than a hard rule: embedding favors read speed at the cost of possible duplication, referencing favors a single source of truth at the cost of an extra lookup, and the better fit depends on the size, growth, and update frequency of the related data.",
  },
  {
    id: "mongodb-schema-design-10",
    question:
      "A blog post typically has a small, fixed set of up to 5 tags. Which is the more idiomatic MongoDB pattern for modeling this one-to-many relationship?",
    type: "single",
    options: [
      "Embed the tags directly as an array field inside the post document, since the 'many' side is small and bounded",
      "Create a separate 'tags' collection and store a reference from each tag document back to every post that uses it",
      "Store each individual tag as its own top-level collection",
      "Store the tags as a single comma-separated string field instead of an array",
    ],
    correctIndexes: [0],
    explanation:
      "When the 'many' side of a one-to-many relationship is small and bounded, like a handful of tags, embedding it as an array inside the parent document is simple and keeps the related data together in a single read.",
  },
  {
    id: "mongodb-schema-design-11",
    question:
      "A blog post can accumulate thousands of comments over time, an unbounded and potentially large 'many'. What is the recommended way to model this one-to-many relationship?",
    type: "single",
    options: [
      "Store comments in their own collection, with each comment document referencing the post's _id, rather than embedding a growing array of comments inside the post",
      "Embed every comment as an array element inside the post document, no matter how many accumulate",
      "Store the post's _id inside every comment's field name instead of storing it as a value",
      "Duplicate the entire post document inside every one of its comments",
    ],
    correctIndexes: [0],
    explanation:
      "When the 'many' side is large or unbounded, referencing from the many side, where each comment stores the post's _id, avoids an ever-growing embedded array that could bloat the parent document and approach MongoDB's document size limit.",
  },
  {
    id: "mongodb-schema-design-12",
    question:
      "A 'department' can have many 'employees', but the app models this by storing an array of employee _ids on the department document, rather than storing a department_id on each employee. What is true about this pattern?",
    type: "single",
    options: [
      "It's referencing from the 'one' side, a valid but less common pattern than referencing from the 'many' side, and it can become awkward if the array of ids grows very large",
      "It's an example of embedding, since the department document directly contains the full employee data",
      "It's the only correct way to model a one-to-many relationship in MongoDB",
      "It's invalid, because MongoDB does not allow a field to hold an array of _id values",
    ],
    correctIndexes: [0],
    explanation:
      "Storing an array of child ids on the parent ('one' side) is a valid but less common referencing pattern; it works for smaller lists, but for a large or fast-growing 'many' side it tends to be less convenient than the more common approach of referencing the parent's _id from each child document.",
  },
  {
    id: "mongodb-schema-design-13",
    question:
      "MongoDB is schema-less by default. How can a team still enforce that every document in a 'users' collection has a required email field of type string?",
    type: "single",
    options: [
      "By attaching a $jsonSchema validation rule to the collection, which MongoDB will then enforce on inserts and updates",
      "By declaring email as a primary key in the collection's configuration settings",
      "MongoDB cannot enforce this at all; schema-less means no validation is ever possible",
      "By creating a unique index on email, which automatically enforces both its presence and its type",
    ],
    correctIndexes: [0],
    explanation:
      "A collection can define a validator using $jsonSchema to enforce rules like required fields and field types, letting a team keep MongoDB's default flexibility while still guaranteeing structure where it matters; a unique index alone only prevents duplicate values, it doesn't require the field to exist or hold a particular type.",
  },
  {
    id: "mongodb-schema-design-14",
    question:
      "Which of the following statements about MongoDB document limits are correct?",
    type: "multi",
    options: [
      "A single document cannot exceed 16MB in total size",
      "Documents cannot nest more than 100 levels of embedded documents or arrays deep",
      "An embedded array with no bound on how large it can grow, like comments on a popular post, is a real risk of hitting the document size limit, which is why such relationships are often referenced instead",
      "The 16MB document size limit applies only to a document's top-level fields, not to embedded subdocuments or arrays inside it",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "MongoDB caps a single document at 16MB total, including everything nested inside it, and caps nesting depth at 100 levels; an unbounded embedded array, such as comments that can grow indefinitely, is a genuine way to approach that 16MB ceiling over time, which is exactly why the unbounded side of a one-to-many relationship is usually referenced rather than embedded.",
  },
];
