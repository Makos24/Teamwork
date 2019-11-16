const initOptions = {
  // initialization options;
};

const pgp = require("pg-promise")(initOptions);

let cn = "";

if (process.env.DATABASE_URL) {
  cn = process.env.DATABASE_URL;
} else {
  cn = "postgres://me:password@localhost:5432/testdb";
  //cn = "postgres://postgres@localhost/testdb";
}

//console.log(cn);
const db = pgp(cn);

module.exports = {
  pgp,
  db
};
