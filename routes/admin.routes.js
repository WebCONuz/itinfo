const router = require("express").Router();
const {
  getAllAdmin,
  addAdmin,
  putAdmin,
  deleteAdmin,
  getOneAdmin,
  loginAdmin,
  logoutAdmin,
} = require("../controllers/adminController");

router.get("/", getAllAdmin);
router.get("/:id", getOneAdmin);
router.post("/add", addAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.put("/:id", putAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
