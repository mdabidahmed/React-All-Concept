import type { QuizQuestion } from "../../types/quiz";

export const mongodbAdvancedAdminQuestions: QuizQuestion[] = [
  {
    id: "mongodb-advanced-admin-1",
    question:
      "What guarantee does a MongoDB multi-document transaction provide?",
    type: "single",
    options: [
      "All the operations in the transaction either fully succeed together, or none of them are applied at all, an all-or-nothing atomic unit across multiple documents (and even multiple collections)",
      "Each operation in the transaction is applied independently, so some can succeed while others fail without affecting the rest",
      "Transactions guarantee that operations run faster than they would outside a transaction",
      "Transactions only work within a single document and cannot span multiple documents or collections",
    ],
    correctIndexes: [0],
    explanation:
      "MongoDB transactions provide ACID guarantees across multiple documents and collections: every operation inside the transaction commits together, or if anything fails, the entire transaction is rolled back as if none of it happened.",
  },
  {
    id: "mongodb-advanced-admin-2",
    question:
      "What is the correct general pattern for running a multi-document transaction in the MongoDB Node.js driver or Mongoose?",
    type: "single",
    options: [
      "Start a session, call session.startTransaction(), perform the operations passing the session, then call session.commitTransaction() on success or session.abortTransaction() if something fails",
      "Wrap the operations in a try/catch block; MongoDB automatically detects related writes and treats them as a transaction with no extra API calls needed",
      "Call db.beginTransaction() once at server startup, and every write afterward is automatically transactional for the app's lifetime",
      "Transactions in MongoDB don't use sessions; each operation simply accepts a { transactional: true } option",
    ],
    correctIndexes: [0],
    explanation:
      "MongoDB transactions are session-based: you open a client session, start a transaction on it, pass that session into every operation that should be part of the transaction, and then explicitly commit or abort it based on whether everything succeeded.",
  },
  {
    id: "mongodb-advanced-admin-3",
    question:
      "An app needs to transfer 'points' from one user's document to another user's document (decrement one, increment the other). A different, single-collection feature just needs to atomically increment a 'views' counter on one document. Which statement is accurate?",
    type: "single",
    options: [
      "The points transfer genuinely needs a multi-document transaction, since it changes two separate documents that must succeed or fail together; the counter increment doesn't need a transaction because a single update like $inc is already atomic on its own",
      "Both operations require a full multi-document transaction, because MongoDB never guarantees atomicity for any single update",
      "Neither operation needs a transaction, because MongoDB documents are never atomic under any circumstances",
      "The counter increment needs a transaction, but the points transfer between two documents does not",
    ],
    correctIndexes: [0],
    explanation:
      "A single update to one document, such as using $inc, is already atomic in MongoDB without any extra work. Transactions exist for cases like the points transfer, where multiple separate documents must change together consistently; reaching for a transaction when a single atomic update would do just adds unnecessary overhead.",
  },
  {
    id: "mongodb-advanced-admin-4",
    question: "What is a MongoDB replica set?",
    type: "single",
    options: [
      "A group of mongod servers that maintain the same data set, consisting of one primary node that accepts writes and multiple secondary nodes that replicate data from it",
      "A single server that stores multiple independent, unrelated databases",
      "A backup file format used by mongodump to store collection snapshots",
      "A feature that automatically splits one large collection across several servers",
    ],
    correctIndexes: [0],
    explanation:
      "A replica set is a cluster of mongod instances holding copies of the same data: one primary handles all writes, and secondaries continuously replicate the primary's oplog to stay in sync, ready to take over if needed.",
  },
  {
    id: "mongodb-advanced-admin-5",
    question:
      "In a 3-node replica set, the primary node suddenly crashes. What happens next?",
    type: "single",
    options: [
      "The remaining nodes hold an election among themselves and automatically promote one of the secondaries to become the new primary, typically within seconds",
      "The entire replica set becomes permanently read-only until an administrator manually designates a new primary",
      "All data in the replica set is immediately lost, since only the primary held the actual data",
      "The two remaining secondaries continue operating as two independent primaries at the same time",
    ],
    correctIndexes: [0],
    explanation:
      "Replica sets support automatic failover: when the primary becomes unreachable, the remaining eligible members hold an election and promote one secondary to primary, restoring write availability without manual intervention (though clients may see a brief interruption during the election).",
  },
  {
    id: "mongodb-advanced-admin-6",
    question:
      "Which of the following are genuine benefits of running MongoDB as a replica set?",
    type: "multi",
    options: [
      "High availability, since a secondary is automatically elected to take over if the primary fails",
      "The ability to distribute read queries across secondaries to spread out read load",
      "Horizontal write scaling, since every secondary can also accept writes at the same time as the primary",
      "Guaranteed protection against accidental data loss, since a command like deleteMany({}) run on the primary requires separate manual approval on every secondary before it takes effect",
    ],
    correctIndexes: [0, 1],
    explanation:
      "Replica sets provide high availability through automatic failover and can offload read traffic to secondaries. They do NOT provide write scaling, since only the primary accepts writes, and they don't protect against mistakes like an accidental deleteMany({}), because that operation replicates to every secondary just like any other write.",
  },
  {
    id: "mongodb-advanced-admin-7",
    question: "What problem does MongoDB sharding solve?",
    type: "single",
    options: [
      "It scales a database horizontally by partitioning a collection's data across multiple servers (shards), so no single server needs to hold or serve the entire data set",
      "It creates automatic backups of a collection on a fixed schedule",
      "It encrypts documents at rest so they can't be read without a decryption key",
      "It converts a single MongoDB server into a replica set with automatic failover",
    ],
    correctIndexes: [0],
    explanation:
      "Sharding is MongoDB's horizontal scaling strategy: a large collection is partitioned across multiple shards (each of which can itself be a replica set), letting the cluster handle data sets and workloads far bigger than any one server could manage alone.",
  },
  {
    id: "mongodb-advanced-admin-8",
    question:
      "Why is choosing a shard key considered one of the highest-stakes decisions when setting up a sharded MongoDB cluster?",
    type: "single",
    options: [
      "The shard key determines how data is distributed across shards, and changing it later on an already-sharded, populated collection is difficult and disruptive; a poor choice can create unevenly loaded 'hot' shards that are hard to fix after the fact",
      "The shard key can be freely changed at any time with a single command and has no real long-term consequences",
      "The shard key only affects how documents are displayed in query results, not how data is physically stored",
      "MongoDB automatically picks the optimal shard key, so developers never need to choose one",
    ],
    correctIndexes: [0],
    explanation:
      "The shard key controls how MongoDB routes and distributes documents across shards. A poorly chosen key (for example one with low cardinality or a monotonically increasing value) can create unevenly loaded 'hot' shards, and reworking the shard key on an existing large collection is a major, disruptive undertaking, making this a decision worth getting right upfront.",
  },
  {
    id: "mongodb-advanced-admin-9",
    question:
      "A small internal app has a few thousand documents in its main collection and runs comfortably on one modest server. Is this a good candidate for sharding?",
    type: "single",
    options: [
      "No, sharding adds real operational complexity (config servers, mongos routers, shard key management) and is meant for data sets or workloads too large for a single server; a small collection like this doesn't need it and would just add overhead",
      "Yes, sharding should be enabled on every MongoDB collection from day one, regardless of size, since it's free to set up",
      "No, sharding is only available with MongoDB Atlas and can never be used on self-hosted MongoDB",
      "Yes, sharding is required as soon as a replica set is introduced, even for tiny collections",
    ],
    correctIndexes: [0],
    explanation:
      "Sharding exists to handle data volumes or throughput that outgrow a single server (or replica set). Introducing it prematurely for a small collection adds unnecessary architectural complexity without a corresponding benefit; most apps should scale vertically or rely on a replica set long before they need to shard.",
  },
  {
    id: "mongodb-advanced-admin-10",
    question:
      "Which of the following statements about MongoDB backup and restore are accurate?",
    type: "multi",
    options: [
      "mongodump creates a binary export of a database (or collection), and mongorestore loads that exported data back into a MongoDB server",
      "Running a replica set means you no longer need separate backups, since the data already exists on multiple secondary nodes",
      "An accidental command like db.users.deleteMany({}) run against the primary will replicate to every secondary too, so replication alone would not have protected that data",
      "Regular backups, such as with mongodump or a managed provider's automated snapshots, protect against scenarios that replication cannot, like human error, application bugs, or logical corruption",
    ],
    correctIndexes: [0, 2, 3],
    explanation:
      "mongodump/mongorestore are the standard command-line backup and restore tools. Replication protects against hardware failure by keeping copies on multiple servers, but it faithfully copies every write, including a disastrous deleteMany({}), to all secondaries, so it is not a substitute for real backups that guard against human error or bugs.",
  },
  {
    id: "mongodb-advanced-admin-11",
    question:
      "A developer installs MongoDB locally for a side project and starts it with the default configuration. What's true about access control out of the box?",
    type: "single",
    options: [
      "Authentication is disabled by default on a fresh local install; anyone who can reach the port can connect and read or write all data without a username or password, until access control is explicitly enabled",
      "MongoDB automatically creates a random admin password on first startup and prints it to the console",
      "MongoDB refuses to start at all until at least one user account has been created",
      "MongoDB enables full role-based access control by default, and a username and password are always required to connect",
    ],
    correctIndexes: [0],
    explanation:
      "By default, a fresh local MongoDB instance has no authentication enabled, so anyone able to reach the port can connect with full read and write access. This is a common real-world mistake when instances are exposed beyond localhost without explicitly turning on access control (--auth) and creating users first.",
  },
  {
    id: "mongodb-advanced-admin-12",
    question: "Which of the following are recommended MongoDB security practices?",
    type: "multi",
    options: [
      "Role-based access control (RBAC), granting each user or application only the roles and permissions they actually need",
      "Network-level protection such as an IP allowlist or a private network, so only trusted hosts can even reach the database port",
      "Encrypting data both in transit (for example TLS/SSL connections) and at rest with encrypted storage",
      "Sharing a single admin-level username and password across every application and developer, since rotating credentials becomes unnecessary once encryption is enabled",
    ],
    correctIndexes: [0, 1, 2],
    explanation:
      "RBAC, network allowlisting, and encryption in transit and at rest are core layers of MongoDB security. Sharing one admin credential everywhere is the opposite of good practice; it removes accountability and means one leak compromises everything, regardless of whether encryption is also in place.",
  },
  {
    id: "mongodb-advanced-admin-13",
    question:
      "What is MongoDB Atlas, and why do many teams choose it over self-hosting MongoDB?",
    type: "single",
    options: [
      "It's MongoDB's official fully managed cloud database service, which handles provisioning, patching, backups, and scaling (and offers a free tier), so teams avoid the operational burden of running MongoDB themselves",
      "It's a free, open-source alternative to MongoDB with a completely different query language",
      "It's a GUI desktop application for writing MongoDB queries, with no connection to cloud hosting",
      "It's a required license key that must be purchased before any version of MongoDB can be installed anywhere",
    ],
    correctIndexes: [0],
    explanation:
      "MongoDB Atlas is the official managed Database-as-a-Service offering from MongoDB Inc. It handles infrastructure concerns like provisioning, patching, monitoring, and backups, and includes a free tier for small projects, which is why many teams prefer it over operating and maintaining their own MongoDB servers.",
  },
  {
    id: "mongodb-advanced-admin-14",
    question:
      "An Atlas connection string looks like mongodb+srv://dbUser:dbPass@cluster0.ab1cd.mongodb.net/myApp. What does the '+srv' part signify?",
    type: "single",
    options: [
      "It tells the driver to look up the cluster's actual list of hosts via a DNS SRV record, so every individual server and port doesn't need to be listed manually in the connection string",
      "It means the connection will automatically use an unencrypted, non-TLS connection for faster performance",
      "It's a required flag that enables sharding on whichever database is specified at the end of the string",
      "It has no real function and is purely cosmetic, left over from older versions of MongoDB",
    ],
    correctIndexes: [0],
    explanation:
      "The 'mongodb+srv://' scheme tells the driver to resolve the actual replica set members through a DNS SRV lookup instead of listing each host and port explicitly, which is why Atlas connection strings look shorter than a plain 'mongodb://' string with multiple hosts.",
  },
];
