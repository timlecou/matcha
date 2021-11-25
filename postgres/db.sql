
\c matcha

CREATE TABLE "User" (
  id SERIAL PRIMARY KEY NOT NULL,
  username varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  birth_date date NOT NULL,
  last_sign_in date NOT NULL,
  latitude decimal NOT NULL,
  longitude decimal NOT NULL,
  gender char(1) NOT NULL,
  sexual_orientation char(1) NOT NULL,
  online boolean NOT NULL,
  biography text NOT NULL,
  score INT NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  activated boolean NOT NULL
);