const express = require("express");
const db = require("../controllers/user");
const admin = require("../middleware/admin");

const router = express.Router();

router.get("/users", admin, db.getUsers);
router.get("/users/:id", admin, db.getUserById);
router.post("/users", admin, db.createUser);
router.put("/users/:id", admin, db.updateUser);
router.delete("/users/:id", admin, db.deleteUser);
router.post("/auth/login", db.loginUser);

module.exports = router;
