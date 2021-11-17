var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:password@website-db:5432");

db.one("SELECT $1 AS value", 42)
    .then(function (data) {
        console.log("DATA:", data.value);
    })
    .catch(function (error) {
        console.log("ERROR:", error);
});

console.log(db.any.name)