const router = require("express").Router();
const {
  getAllAuthor,
  addAuthor,
  putAuthor,
  deleteAuthor,
  getOneAuthor,
  loginAuthor,
} = require("../controllers/authorController");
const authorPolice = require("../middlewares/authorPolice");
const authorRolePolice = require("../middlewares/authorRolePolice");

router.get("/", authorPolice, getAllAuthor);
router.get("/:id", getOneAuthor);
router.get("/:id", authorRolePolice(["CHANGE", "READ", "WRITE"]), getOneAuthor);
router.post("/add", addAuthor);
router.post("/login", loginAuthor);
router.put("/:id", putAuthor);
router.delete("/:id", deleteAuthor);

module.exports = router;
