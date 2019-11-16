const express = require("express");
const db = require("../controllers/post");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/articles", auth, db.getPosts);
router.get("/articles/:id", auth, db.getPostById);
router.post("/articles", auth, db.createPost);
router.put("/articles/:id", auth, db.updatePost);
router.delete("/articles/:id", auth, db.deletePost);

module.exports = router;
