const router = require("express").Router();
const {
  getAllDict,
  addDict,
  putDict,
  deleteDict,
} = require("../controllers/dictionaryController");

router.get("/", getAllDict);
router.post("/add", addDict);
router.put("/:id", putDict);
router.delete("/:id", deleteDict);

module.exports = router;
