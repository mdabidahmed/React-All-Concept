import type { QuizQuestion } from "../../types/quiz";

export const mongodbMongooseNodeQuestions: QuizQuestion[] = [
  {
    id: "mongodb-mongoose-node-1",
    question:
      "What is Mongoose, in relation to MongoDB and Node.js?",
    type: "single",
    options: [
      "An Object Data Modeling (ODM) library that lets Node.js apps define schemas, validate data, and interact with MongoDB through a model-based API",
      "A standalone NoSQL database that replaces MongoDB entirely",
      "A command-line tool for backing up and restoring MongoDB databases",
      "A cloud hosting service for deploying MongoDB clusters",
    ],
    correctIndexes: [0],
    explanation:
      "Mongoose is an ODM (Object Data Modeling) library for Node.js. It sits on top of MongoDB's native driver and adds schema definitions, built-in validation, and a convenient model-based API, while MongoDB itself remains schema-less underneath.",
  },
  {
    id: "mongodb-mongoose-node-2",
    question:
      "A Node.js app needs to talk to MongoDB. What's the key difference between connecting with the official driver's MongoClient.connect() versus mongoose.connect()?",
    type: "single",
    options: [
      "MongoClient.connect() is a lower-level connection with no schema enforcement, while mongoose.connect() builds on top of the driver and adds schema definitions, validation, and a model-based API",
      "MongoClient.connect() can only be used with MongoDB Atlas, while mongoose.connect() only works with a local MongoDB install",
      "They are two unrelated databases, and switching between them requires migrating all your data",
      "mongoose.connect() is deprecated in favor of MongoClient.connect(), which is now the only supported way to connect",
    ],
    correctIndexes: [0],
    explanation:
      "The official MongoDB Node.js driver (MongoClient) gives you a raw, low-level connection with no schema enforcement, so documents can have any shape. Mongoose wraps that same driver but layers schemas, validation, middleware, and a Model API on top, at the cost of a bit more overhead.",
  },
  {
    id: "mongodb-mongoose-node-3",
    question:
      "What does 'const userSchema = new mongoose.Schema({ name: String, age: Number });' actually do?",
    type: "single",
    options: [
      "It defines the shape and data types a 'user' document should have, but by itself it doesn't create a collection or let you query the database yet",
      "It immediately creates a 'users' collection in the database with those two fields",
      "It inserts a new document with name and age set to their default JavaScript values",
      "It connects to MongoDB using the given field names as connection options",
    ],
    correctIndexes: [0],
    explanation:
      "A Schema only describes the expected shape, types, and rules for documents. It has no link to an actual collection until it's compiled into a Model with mongoose.model(); nothing is created or queried at the Schema step.",
  },
  {
    id: "mongodb-mongoose-node-4",
    question:
      "After defining userSchema, what does 'const User = mongoose.model(\"User\", userSchema);' produce?",
    type: "single",
    options: [
      "A Model, a constructor compiled from the schema that provides methods like find, create, and updateOne for interacting with the corresponding MongoDB collection",
      "A plain JavaScript object containing sample user data for testing",
      "A new database named 'User' inside the current MongoDB server",
      "A duplicate copy of the schema with no additional functionality",
    ],
    correctIndexes: [0],
    explanation:
      "mongoose.model() compiles a schema into a Model: a constructor bound to a specific collection that exposes CRUD methods such as find(), create(), findById(), and more.",
  },
  {
    id: "mongodb-mongoose-node-5",
    question:
      "Given 'mongoose.model(\"User\", userSchema)' with no other options, which MongoDB collection will Mongoose actually read from and write to?",
    type: "single",
    options: [
      "'users', because Mongoose automatically lowercases the model name and pluralizes it to derive the default collection name",
      "'User', the exact model name, unchanged",
      "'userSchema', the name of the schema variable",
      "Mongoose refuses to run until a collection name is explicitly provided",
    ],
    correctIndexes: [0],
    explanation:
      "By convention, Mongoose takes the model name, lowercases it, and pluralizes it to guess the collection name, so 'User' becomes 'users'. This surprises newcomers who expect an exact match; a custom name can be passed as a third argument to mongoose.model() if needed.",
  },
  {
    id: "mongodb-mongoose-node-6",
    question:
      "Which of the following are valid ways to create and save a new document with Mongoose?",
    type: "multi",
    options: [
      "await User.create({ name: 'Sam', age: 25 })",
      "const u = new User({ name: 'Sam', age: 25 }); await u.save();",
      "await User.new({ name: 'Sam', age: 25 })",
      "await User.insertNew({ name: 'Sam', age: 25 })",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Model.create() is a shorthand that builds and saves a document in one call, and it's equivalent to constructing 'new Model(data)' and then calling '.save()' on the instance. 'User.new()' and 'User.insertNew()' are not real Mongoose methods.",
  },
  {
    id: "mongodb-mongoose-node-7",
    question:
      "What's the difference between User.find({ age: 25 }), User.findOne({ age: 25 }), and User.findById(id)?",
    type: "single",
    options: [
      "find() returns an array of all matching documents, findOne() returns just the first matching document (or null), and findById() looks up a single document by its _id field",
      "They are three identical methods that always return the same result for any query",
      "find() and findOne() both require an _id, while findById() accepts any filter object",
      "findById() returns an array, while find() and findOne() return a single document",
    ],
    correctIndexes: [0],
    explanation:
      "find() always resolves to an array (possibly empty), findOne() resolves to a single document or null, and findById() is a convenience method equivalent to findOne({ _id: id }).",
  },
  {
    id: "mongodb-mongoose-node-8",
    question:
      "A developer runs 'const result = await User.findByIdAndUpdate(id, { age: 26 });' and then logs result.age, expecting to see 26. What actually happens?",
    type: "single",
    options: [
      "result.age logs the user's OLD age from before the update, because findByIdAndUpdate returns the pre-update document by default unless the { new: true } option is passed",
      "result.age logs 26, because findByIdAndUpdate always returns the updated document",
      "It throws an error because findByIdAndUpdate cannot update a single field",
      "result is undefined, because findByIdAndUpdate never returns the document",
    ],
    correctIndexes: [0],
    explanation:
      "By default, Mongoose's findByIdAndUpdate (and findOneAndUpdate) return the document as it was BEFORE the update was applied. To get the updated version back, you must pass the option { new: true }.",
  },
  {
    id: "mongodb-mongoose-node-9",
    question:
      "What does 'await User.findByIdAndDelete(id);' do?",
    type: "single",
    options: [
      "Finds the document with the matching _id, removes it from the collection, and resolves with the deleted document (or null if no match was found)",
      "Deletes every document in the 'users' collection regardless of the id passed in",
      "Marks the document as deleted but keeps it in the collection with a 'deleted: true' flag",
      "Only works if no other documents reference the one being deleted",
    ],
    correctIndexes: [0],
    explanation:
      "findByIdAndDelete locates a single document by _id, removes it, and returns the document that was deleted (or null if nothing matched that id). It does not soft-delete or cascade automatically to related documents.",
  },
  {
    id: "mongodb-mongoose-node-10",
    question:
      "Which of the following are built-in validation options you can set directly on a Mongoose schema field?",
    type: "multi",
    options: [
      "required: true",
      "min and max (for numbers)",
      "enum (to restrict a field to a fixed list of values)",
      "unique: true, which guarantees no two documents can ever have conflicting field values purely through document validation",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "required, min/max, and enum are genuine built-in Mongoose validators. 'unique: true' is commonly misunderstood as a validator; it actually just tells Mongoose to build a unique index in MongoDB, and true uniqueness enforcement happens at the database index level, not through document validation.",
  },
  {
    id: "mongodb-mongoose-node-11",
    question:
      "A schema needs to ensure a 'username' field contains no spaces. Which approach correctly adds a custom validator for this?",
    type: "single",
    options: [
      "username: { type: String, validate: { validator: (v) => !v.includes(' '), message: 'Username cannot contain spaces' } }",
      "username: { type: String, noSpaces: true }",
      "username: { type: String, check: 'no-spaces' }",
      "Custom validation isn't possible in Mongoose; only built-in validators like required and enum are supported",
    ],
    correctIndexes: [0],
    explanation:
      "Mongoose lets you attach a custom validator function via the 'validate' property, which receives the field's value and returns true or false (optionally paired with a custom error message) to decide whether the value passes.",
  },
  {
    id: "mongodb-mongoose-node-12",
    question:
      "const user = new User({}); user.name = 'ok-so-far'; -- at this exact point, with a required 'age' field still unset, does Mongoose throw a validation error?",
    type: "single",
    options: [
      "No, because Mongoose validators only run when the document is actually persisted, such as during .save() or .create(); simply assigning or leaving fields unset doesn't trigger validation",
      "Yes, because validation runs immediately on every property assignment, so this line throws right away",
      "Yes, but only for string fields, not for missing required fields",
      "No, because Mongoose never validates documents at all unless .validate() is called manually",
    ],
    correctIndexes: [0],
    explanation:
      "Mongoose validation is deferred: it runs when you call .save(), .create(), or .validate() explicitly, not the moment you set or omit a property. This means an invalid in-memory document can briefly exist before validation is actually checked.",
  },
  {
    id: "mongodb-mongoose-node-13",
    question:
      "Which of the following statements about Mongoose middleware (hooks) are correct?",
    type: "multi",
    options: [
      "schema.pre('save', fn) registers a function that runs before a document is saved to the database",
      "A classic use case for pre('save') is hashing a user's plaintext password before it gets persisted",
      "schema.post('save', fn) runs its function before the save operation begins, exactly like pre('save')",
      "Middleware can only ever be attached to the save operation, and no other Mongoose operations support hooks",
    ],
    correctIndexes: [0, 1],
    explanation:
      "pre('save') hooks run before the save completes, and hashing a password before it's written to the database is the textbook example. post('save') hooks, by contrast, run AFTER the document has been saved, useful for things like sending a welcome email; hooks can also be attached to other operations like remove, updateOne, or find, not just save.",
  },
  {
    id: "mongodb-mongoose-node-14",
    question:
      "A developer writes mongoose.connect('mongodb://admin:Secret123@prod-cluster.example.com:27017/appdb') directly in server.js and pushes it to a public GitHub repository. What's the main problem, and what should be done instead?",
    type: "single",
    options: [
      "The username and password are exposed in plain text in version control; credentials like these should be loaded from environment variables (for example via a .env file that's gitignored), never hardcoded into committed source code",
      "Nothing is wrong; connection strings are safe to commit as long as the port number is included",
      "The problem is that 'mongodb://' should be 'mongodb+srv://' or the connection will always fail",
      "The problem is that '27017' is not a valid MongoDB port, so the connection would fail immediately",
    ],
    correctIndexes: [0],
    explanation:
      "Anyone with read access to the repository (or its history, even after a later 'fix') could see the real database credentials and connect directly to production. Connection strings, especially credentials, belong in environment variables or a secrets manager, not in source code; 'mongodb://user:pass@host:port/dbname' is otherwise a perfectly valid connection string format.",
  },
];
