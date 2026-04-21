-- create the table for locations
-- DROP TABLE IF EXISTS locations;

CREATE TABLE locations (
                           id INTEGER PRIMARY KEY AUTOINCREMENT,
                           title TEXT NOT NULL,
                           name TEXT NOT NULL,
                           address TEXT NOT NULL,
                           time TEXT,
                           image TEXT,
                           description TEXT
);

-- create table for rsvps
CREATE TABLE rsvps (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        email TEXT NOT NULL UNIQUE,
                        people INTEGER NOT NULL
);

-- create table for registry
CREATE TABLE registry (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL
);

-- create table of registry items array
CREATE TABLE registry_items (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        value TEXT,
                        FOREIGN KEY (id) REFERENCES registry(id)
);