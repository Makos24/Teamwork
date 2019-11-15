const express = require("express");
// const pgp = require("pg-promise")(/* options */);
// const db = pgp("postgres://me:password@localhost:5432/teamwork");

const bodyParser = require("body-parser");
const path = require("path");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const categoryRouter = require("./routes/category");
const gifRouter = require("./routes/gif");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get("/", function(req, res) {
  res.status(200).send({ status: "success", message: "Welcome to Teamwork!" });
});

// app.get("/insert", function(req, res) {
//   db.one(
//     "INSERT INTO users(name,email,password,role) VALUES($1, $2, $3, $4) RETURNING id",
//     ["John Doe", "email@test.com", "password", 1]
//   )
//     .then(data => {
//       console.log(data); // print new user id;
//     })
//     .catch(error => {
//       console.log("ERROR:", error); // print error;
//     });
//   res.send("Hello World!");
// });

app.use("/api/v1/", userRouter);
app.use("/api/v1/", postRouter);
app.use("/api/v1/", categoryRouter);
app.use("/api/v1/", gifRouter);

module.exports = app;
