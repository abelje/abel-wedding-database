const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "myDatabase.db");
const db = new Database(dbPath);
db.pragma("foreign_keys = ON");

// create the db if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS rsvps (
                                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                                 email TEXT NOT NULL UNIQUE,
                                 people INTEGER NOT NULL
    );

 `);

module.exports = db;
