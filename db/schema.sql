DROP DATABASE IF EXISTS burgers_db;

CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers (
  id INT AUTO_INCREMENT NOT NULL,
  burger_name VARCHAR(255),
  devoured BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
);

INSERT INTO burgers (burger_name) VALUES ("Burger1"); 
INSERT INTO burgers (burger_name) VALUES ("Burger2"); 
INSERT INTO burgers (burger_name) VALUES ("Burger3"); 
