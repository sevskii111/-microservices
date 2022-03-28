CREATE DATABASE IF NOT EXISTS auth;

USE auth;

CREATE TABLE IF NOT EXISTS users(  
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    hashed_password CHAR(60) NOT NULL,
    created DATETIME NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,

    CONSTRAINT users_uc_username UNIQUE (username)
);

CREATE TABLE IF NOT EXISTS refresh_tokens(  
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    token CHAR(36) NOT NULL,
    expires DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT IGNORE INTO users (username, hashed_password, is_admin, created) 
VALUES('admin', '$2a$12$MRU3.FHuiCU6lQcpUg90XuzINUZZW9GVYaQLsfRl6ANC26GnR71.W', true, UTC_TIMESTAMP());
-- Pasword: admin-password

CREATE DATABASE IF NOT EXISTS goods;

USE goods;

CREATE TABLE IF NOT EXISTS goods(  
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    in_stock BOOLEAN NOT NULL,
    created DATETIME NOT NULL
);