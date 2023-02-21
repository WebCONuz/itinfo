const router = require("express").Router();
const {
  getAllTag,
  getOneTag,
  addTag,
  putTag,
  deleteTag,
} = require("../controllers/tagController");

router.get("/", getAllTag);
router.get("/:id", getOneTag);
router.post("/add", addTag);
router.put("/:id", putTag);
router.delete("/:id", deleteTag);

module.exports = router;
