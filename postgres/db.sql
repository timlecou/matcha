
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

CREATE TABLE "Photo" (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  path varchar(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES "User"(id) ON DELETE CASCADE
);

CREATE TABLE "Interest_User" (
  user_id INT NOT NULL,
  interest_id INT NOT NULL,
  PRIMARY KEY (user_id, interest_id),
  FOREIGN KEY (user_id) REFERENCES "User"(id) ON UPDATE CASCADE,
  FOREIGN KEY (interest_id) REFERENCES "Interest"(id) ON UPDATE CASCADE
);

CREATE TABLE "Blocked_user" (
  blocker_id INT NOT NULL,
  blocked_id INT NOT NULL,
  PRIMARY KEY (blocker_id, blocked_id),
  FOREIGN KEY (blocker_id) REFERENCES "User"(id) ON UPDATE CASCADE,
  FOREIGN KEY (blocked_id) REFERENCES "User"(id) ON UPDATE CASCADE
);

CREATE TABLE "Liked_user" (
  liker_id INT NOT NULL,
  liked_id INT NOT NULL,
  PRIMARY KEY (liker_id, liked_id),
  FOREIGN KEY (liker_id) REFERENCES "User"(id) ON UPDATE CASCADE,
  FOREIGN KEY (liked_id) REFERENCES "User"(id) ON UPDATE CASCADE
);

CREATE TABLE "Viewed_user" (
  viewer_id INT NOT NULL,
  viewed_id INT NOT NULL,
  PRIMARY KEY (viewer_id, viewed_id),
  FOREIGN KEY (viewer_id) REFERENCES "User"(id) ON UPDATE CASCADE,
  FOREIGN KEY (viewed_id) REFERENCES "User"(id) ON UPDATE CASCADE
);

CREATE TABLE "Matched_user" (
  user1_id INT NOT NULL,
  user2_id INT NOT NULL,
  PRIMARY KEY (user1_id, user2_id),
  FOREIGN KEY (user1_id) REFERENCES "User"(id) ON UPDATE CASCADE,
  FOREIGN KEY (user2_id) REFERENCES "User"(id) ON UPDATE CASCADE
);

CREATE TABLE "Reported_user" (
  reporter_id INT NOT NULL,
  reported_id INT NOT NULL,
  PRIMARY KEY (reporter_id, reported_id),
  FOREIGN KEY (reporter_id) REFERENCES "User"(id) ON UPDATE CASCADE,
  FOREIGN KEY (reported_id) REFERENCES "User"(id) ON UPDATE CASCADE
);

CREATE TABLE "Message" (
  from_id INT NOT NULL,
  to_id INT NOT NULL,
  "date" date NOT NULL,
  PRIMARY KEY (from_id, to_id),
  FOREIGN KEY (from_id) REFERENCES "User"(id) ON UPDATE CASCADE,
  FOREIGN KEY (to_id) REFERENCES "User"(id) ON UPDATE CASCADE
);