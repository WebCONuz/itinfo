const router = require("express").Router();
const {
  getAllQA,
  getOneQA,
  addQA,
  putQA,
  deleteQA,
} = require("../controllers/qaController");

router.get("/", getAllQA);
router.get("/:id", getOneQA);
router.post("/add", addQA);
router.put("/:id", putQA);
router.delete("/:id", deleteQA);

module.exports = router;
