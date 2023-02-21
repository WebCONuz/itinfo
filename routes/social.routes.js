const router = require("express").Router();
const {
  getAllSocial,
  addSocial,
  putSocial,
  deleteSocial,
  getOneSocial,
} = require("../controllers/socialController");

router.get("/", getAllSocial);
router.get("/:id", getOneSocial);
router.post("/add", addSocial);
router.put("/:id", putSocial);
router.delete("/:id", deleteSocial);

module.exports = router;
