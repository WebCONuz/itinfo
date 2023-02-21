const router = require("express").Router();
const {
  getAllSynonym,
  getOneSynonym,
  addSynonym,
  putSynonym,
  deleteSynonym,
} = require("../controllers/synonymController");

router.get("/", getAllSynonym);
router.get("/:id", getOneSynonym);
router.post("/add", addSynonym);
router.put("/:id", putSynonym);
router.delete("/:id", deleteSynonym);

module.exports = router;
