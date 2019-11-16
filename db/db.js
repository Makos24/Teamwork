const initOptions = {
  // initialization options;
};

const pgp = require("pg-promise")(initOptions);

let cn = "";

if (process.env.NODE_ENV == "test") {
  cn = "postgres://me:password@localhost:5432/testdb";
} else {
  //cn = "postgres://me:password@localhost:5432/testdb";
  cn = "postgres://postgres@localhost/testdb";
}

const db = pgp(cn);

module.exports = {
  pgp,
  db
};
