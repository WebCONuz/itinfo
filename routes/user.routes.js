const router = require("express").Router();
const {
  getAllUser,
  addUser,
  putUser,
  deleteUser,
  getOneUser,
  loginUser,
  activeUser,
  changePass,
} = require("../controllers/userController");

router.get("/", getAllUser);
router.get("/:id", getOneUser);
router.post("/add", addUser);
router.get("/activate/:link", activeUser);
router.post("/change", changePass);
router.post("/login", loginUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUser);

module.exports = router;
