CREATE DATABASE matcha;

CREATE TABLE "User" (
  id INT PRIMARY KEY NOT NULL,
  username varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  birth_date date NOT NULL,
  last_sign_in date NOT NULL,
  latitude point NOT NULL,
  longitude point NOT NULL,
  gender char(1) NOT NULL,
  sexual_orientation char(1) NOT NULL,
  online tinyint(1) NOT NULL,
  biography text NOT NULL,
  score INT NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  activated tinyint(1) NOT NULL
);