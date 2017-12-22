-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS user_profiles;
--
-- -- db name: roadtripdb
--
-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     firstname VARCHAR(255) NOT NULL,
--     lastname VARCHAR(255) NOT NULL,
--     email_address VARCHAR(255) NOT NULL UNIQUE,
--     gender VARCHAR(255),
--     image VARCHAR(255),
--     password TEXT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
--
-- CREATE TABLE user_profiles (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES users(id),
--     bio TEXT,
--     age SMALLINT,
--     city VARCHAR(255),
--     latlng TEXT,
--     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP
-- );

DROP TABLE IF EXISTS user_profiles;
DROP TABLE IF EXISTS users;


-- db name: roadtripdb
CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    age SMALLINT,
    city VARCHAR(255),
    lat TEXT,
    lng TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email_address VARCHAR(255) NOT NULL UNIQUE,
    gender VARCHAR(255),
    image VARCHAR(255),
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chat (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id),
    recipient_id INTEGER REFERENCES users(id),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
