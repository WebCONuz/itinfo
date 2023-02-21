const router = require("express").Router();
const {
  getAllDescription,
  addDescription,
  putDescription,
  deleteDescription,
} = require("../controllers/descriptionController");

router.get("/", getAllDescription);
router.post("/add", addDescription);
router.put("/:id", putDescription);
router.delete("/:id", deleteDescription);

module.exports = router;
