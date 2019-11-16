const express = require("express");
const db = require("../controllers/category");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/categories", auth, db.getCategories);
router.get("/categories/:id", admin, db.getCategoryById);
router.post("/categories", admin, db.createCategory);
router.put("/categories/:id", admin, db.updateCategory);
router.delete("/categories/:id", admin, db.deleteCategory);

module.exports = router;
