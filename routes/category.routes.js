const router = require("express").Router();
const {
  getAllCategory,
  addCategory,
  putCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.get("/", getAllCategory);
router.post("/add", addCategory);
router.put("/:id", putCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
