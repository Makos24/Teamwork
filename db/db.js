const initOptions = {
  // initialization options;
};

const pgp = require("pg-promise")(initOptions);

let cn = "";

if (process.env.NODE_ENV == "test") {
  cn = "postgres://postgres@localhost/testdb";
} else {
  //cn = "postgres://postgres@localhost/testdb";
}

const db = pgp(cn);

module.exports = {
  pgp,
  db
};
