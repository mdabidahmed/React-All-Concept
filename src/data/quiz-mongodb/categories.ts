import type { QuizCategoryMeta } from "../../types/quiz";

export const mongodbQuizCategoryMeta: QuizCategoryMeta[] = [
  {
    id: "mongodb-basics",
    title: "MongoDB Basics",
    description: "Documents, collections, BSON, ObjectId, and data types.",
  },
  {
    id: "mongodb-create-read",
    title: "Create & Read",
    description: "insertOne/insertMany, find(), query operators, and projection.",
  },
  {
    id: "mongodb-update-delete",
    title: "Update & Delete",
    description: "updateOne/updateMany, update operators, and deleting documents.",
  },
  {
    id: "mongodb-schema-design",
    title: "Schema Design & Data Modeling",
    description: "Schema-less design, embedding vs. referencing, and validation.",
  },
  {
    id: "mongodb-indexes-performance",
    title: "Indexes & Performance",
    description: "Creating indexes, compound and unique indexes, and explain().",
  },
  {
    id: "mongodb-aggregation",
    title: "Aggregation Framework",
    description: "The aggregation pipeline: $match, $group, $project, and $lookup.",
  },
  {
    id: "mongodb-mongoose-node",
    title: "Mongoose & Node Integration",
    description: "Schemas, models, CRUD, validation, and middleware with Mongoose.",
  },
  {
    id: "mongodb-advanced-admin",
    title: "Advanced & Administration",
    description: "Transactions, replication, sharding, security, and Atlas.",
  },
];
