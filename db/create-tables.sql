-- create the table for locations
CREATE TABLE locations (
                           id INTEGER PRIMARY KEY AUTOINCREMENT,
                           name TEXT NOT NULL,
                           address TEXT NOT NULL,
                           description TEXT,
                           hours TEXT
);

-- create table for rsvps
CREATE TABLE rsvps (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        email TEXT NOT NULL UNIQUE,
                        people INTEGER NOT NULL
)