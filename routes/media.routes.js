const router = require("express").Router();
const {
  getAllMedia,
  getOneMedia,
  addMedia,
  putMedia,
  deleteMedia,
} = require("../controllers/mediaController");

router.get("/", getAllMedia);
router.get("/:id", getOneMedia);
router.post("/add", addMedia);
router.put("/:id", putMedia);
router.delete("/:id", deleteMedia);

module.exports = router;
