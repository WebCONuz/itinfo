const router = require("express").Router();
const {
  getHomePage,
  getDictPage,
  getTopicPage,
  getAboutPage,
  getRegisterPage,
  getLoginPage,
  getCategoryPage,
} = require("../controllers/pagesController");

router.get("/", getHomePage);
router.get("/dictionaries", getDictPage);
router.get("/topics", getTopicPage);
router.get("/about", getAboutPage);
router.get("/category/:category", getCategoryPage);
router.get("/register", getRegisterPage);
router.get("/login", getLoginPage);

module.exports = router;
