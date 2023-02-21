const router = require("express").Router();
const {
  getAllTopic,
  addTopic,
  putTopic,
  deleteTopic,
  getOneTopic,
} = require("../controllers/topicControllers");

router.get("/", getAllTopic);
router.get("/:id", getOneTopic);
router.post("/add", addTopic);
router.put("/:id", putTopic);
router.delete("/:id", deleteTopic);

module.exports = router;
