var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://user:mypassword@db:5432/matcha");

// console.log(db.any("SELECT * FROM company").toString())