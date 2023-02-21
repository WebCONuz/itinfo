const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const exHbs = require("express-handlebars");
const routes = require("./routes/index.routes");
const errorHandler = require("./middlewares/ErrorHandlingMiddleware");
const logger = require("./services/logger");
const {
  expressWinstonLogger,
  expressWinstonErrorLogger,
} = require("./middlewares/expressLogger");

// require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

// console.log(process.env.NODE_ENV);
// console.log(process.env.pass);
// console.log(config.get("smtp_password"));

// logger.log("info", "log ma'lumotlari");
// logger.error("error ma'lumotlari");
// logger.debug("debug ma'lumotlari");
// logger.warn("warn ma'lumotlari");
// logger.info("info ma'lumotlari");

// all loggers
app.use(expressWinstonLogger);

const hbs = exHbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("/views", "views");
app.use(express.static("views"));

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(routes);

// only error loggers
app.use(expressWinstonErrorLogger);

// Albatta xatoni oxirida tekshirish kerak
app.use(errorHandler);

mongoose.connect(config.get("dbUri"), (err) => {
  if (err) throw err;
  console.log("Server is connecting to MongoDB.");
});

const PORT = config.get("PORT") || 3000;
app.listen(PORT, () => console.log(`Project is running on port: ${PORT}.`));
