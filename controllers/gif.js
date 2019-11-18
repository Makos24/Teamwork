const { db } = require("../db/db");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");

const getGifs = (request, response) => {
  db.any("SELECT * FROM gifs ORDER BY created_at DESC")
    .then(function(data) {
      response.status(200).send({ status: "success", data: data });
    })
    .catch(function(error) {
      response.status(500).send({ status: "error", error: error });
    });
};

const getGifById = (request, response) => {
  const id = parseInt(request.params.id);

  db.one("SELECT * FROM gifs WHERE id = $1", [id])
    .then(gif => {
      response.status(200).send({ status: "success", data: gif });
    })
    .catch(error => {
      response.status(500).send({ status: "error", error: error });
    });
};

const createGif = (request, response) => {
  const { title } = request.body;
  const { url } = request.file;

  const token = request.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_SECRET");

  const userId = decodedToken.userId;

  db.one(
    "INSERT INTO gifs(user_id,title,image_url) VALUES($1, $2, $3) RETURNING id,user_id,title,image_url,created_at",
    [userId, title, url]
  )
    .then(data => {
      response.status(201).send({
        status: "success",
        data: {
          message: "Gif successfully uploaded",
          gifId: data.id,
          gifUrl: data.image_url,
          gifTitle: data.title,
          createdOn: data.created_at
        }
      });
    })
    .catch(error => {
      response.status(500).send({ status: "error", error: error });
    });
};

const deleteGif = (request, response) => {
  const id = parseInt(request.params.id);

  const token = request.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_SECRET");

  const userId = decodedToken.userId;

  db.one("SELECT * FROM gifs WHERE id = $1 AND user_id = $2", [id, userId])
    .then(gif => {
      let pid = gif.image_url.split("/")[8].split(".")[0];
      pid = "teamwork/" + pid;
      //response.send(pid);

      cloudinary.uploader.destroy(pid, function(error, result) {
        db.result("DELETE FROM gifs WHERE id = $1 AND user_id = $2", [
          id,
          userId
        ])
          .then(data => {
            // rowCount = number of rows affected by the query
            response.status(201).send({
              status: "success",
              data: { message: "Gif successfully deleted" }
            });
          })
          .catch(error => {
            response.status(500).send({ status: "error", error: error });
          });
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
    [id, 2, false]
  )
    .then(function(data) {
      response.status(200).send({ status: "success", data: data });
    })
    .catch(function(error) {
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
    [userId, id, 2, body]
  )
    .then(data => {
      response.status(201).send({
        status: "success",
        data: {
          message: "Comment successfully posted",
          commentId: data.id,
          userId: data.user_id,
          gifId: data.post_id,
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
  getGifs,
  getGifById,
  createGif,
  deleteGif,
  getComments,
  createComment,
  updateComment,
  flagComment,
  deleteComment
};
