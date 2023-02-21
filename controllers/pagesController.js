const createViewPath = require("../helpers/create_view_path");

const getHomePage = (req, res) => {
  res.render(createViewPath("home"), { title: "Home", page_name: "home" });
};

const getDictPage = (req, res) => {
  res.render(createViewPath("dictionary"), {
    title: "Dictionary",
    page_name: "home",
  });
};

const getTopicPage = (req, res) => {
  res.render(createViewPath("topic"), { title: "Topic", page_name: "home" });
};

const getAboutPage = (req, res) => {
  res.render(createViewPath("about"), { title: "About", page_name: "home" });
};

const getCategoryPage = (req, res) => {
  const { category } = req.params;
  res.render(createViewPath("category"), {
    title: category,
    page_name: "home",
  });
};

const getRegisterPage = (req, res) => {
  res.render(createViewPath("register"), {
    title: "Registration",
    page_name: "home",
  });
};

const getLoginPage = (req, res) => {
  res.render(createViewPath("login"), { title: "Login", page_name: "home" });
};

module.exports = {
  getHomePage,
  getDictPage,
  getTopicPage,
  getAboutPage,
  getRegisterPage,
  getLoginPage,
  getCategoryPage,
};
