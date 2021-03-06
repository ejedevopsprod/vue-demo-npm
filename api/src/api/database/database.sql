CREATE DATABASE IF NOT EXISTS profuturo_salon_del_cliente;

USE profuturo_salon_del_cliente;

CREATE TABLE IF NOT EXISTS users (
    `user_id` INTEGER UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `user_name` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `emp_number` INTEGER NOT NULL,
    `role` INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS players (
    `player_id` INTEGER UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `total_score` INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS admins (
    `admin_id` INTEGER UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `password` VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS worlds (
    `world_id` INTEGER UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `player_id` INTEGER UNSIGNED NOT NULL,
    `type` INTEGER UNSIGNED NOT NULL,
    `score` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `time` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `active` BIT NOT NULL DEFAULT 0,
    FOREIGN KEY (player_id) REFERENCES players(player_id)
);
