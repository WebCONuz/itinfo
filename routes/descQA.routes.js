const router = require("express").Router();
const {
  getAllDescQA,
  getOneDescQA,
  addDescQA,
  putDescQA,
  deleteDescQA,
} = require("../controllers/descqaController");

router.get("/", getAllDescQA);
router.get("/:id", getOneDescQA);
router.post("/add", addDescQA);
router.put("/:id", putDescQA);
router.delete("/:id", deleteDescQA);

module.exports = router;
