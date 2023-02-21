const router = require("express").Router();
const {
  getAllAuthorSocial,
  addAuthorSocial,
  putAuthorSocial,
  deleteAuthorSocial,
  getOneAuthorSocial,
} = require("../controllers/authorSocialController");

router.get("/", getAllAuthorSocial);
router.get("/:id", getOneAuthorSocial);
router.post("/add", addAuthorSocial);
router.put("/:id", putAuthorSocial);
router.delete("/:id", deleteAuthorSocial);

module.exports = router;
