
\c matcha

CREATE TABLE "User" (
  id SERIAL PRIMARY KEY NOT NULL,
  username varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  birth_date date,
  last_sign_in date,
  latitude decimal,
  longitude decimal,
  gender char(1),
  sexual_orientation char(1),
  online boolean,
  biography text,
  score INT NOT NULL,
  first_name varchar(255),
  last_name varchar(255),
  activated boolean NOT NULL
);

CREATE TABLE "Interest" (
  id SERIAL PRIMARY KEY NOT NULL,
  name varchar(255) NOT NULL
);

CREATE TABLE "Photo" (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  path varchar(255) NOT NULL
);

CREATE TABLE "Interest_User" (
  user_id INT NOT NULL,
  interest_id INT NOT NULL,
  PRIMARY KEY (user_id, interest_id)
);

CREATE TABLE "Blocked_user" (
  blocker_id INT NOT NULL,
  blocked_id INT NOT NULL,
  PRIMARY KEY (blocker_id, blocked_id)
);

CREATE TABLE "Liked_user" (
  liker_id INT NOT NULL,
  liked_id INT NOT NULL,
  PRIMARY KEY (liker_id, liked_id)
);

CREATE TABLE "Viewed_user" (
  viewer_id INT NOT NULL,
  viewed_id INT NOT NULL,
  PRIMARY KEY (viewer_id, viewed_id),
  "date" date NOT NULL
);

CREATE TABLE "Matched_user" (
  user1_id INT NOT NULL,
  user2_id INT NOT NULL,
  PRIMARY KEY (user1_id, user2_id)
);

CREATE TABLE "Reported_user" (
  reporter_id INT NOT NULL,
  reported_id INT NOT NULL,
  PRIMARY KEY (reporter_id, reported_id)
);

CREATE TABLE "Message" (
  from_id INT NOT NULL,
  to_id INT NOT NULL,
  "date" date NOT NULL,
  PRIMARY KEY (from_id, to_id)
);