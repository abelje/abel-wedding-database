-- create the table for locations
CREATE TABLE locations (
                           id INTEGER PRIMARY KEY AUTOINCREMENT,
                           name TEXT NOT NULL,
                           address TEXT NOT NULL,
                           description TEXT,
                           hours TEXT
);