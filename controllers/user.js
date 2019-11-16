const { db } = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = (request, response) => {
  db.any("SELECT name, email, role, created_at FROM users ORDER BY id ASC")
    .then(function(data) {
      response.status(200).send({ status: "success", data: data });
    })
    .catch(function(error) {
      response.status(500).send({ status: "error", error: error });
    });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  db.one("SELECT id, name, email, created_at FROM users WHERE id = $1", id)
    .then(data => {
      response.status(200).send({
        status: "success",
        data: {
          userId: data.id,
          createdOn: data.created_at,
          name: data.name,
          email: data.email
        }
      });
    })
    .catch(error => {
      response.status(500).send({ status: "error", error: error });
    });
};

const createUser = (request, response) => {
  const { name, email, password, role } = request.body;

  // response.status(200).send(request.body);

  bcrypt
    .hash(password, 10)
    .then(hash => {
      db.one(
        "INSERT INTO users(name,email,password,role) VALUES($1, $2, $3, $4) RETURNING id,name,email,created_at",
        [name, email, hash, role]
      )
        .then(data => {
          response.status(201).send({
            status: "success",
            data: {
              message: "User successfully created",
              userId: data.id,
              createdOn: data.created_at,
              name: data.name,
              email: data.email
            }
          });
        })
        .catch(error => {
          response.status(500).send({ status: "error", error: error });
        });
    })
    .catch(error => {
      response.status(500).send({ status: "error", error: error });
    });
};

const loginUser = (request, response) => {
  const { email, password } = request.body;

  db.one("SELECT * FROM users WHERE email = $1", email)
    .then(user => {
      if (!user) {
        return response
          .status(401)
          .send({ status: "error", error: "User not found" });
      }
      bcrypt
        .compare(password, user.password)
        .then(valid => {
          if (!valid) {
            return response
              .status(401)
              .send({ status: "error", error: "Incorrect password" });
          }
          const token = jwt.sign(
            { userId: user.id, role: user.role },
            "RANDOM_SECRET",
            {
              expiresIn: "24h"
            }
          );

          response.status(200).send({
            status: "success",
            data: { userId: user.id, role: user.role, token: token }
          });
        })
        .catch(error => {
          response.status(500).send({ status: "error", error: error });
        });
    })
    .catch(error => {
      response.status(500).send({ status: "error", error: error });
    });
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  db.one(
    "UPDATE users SET name = $1, email = $2  WHERE id = $3  RETURNING id,name,email,created_at",
    [name, email, id]
  )
    .then(data => {
      response.status(201).send({
        status: "success",
        data: {
          message: "User successfully updated",
          userId: data.id,
          createdOn: data.created_at,
          name: data.name,
          email: data.email
        }
      });
    })
    .catch(error => {
      response.status(500).send({ status: "error", error: error });
    });
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  db.result("DELETE FROM users WHERE id = $1", id)
    .then(data => {
      // rowCount = number of rows affected by the query
      response.status(201).send({
        status: "success",
        data: { message: "User successfully deleted" }
      });
    })
    .catch(error => {
      console.log("ERROR:", error);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser
};
