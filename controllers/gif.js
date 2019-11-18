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

  db.one("SELECT * FROM gifs WHERE id = $1", id)
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

module.exports = {
  getGifs,
  getGifById,
  createGif,
  deleteGif
};
