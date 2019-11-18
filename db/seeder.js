const { db } = require("./db");
const bcrypt = require("bcrypt");

let password = "password";
bcrypt.hash(password, 10).then(hash => {
  db.one(
    "INSERT INTO users(name,email,password,role) VALUES($1, $2, $3, $4) RETURNING id,name,email,created_at",
    ["Super Admin", "admin@mail.com", hash, 1]
  )
    .then(data => {
      console.log("Admin account successfully created");
    })
    .catch(error => {
      console.log(error);
    });
});

bcrypt.hash(password, 10).then(hash => {
  db.one(
    "INSERT INTO users(name,email,password,role) VALUES($1, $2, $3, $4) RETURNING id,name,email,created_at",
    ["Test Employee", "test@mail.com", hash, 2]
  )
    .then(data => {
      console.log("Employee account successfully created");
    })
    .catch(error => {
      console.log(error);
    });
});

db.one("INSERT INTO categories(name) VALUES($1) RETURNING id,name,created_at", [
  "Default"
])
  .then(data => {
    console.log("Category successfully created");
  })
  .catch(error => {
    console.log(error);
  });

db.one(
  "INSERT INTO articles(user_id,category_id,title,body) VALUES($1, $2, $3, $4) RETURNING *",
  [2, 1, "Test Article", "This is a short test post"]
)
  .then(data => {
    console.log("Article successfully posted");
  })
  .catch(error => {
    console.log(error);
  });

db.one(
  "INSERT INTO gifs(user_id,title,image_url) VALUES($1, $2, $3, $4) RETURNING *",
  [
    2,
    "Test Gif",
    " http://res.cloudinary.com/makos24/image/upload/v1574060935/teamwork/hjvv8gw9dlaeeqaeofcv.png"
  ]
)
  .then(data => {
    console.log("Gif successfully posted");
  })
  .catch(error => {
    console.log(error);
  });
