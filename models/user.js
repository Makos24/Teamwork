const pgp = require("pg-promise")(/* options */);
const db = pgp("postgres://me:password@localhost:5432/teamwork");
const bcrypt = require("bcrypt");

const getUsers = (request, response) => {
  db.any("SELECT name, email FROM users WHERE role = $1 ORDER BY id ASC", [1])
    .then(function(data) {
      response.status(200).json(data);
    })
    .catch(function(error) {
      console.log("ERROR:", error);
    });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  db.one("SELECT name, email FROM users WHERE id = $1", id)
    .then(user => {
      response.status(200).json(user);
    })
    .catch(error => {
      console.log("ERROR:", error);
    });
};

const createUser = (request, response) => {
  const { name, email, password, role } = request.body;

  // response.status(200).send(request.body);

  bcrypt
    .hash(request.body.password, 10)
    .then(hash => {
      db.one(
        "INSERT INTO users(name,email,password,role) VALUES($1, $2, $3, $4) RETURNING id",
        [name, email, hash, role]
      )
        .then(data => {
          response.status(201).send(`User added with ID: ${data.id}`);
        })
        .catch(error => {
          response.status(500).send("ERROR:", error); // print error;
        });
    })
    .catch(error => {
      response.status(500).send({ error: error });
    });
};

const loginUser = (request, response) => {
  const { email, password } = request.body;

  db.one("SELECT * FROM users WHERE email = $1", email)
    .then(data => {
      if (!data) {
        return response
          .status(401)
          .send({ error: new Error("User not found") });
      }
      bcrypt
        .compare(request.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res
              .status(401)
              .json({ error: new Error("Incorrect password") });
          }
          const token = jwt.sign({ userId: user._id }, "RANDOM_SECRET", {
            expiresIn: "24h"
          });
          res.status(200).json({
            userId: user._id,
            token: token
          });
        })
        .catch(error => {
          res.status(500).json({ error: error });
        });

      response.status(201).send(`User added with ID: ${data.id}`);
    })
    .catch(error => {
      console.log("ERROR:", error); // print error;
    });
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  db.one(
    "UPDATE users SET name = $1, email = $2, VALUES($1, $2,) RETURNING id",
    [name, email]
  )
    .then(data => {
      response.status(201).send(`User added with ID: ${data.id}`);
    })
    .catch(error => {
      console.log("ERROR:", error); // print error;
    });
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  db.result("DELETE FROM users WHERE id = $1", id)
    .then(result => {
      // rowCount = number of rows affected by the query
      response.status(201).send(`${data.rowCount} User Deleted`);
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
