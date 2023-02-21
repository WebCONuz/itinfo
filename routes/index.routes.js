const router = require("express").Router();

router.use(require("./response.routes"));
router.use("/api/dictionary", require("./dictionary.routes"));
router.use("/api/category", require("./category.routes"));
router.use("/api/description", require("./description.routes"));
router.use("/api/social", require("./social.routes"));
router.use("/api/author", require("./author.routes"));
router.use("/api/authorsocial", require("./authorsocial.routes"));
router.use("/api/topic", require("./topic.routes"));
router.use("/api/desctopic", require("./desctopic.routes"));
router.use("/api/tag", require("./tag.routes"));
router.use("/api/synonym", require("./synonym.routes"));
router.use("/api/media", require("./media.routes"));
router.use("/api/descqa", require("./descQA.routes"));
router.use("/api/question", require("./qa.routes"));
router.use("/api/admin", require("./admin.routes"));
router.use("/api/user", require("./user.routes"));

// pages
router.use("/", require("./pages.routes"));

module.exports = router;
