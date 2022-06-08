\c matcha

CREATE TABLE "User" (
  id SERIAL PRIMARY KEY NOT NULL,
  username varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  birth_date date,
  last_sign_in date,
  location point NOT NULL,
  gender char(1),
  sexual_orientation char(1),
  online boolean,
  biography text,
  score INT NOT NULL,
  first_name varchar(255),
  last_name varchar(255),
  activated boolean NOT NULL,
  activation_token varchar(255),
  reset_password_token varchar(255)
);

CREATE TABLE "Interest" (
  id SERIAL PRIMARY KEY NOT NULL,
  name varchar(255) NOT NULL
);

CREATE TABLE "Photo" (
  id SERIAL PRIMARY KEY NOT NULL,
  path varchar(255) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES "User"(id)
);

CREATE TABLE "Interest_User" (
  user_id INT NOT NULL,
  interest_id INT NOT NULL,
  PRIMARY KEY (user_id, interest_id)
);

CREATE TABLE "Blocked_user" (
  blocker_id INT NOT NULL,
  blocked_id INT NOT NULL,
  FOREIGN KEY (blocker_id) REFERENCES "User"(id),
  FOREIGN KEY (blocked_id) REFERENCES "User"(id)
);

CREATE TABLE "Liked_user" (
  liker_id INT NOT NULL,
  liked_id INT NOT NULL,
  FOREIGN KEY (liker_id) REFERENCES "User"(id),
  FOREIGN KEY (liked_id) REFERENCES "User"(id)
);

CREATE TABLE "Viewed_user" (
  viewer_id INT NOT NULL,
  viewed_id INT NOT NULL,
  FOREIGN KEY (viewer_id) REFERENCES "User"(id),
  FOREIGN KEY (viewed_id) REFERENCES "User"(id),
  "date" date NOT NULL
);

CREATE TABLE "Matched_user" (
  id SERIAL PRIMARY KEY NOT NULL,
  user1_id INT NOT NULL,
  user2_id INT NOT NULL,
  FOREIGN KEY (user1_id) REFERENCES "User"(id),
  FOREIGN KEY (user2_id) REFERENCES "User"(id)
);

CREATE TABLE "Reported_user" (
  reporter_id INT NOT NULL,
  reported_id INT NOT NULL,
  FOREIGN KEY (reporter_id) REFERENCES "User"(id),
  FOREIGN KEY (reported_id) REFERENCES "User"(id)
);

CREATE TABLE "Message" (
  match_id INT NOT NULL,
  from_id INT NOT NULL,
  to_id INT NOT NULL,
  "date" date NOT NULL,
  message text NOT NULL,
  FOREIGN KEY (from_id) REFERENCES "User"(id),
  FOREIGN KEY (to_id) REFERENCES "User"(id),
  FOREIGN KEY (match_id) REFERENCES "Matched_user"(id)
);