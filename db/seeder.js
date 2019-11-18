const { db } = require("./db");

db.one(
  "INSERT INTO users(name,email,role,password) VALUES($1, $2, $3,$4) RETURNING *",
  [
    "Super Admin",
    "admin@team.com",
    1,
    "$2b$10$YiH3X3emeMoPzStyUDIF5eCJQwXNv/8oqlmepRFdoHYu5D5vYe2N6"
  ]
)
  .then(data => {
    console.log("Admin account successfully created");
  })
  .catch(error => {
    console.log(error);
  });

db.one(
  "INSERT INTO users(name,email,role,password) VALUES($1, $2, $3,$4) RETURNING *",
  [
    "Test Employee",
    "employee1@team.com",
    2,
    "$2b$10$YiH3X3emeMoPzStyUDIF5eCJQwXNv/8oqlmepRFdoHYu5D5vYe2N6"
  ]
)
  .then(data => {
    console.log("Employee account successfully created");
  })
  .catch(error => {
    console.log(error);
  });
