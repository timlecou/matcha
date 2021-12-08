
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

CREATE TABLE "Interest" (
  id SERIAL PRIMARY KEY NOT NULL,
  name varchar(255) NOT NULL
);

CREATE TABLE "Interests_Users" (
  user_id INT NOT NULL,
  interest_id INT NOT NULL,
  PRIMARY KEY (user_id, interest_id),
  FOREIGN KEY (user_id) REFERENCES "User"(id) ON UPDATE CASCADE,
  FOREIGN KEY (interest_id) REFERENCES "Interest"(id) ON UPDATE CASCADE
);

CREATE TABLE "Photo" (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  path varchar(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES "User"(id) ON DELETE CASCADE
);

CREATE TABLE "Liked_users" (
  id SERIAL PRIMARY KEY NOT NULL,
  user_liked_id INT NOT NULL,
  user_liker_id INT NOT NULL
);

CREATE TABLE "Viewed_users" (
  id SERIAL PRIMARY KEY NOT NULL,
  user_viewed_id INT NOT NULL,
  user_viewer_id INT NOT NULL
);

CREATE TABLE "Matched_user" (
  id SERIAL PRIMARY KEY NOT NULL,
  user1_id INT NOT NULL,
  user2_id INT NOT NULL
);

CREATE TABLE "Reported_user" (
  id SERIAL PRIMARY KEY NOT NULL,
  author_id INT NOT NULL,
  victim_id INT NOT NULL
);

CREATE TABLE "Blocked_user" (
  id SERIAL PRIMARY KEY NOT NULL,
  user1_id INT NOT NULL,
  user2_id INT NOT NULL
);

CREATE TABLE "Message" (
  id SERIAL PRIMARY KEY NOT NULL,
  from_id INT NOT NULL,
  to_id INT NOT NULL,
  "date" date NOT NULL
);