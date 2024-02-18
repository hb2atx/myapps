DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    email text NOT NULL
);