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
    CREATE TABLE IF NOT EXISTS locations (
                                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                                 title TEXT NOT NULL,
                                 name TEXT NOT NULL,
                                 address TEXT NOT NULL,
                                 time TEXT,
                                 image TEXT,
                                 description TEXT
    );
    CREATE TABLE IF NOT EXISTS registry (
                                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                                 name TEXT NOT NULL,
                                 link TEXT NOT NULL
    );
    
 `);

module.exports = db;
