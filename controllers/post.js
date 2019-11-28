const { db } = require("../db/db");
const jwt = require("jsonwebtoken");

const getFeed = (request, response) => {
  db.any(
    "SELECT * FROM ((SELECT articles.id, articles.title, articles.body, NULL as image_url, articles.user_id, articles.created_at, users.name FROM articles, users WHERE users.id = articles.user_id) UNION  (SELECT gifs.id, gifs.title, gifs.image_url, NULL as body, gifs.user_id, gifs.created_at, users.name FROM gifs, users WHERE users.id = gifs.user_id)) results ORDER BY created_at ASC"
  )
    .then(function(data) {
      response.status(200).send({ status: "success", data: data });
    })
    .catch(function(error) {
      response.status(500).send({ status: "error", error: error });
    });
};
const getPosts = (request, response) => {
  db.any(
    "SELECT articles.*, users.name FROM articles, users WHERE articles.user_id = users.id ORDER BY articles.created_at DESC"
  )
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

const getComments = (request, response) => {
  const id = parseInt(request.params.id);
  db.any(
    "SELECT * FROM comments WHERE post_id = $1 AND post_type = $2 AND flag = $3 ORDER BY created_at DESC",
    [id, 1, false]
  )
    .then(data => {
      response.status(200).send({ status: "success", data: data });
    })
    .catch(error => {
      response.status(500).send({ status: "error", error: error });
    });
};

const createComment = (request, response) => {
  const { body } = request.body;
  const id = parseInt(request.params.id);

  const token = request.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_SECRET");

  const userId = decodedToken.userId;
  // response.status(200).send(request.body);

  db.one(
    "INSERT INTO comments(user_id,post_id,post_type,body) VALUES($1, $2, $3, $4) RETURNING id,user_id,post_id,post_type,body,created_at",
    [userId, id, 1, body]
  )
    .then(data => {
      response.status(201).send({
        status: "success",
        data: {
          message: "Comment successfully posted",
          commentId: data.id,
          userId: data.user_id,
          postId: data.post_id,
          createdOn: data.created_at
        }
      });
    })
    .catch(error => {
      response.status(500).send({ status: "error", error: error });
    });
};

const updateComment = (request, response) => {
  const id = parseInt(request.params.id);
  const { body } = request.body;

  const token = request.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_SECRET");

  const userId = decodedToken.userId;

  db.one(
    "UPDATE comments SET body = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
    [body, id, userId]
  )
    .then(data => {
      response.status(201).send({
        status: "success",
        data: {
          message: "Comment successfully updated",
          commentId: data.id,
          userId: data.user_id,
          postId: data.post_id,
          createdOn: data.created_at
        }
      });
    })
    .catch(error => {
      response.status(500).send({ status: "error", error: error });
    });
};

const deleteComment = (request, response) => {
  const id = parseInt(request.params.id);

  db.result("DELETE FROM comments WHERE id = $1", [id])
    .then(data => {
      // rowCount = number of rows affected by the query
      response.status(201).send({
        status: "success",
        data: { message: "Comment successfully deleted" }
      });
    })
    .catch(error => {
      response.status(500).send({ status: "error", error: error });
    });
};

const flagComment = (request, response) => {
  const id = parseInt(request.params.id);

  db.result("UPDATE comments SET flag = $1 WHERE id = $2", [true, id])
    .then(data => {
      // rowCount = number of rows affected by the query
      response.status(201).send({
        status: "success",
        data: { message: "Comment flagged as inappropriate" }
      });
    })
    .catch(error => {
      response.status(500).send({ status: "error", error: error });
    });
};

module.exports = {
  getFeed,
  getPosts,
  getComments,
  getPostById,
  createPost,
  createComment,
  updatePost,
  updateComment,
  deletePost,
  deleteComment,
  flagComment
};
