const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "myDatabase.db");
const db = new Database(dbPath);
db.pragma("foreign_keys = ON");

// create the db if it doesn't exist
// db.exec(`
//     CREATE TABLE IF NOT EXISTS locations (
//                                id INTEGER PRIMARY KEY AUTOINCREMENT,
//                                title TEXT NOT NULL,
//                                name TEXT NOT NULL,
//                                address TEXT NOT NULL,
//                                time TEXT NOT NULL,
//                                description TEXT,
//
//     );

// `);

// db.exec(`
//     CREATE TABLE IF NOT EXISTS responses (
//
//     );
// `)

module.exports = db;
