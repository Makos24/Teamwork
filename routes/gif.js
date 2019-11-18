const express = require("express");
const db = require("../controllers/gif");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { parser } = require("../middleware/multer");

const router = express.Router();

router.get("/gifs", auth, db.getGifs);
router.get("/gifs/:id", auth, db.getGifById);
router.post("/gifs", auth, parser.single("image"), db.createGif);
router.delete("/gifs/:id", auth, db.deleteGif);
router.get("/gifs/:id/comments", auth, db.getComments);
router.post("/gifs/:id/comments", auth, db.createComment);
router.put("/comments/:id/", auth, db.updateComment);
router.put("/comments/:id/flag", admin, db.flagComment);
router.delete("/comments/:id/", auth, db.deleteComment);

module.exports = router;
