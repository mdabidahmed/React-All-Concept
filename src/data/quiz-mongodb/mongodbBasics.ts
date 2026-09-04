import type { QuizQuestion } from "../../types/quiz";

export const mongodbBasicsQuestions: QuizQuestion[] = [
  {
    id: "mongodb-basics-1",
    question: "Fundamentally, what kind of database is MongoDB?",
    type: "single",
    options: [
      "A document database that stores records as flexible, JSON-like documents, and belongs to the broader NoSQL family",
      "A strictly relational database that stores every record as a row inside a fixed-column table",
      "A pure key-value store limited to storing a single unstructured string per key",
      "A graph database whose primary structures are nodes and edges rather than documents",
    ],
    correctIndexes: [0],
    explanation:
      "MongoDB is a document-oriented database: it groups related data into self-contained BSON documents rather than normalized rows split across tables, placing it in the NoSQL (non-relational) family of databases alongside key-value, column, and graph stores.",
  },
  {
    id: "mongodb-basics-2",
    question:
      "Which statement best summarizes the structural difference between a SQL database and MongoDB?",
    type: "single",
    options: [
      "SQL databases store JSON-like documents grouped into collections, while MongoDB stores rows grouped into tables",
      "There is no structural difference; SQL and MongoDB both organize data into tables of rows and columns",
      "SQL databases organize data into tables of rows with a predefined schema, while MongoDB organizes data into collections of documents with a flexible schema",
      "MongoDB requires every document to declare its columns in advance, exactly like a SQL table",
    ],
    correctIndexes: [2],
    explanation:
      "SQL databases are built around fixed-schema tables, rows, and columns, whereas MongoDB groups documents (not rows) into collections (not tables), and those documents are not required to share an identical set of fields.",
  },
  {
    id: "mongodb-basics-3",
    question:
      "What is a key tradeoff between a SQL database's rigid schema and MongoDB's flexible schema?",
    type: "single",
    options: [
      "A rigid schema lets every row store a completely different set of fields, while a flexible schema forces all documents to match exactly",
      "A rigid schema catches data-shape mistakes early and keeps data consistent, while a flexible schema allows faster iteration but pushes more consistency responsibility onto the application",
      "Rigid and flexible schemas perform identically in every scenario, so the choice never has practical consequences",
      "A flexible schema means MongoDB cannot store more than one data type in the same collection",
    ],
    correctIndexes: [1],
    explanation:
      "A rigid, predefined schema enforces structure and catches malformed data at write time, which suits stable, well-understood data; a flexible schema lets a collection's documents evolve without a formal migration, at the cost of the application needing to handle documents that may not all share the same shape.",
  },
  {
    id: "mongodb-basics-4",
    question:
      "Which of the following statements about relationships between data in SQL vs. MongoDB are accurate?",
    type: "multi",
    options: [
      "SQL databases typically normalize related data across multiple tables and combine them at query time using JOINs",
      "MongoDB commonly embeds related data directly inside a parent document instead of normalizing it into a separate collection",
      "MongoDB has no mechanism at all for connecting data stored in separate collections",
      "Deciding whether to embed related data or reference it in a separate collection is a MongoDB schema design decision",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "SQL relies on JOINs across normalized tables, while MongoDB favors embedding related data in one document for read performance, though it can also reference documents across collections and combine them at query time, so it is not true that MongoDB has no way to connect data.",
  },
  {
    id: "mongodb-basics-5",
    question:
      "A team needs to store financial ledger entries with strict multi-table consistency, a well-understood fixed structure, and complex JOIN-based reporting. Which choice is generally more appropriate, and why?",
    type: "single",
    options: [
      "MongoDB, because flexible schemas are always a strict upgrade over rigid ones for any workload",
      "MongoDB, because embedding documents removes any need to think about consistency",
      "Neither; this workload cannot be modeled in a database and must be handled with flat files",
      "A SQL database, because its rigid schema, mature transaction support, and native JOINs suit strongly structured, consistency-critical, relational reporting needs",
    ],
    correctIndexes: [3],
    explanation:
      "Strict, well-defined relational structure with heavy cross-table consistency and JOIN-based reporting plays to a SQL database's strengths; MongoDB can also model relational data, but it isn't the natural fit when the workload is this rigidly relational.",
  },
  {
    id: "mongodb-basics-6",
    question:
      "Which best describes MongoDB's structural hierarchy, from largest to smallest?",
    type: "single",
    options: [
      "A database contains collections, and each collection contains documents",
      "A collection contains databases, and each database contains documents",
      "A document contains collections, and each collection contains databases",
      "A database contains documents directly; collections are just a display filter with no structural meaning",
    ],
    correctIndexes: [0],
    explanation:
      "MongoDB nests data as database -> collection -> document, roughly mirroring the SQL hierarchy of database -> table -> row.",
  },
  {
    id: "mongodb-basics-7",
    question: "In MongoDB, what is a 'document'?",
    type: "single",
    options: [
      "A named group of related records stored inside a database, comparable to a SQL table",
      "The top-level container that can hold multiple databases on a single server",
      "A single record made of field-value pairs, comparable to a row in a SQL table, but able to hold nested objects and arrays",
      "A binary file format used exclusively to store index metadata",
    ],
    correctIndexes: [2],
    explanation:
      "A document is MongoDB's basic unit of data, roughly analogous to a row, but unlike a rigid row it can naturally hold nested sub-documents and arrays without needing separate tables.",
  },
  {
    id: "mongodb-basics-8",
    question: "MongoDB documents are described as 'JSON-like.' What does this mean?",
    type: "single",
    options: [
      "Documents are stored on disk as literal .json text files, one file per document",
      "Documents use a JSON-style structure of field-value pairs, arrays, and nested objects, but are actually persisted as BSON, a binary-encoded superset of JSON",
      "Documents must be manually converted to JSON before MongoDB can store them, and back again on every read",
      "JSON-like means a document can only contain a single flat list of string values",
    ],
    correctIndexes: [1],
    explanation:
      "The document model mirrors JSON's shape (objects, arrays, key-value pairs), which is why it's called 'JSON-like,' but MongoDB stores and transmits documents as BSON rather than JSON text.",
  },
  {
    id: "mongodb-basics-9",
    question:
      "Why does MongoDB use BSON instead of storing documents as plain-text JSON?",
    type: "single",
    options: [
      "BSON adds data types plain JSON lacks, such as a native Date type and a distinct ObjectId type, and its binary layout is faster to parse and traverse than text",
      "BSON is only a cosmetic renaming of JSON with no functional differences",
      "BSON removes the ability to nest objects or store arrays, which plain JSON allows",
      "BSON exists solely to make documents unreadable to humans, for security purposes",
    ],
    correctIndexes: [0],
    explanation:
      "Plain JSON's type system is limited to strings, numbers, booleans, null, objects, and arrays, with no built-in date or binary-identifier types; BSON extends JSON's model with those extra types and a binary encoding that's efficient for the database to read and scan.",
  },
  {
    id: "mongodb-basics-10",
    question:
      "Which of the following are things plain JSON has no native, dedicated type for, which BSON adds?",
    type: "multi",
    options: [
      "A true Date type distinct from strings or numbers",
      "Nested objects",
      "A dedicated ObjectId type",
      "Arrays of values",
    ],
    correctIndexes: [0, 2],
    explanation:
      "Plain JSON has no dedicated date type (a date must be encoded as a string or a numeric timestamp, losing its type) and no dedicated identifier type like ObjectId; JSON already natively supports nested objects and arrays, which is exactly why BSON documents look 'JSON-like' in the first place.",
  },
  {
    id: "mongodb-basics-11",
    question:
      "You run: db.users.insertOne({ name: 'Sam' }); without an _id field. What happens?",
    type: "single",
    options: [
      "The insert is rejected because _id is required and must always be supplied manually",
      "MongoDB stores the document with _id set to null, and it can never be queried directly by _id",
      "MongoDB assigns _id as a simple auto-incrementing integer, similar to a SQL identity column",
      "MongoDB automatically generates a unique ObjectId and stores it as the document's _id",
    ],
    correctIndexes: [3],
    explanation:
      "Every MongoDB document needs a unique _id within its collection; if you don't supply one, the driver automatically generates a new ObjectId and assigns it before the insert completes.",
  },
  {
    id: "mongodb-basics-12",
    question:
      "An ObjectId is made up of 12 bytes. Which breakdown of those bytes is correct?",
    type: "single",
    options: [
      "A 12-byte purely random value, with no embedded timestamp or counter",
      "A 6-byte timestamp followed by a 6-byte random value, with no counter",
      "A 4-byte creation timestamp, followed by a 5-byte random value, followed by a 3-byte incrementing counter",
      "A 3-byte timestamp, a 4-byte machine identifier, and a 5-byte process ID",
    ],
    correctIndexes: [2],
    explanation:
      "The 12-byte ObjectId is composed of a 4-byte timestamp (seconds since the Unix epoch), a 5-byte random value generated once per process, and a 3-byte incrementing counter, which together make collisions extremely unlikely even under rapid, concurrent inserts.",
  },
  {
    id: "mongodb-basics-13",
    question:
      "How is a 12-byte ObjectId typically represented as text, for example when you view it in mongosh?",
    type: "single",
    options: [
      "As a 12-character string of raw ASCII letters and digits",
      "As a 24-character hexadecimal string, since each byte is rendered as 2 hex characters",
      "As a base64 string exactly 16 characters long",
      "As a plain decimal number, similar to a SQL auto-increment primary key",
    ],
    correctIndexes: [1],
    explanation:
      "Each of the 12 bytes is encoded as 2 hexadecimal characters for display, producing the familiar 24-character hex string such as '507f1f77bcf86cd799439011'.",
  },
  {
    id: "mongodb-basics-14",
    question:
      "Since an ObjectId's first 4 bytes encode a creation timestamp (in seconds), what can you generally say about a set of ObjectIds generated over time?",
    type: "single",
    options: [
      "They are roughly sortable by creation time, since IDs created later tend to sort after IDs created earlier",
      "They increase by exactly 1 for every single document inserted, just like a SQL auto-increment column",
      "They encode creation time down to the microsecond, making them perfectly precise timestamps",
      "Sorting documents by _id provides no information whatsoever about when each was created",
    ],
    correctIndexes: [0],
    explanation:
      "Because the leading bytes are a second-precision timestamp, ObjectIds trend upward over time, giving them rough chronological sortability; however, they are not guaranteed to increment by exactly 1, and multiple ObjectIds created within the same second aren't distinguished by sub-second precision.",
  },
  {
    id: "mongodb-basics-15",
    question:
      "Which of the following are valid MongoDB (BSON) data types that a document's field can hold?",
    type: "multi",
    options: ["Date", "Embedded Document", "Foreign Key", "ObjectId"],
    correctIndexes: [0, 1, 3],
    explanation:
      "BSON supports types including String, Number, Boolean, Date, Array, an embedded Document, Null, and ObjectId; 'foreign key' is a relational database concept enforced through constraints and joins, not a BSON data type.",
  },
  {
    id: "mongodb-basics-16",
    question:
      "What best describes the relationship between mongosh, a language driver (e.g. the Node.js driver), and MongoDB Compass?",
    type: "single",
    options: [
      "They are three names for the exact same tool; only the branding differs across operating systems",
      "mongosh is a database server, while drivers and Compass are both types of MongoDB storage engines",
      "mongosh is an interactive shell for running commands, drivers are libraries that let applications talk to MongoDB in code, and Compass is a graphical desktop client for browsing and querying data",
      "Compass is required before installing MongoDB, while mongosh and drivers only work after Compass has generated a schema",
    ],
    correctIndexes: [2],
    explanation:
      "mongosh is the command-line shell for ad hoc commands and scripting, drivers are per-language libraries (Node.js, Python, etc.) that applications use to connect and issue operations programmatically, and Compass is a GUI application for visually exploring collections, running queries, and inspecting indexes — three different ways to interact with the same underlying database.",
  },
];
