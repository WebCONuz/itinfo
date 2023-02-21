const path = require("path");

const createViewPath = (page) => {
  return path.join(__dirname, "../views/pages", `${page}.hbs`);
};

module.exports = createViewPath;
