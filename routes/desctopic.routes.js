const router = require("express").Router();
const {
  getAllDescTopic,
  getOneDescTopic,
  addDescTopic,
  putDescTopic,
  deleteDescTopic,
} = require("../controllers/desctopicController");

router.get("/", getAllDescTopic);
router.get("/:id", getOneDescTopic);
router.post("/add", addDescTopic);
router.put("/:id", putDescTopic);
router.delete("/:id", deleteDescTopic);

module.exports = router;
