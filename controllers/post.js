const { db } = require("../db/db");
const jwt = require("jsonwebtoken");

const getPosts = (request, response) => {
  db.any("SELECT * FROM articles ORDER BY created_at DESC")
    .then(function(data) {
      response.status(200).send({ status: "success", data: data });
    })
    .catch(function(error) {
      response.status(500).send({ status: "error", error: error });
    });
};

const getPostById = (request, response) => {
  const id = parseInt(request.params.id);

  db.one("SELECT * FROM articles WHERE id = $1", id)
    .then(post => {
      response.status(200).send({ status: "success", data: post });
    })
    .catch(error => {
      response.status(500).send({ status: "error", error: error });
    });
};

const createPost = (request, response) => {
  const { title, body, category_id } = request.body;

  const token = request.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_SECRET");

  const userId = decodedToken.userId;
  // response.status(200).send(request.body);

  db.one(
    "INSERT INTO articles(user_id,category_id,title,body) VALUES($1, $2, $3, $4) RETURNING id,user_id,category_id,title,body,created_at",
    [userId, category_id, title, body]
  )
    .then(data => {
      response.status(201).send({
        status: "success",

        data: {
          message: "Article successfully posted",
          articleId: data.id,
          createdOn: data.created_at,
          title: data.title,
          article: data.body
        }
      });
    })
    .catch(error => {
      response.status(500).send({ status: "error", error: error });
    });
};

const updatePost = (request, response) => {
  const id = parseInt(request.params.id);
  const { title, body, category_id } = request.body;

  const token = request.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_SECRET");

  const userId = decodedToken.userId;

  db.one(
    "UPDATE articles SET title = $1, body = $2, category_id = $3 WHERE id = $4 AND user_id = $5 RETURNING id,user_id,category_id,title,body,created_at",
    [title, body, category_id, id, userId]
  )
    .then(data => {
      response.status(201).send({
        status: "success",
        data: {
          message: "Article successfully updated",
          articleId: data.id,
          createdOn: data.created_at,
          title: data.title,
          article: data.body
        }
      });
    })
    .catch(error => {
      response.status(500).send({ status: "error", error: error });
    });
};

const deletePost = (request, response) => {
  const id = parseInt(request.params.id);

  const token = request.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_SECRET");

  const userId = decodedToken.userId;

  db.result("DELETE FROM articles WHERE id = $1 AND user_id = $2", [id, userId])
    .then(data => {
      // rowCount = number of rows affected by the query
      response.status(201).send({
        status: "success",
        data: { message: "Article successfully deleted" }
      });
    })
    .catch(error => {
      response.status(500).send({ status: "error", error: error });
    });
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
