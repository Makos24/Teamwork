const express = require("express");
const db = require("../controllers/post");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

router.get("/articles", auth, db.getPosts);
router.get("/feed", auth, db.getFeed);
router.get("/articles/:id", auth, db.getPostById);
router.post("/articles", auth, db.createPost);
router.put("/articles/:id", auth, db.updatePost);
router.delete("/articles/:id", auth, db.deletePost);
router.get("/articles/:id/comments", auth, db.getComments);
router.post("/articles/:id/comments", auth, db.createComment);
router.put("/comments/:id/", auth, db.updateComment);
router.put("/comments/:id/flag", admin, db.flagComment);
router.delete("/comments/:id/", auth, db.deleteComment);

module.exports = router;
