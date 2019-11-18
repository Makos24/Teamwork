const express = require("express");
const db = require("../controllers/gif");
const auth = require("../middleware/auth");
const { parser } = require("../middleware/multer");

const router = express.Router();

router.get("/gifs", auth, db.getGifs);
router.get("/gifs/:id", auth, db.getGifById);
router.post("/gifs", auth, parser.single("image"), db.createGif);
router.delete("/gifs/:id", auth, db.deleteGif);

module.exports = router;
