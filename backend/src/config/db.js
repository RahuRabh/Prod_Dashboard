const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "../../factory.db");

const db = new Database(dbPath);

db.pragma("foreign_keys = ON");

console.log("✅ SQLite connected");

module.exports = db;