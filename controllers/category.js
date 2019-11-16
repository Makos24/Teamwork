const { db } = require("../db/db");
const jwt = require("jsonwebtoken");

const getCategories = (request, response) => {
  db.any("SELECT * FROM categories ORDER BY created_at DESC")
    .then(function(data) {
      response.status(200).send({ status: "success", data: data });
    })
    .catch(function(error) {
      response.status(500).send({ status: "error", error: error });
    });
};

const getCategoryById = (request, response) => {
  const id = parseInt(request.params.id);

  db.one("SELECT * FROM categories WHERE id = $1", id)
    .then(data => {
      response.status(200).send({
        status: "success",
        data: {
          categoryId: data.id,
          createdOn: data.created_at,
          name: data.name
        }
      });
    })
    .catch(error => {
      response.status(500).send({ status: "error", error: error });
    });
};

const createCategory = (request, response) => {
  const { name } = request.body;
  // response.status(200).send(request.body);

  db.one(
    "INSERT INTO categories(name) VALUES($1) RETURNING id,name,created_at",
    [name]
  )
    .then(data => {
      response.status(201).send({
        status: "success",
        data: {
          message: "Category successfully posted",
          categoryId: data.id,
          createdOn: data.created_at,
          name: data.name
        }
      });
    })
    .catch(error => {
      response.status(500).send({ status: "error", error: error });
    });
};

const updateCategory = (request, response) => {
  const id = parseInt(request.params.id);
  const { name } = request.body;

  db.one(
    "UPDATE categories SET name = $1 WHERE id = $2 RETURNING id,name,created_at",
    [name, id]
  )
    .then(data => {
      response.status(201).send({
        status: "success",
        data: {
          message: "Category successfully updated",
          articleId: data.id,
          createdOn: data.created_at,
          name: data.name
        }
      });
    })
    .catch(error => {
      response.status(500).send({ status: "error", error: error });
    });
};

const deleteCategory = (request, response) => {
  const id = parseInt(request.params.id);

  db.result("DELETE FROM categories WHERE id = $1", [id])
    .then(data => {
      // rowCount = number of rows affected by the query
      response.status(201).send({
        status: "success",
        data: { message: "Category successfully deleted" }
      });
    })
    .catch(error => {
      response.status(500).send({ status: "error", error: error });
    });
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
