const fs = require("fs");
const path = require("path");
const db = require("./db");

const initDB = () => {
  const schemaPath = path.join(__dirname, "../models/schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");

  db.exec(schema);
  console.log("Database initialized with schema");
};

module.exports = initDB;
