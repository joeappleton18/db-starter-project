require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const countriesModel = require("./models/Country");
const expressSession = require("express-session");
const User = require("./models/User");


/**
 * Controllers (route handlers).
 */
const tasterController = require("./controllers/taster");
const tastingController = require("./controllers/tasting");
const homeController = require("./controllers/home");
const userController = require("./controllers/user");

const app = express();
app.set("view engine", "ejs");

/**
 * notice above we are using dotenv. We can now pull the values from our environment
 */

const { WEB_PORT, MONGODB_URI } = process.env;

/**
 * connect to database
 */




mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

/***
 * We are applying our middlewear
 */
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(253402300000000) } }))


app.use("*", async (req, res, next) => {
  global.user = false;
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
  }
  next();
})

const authMiddleware = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (!user) {
    return res.redirect('/');
  }
  next()
}

app.get("/", homeController.list);

app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})

app.get("/create-taster", authMiddleware, (req, res) => {
  res.render("create-taster", { errors: {} });
});

app.post("/create-taster", tasterController.create);

app.get("/tasters", tasterController.list);
app.get("/tasters/delete/:id", tasterController.delete);
app.get("/tasters/update/:id", tasterController.edit);
app.post("/tasters/update/:id", tasterController.update);


app.get("/create-tasting", tastingController.createView);
app.post("/create-tasting", tastingController.create);
app.get("/update-tasting/:id", tastingController.edit);


app.get("/tastings", tastingController.list);
app.get("/tastings/delete/:id", tastingController.delete);

app.get("/join", (req, res) => {
  res.render('create-user', { errors: {} })
});

app.post("/join", userController.create);
app.get("/login", (req, res) => {
  res.render('login-user', { errors: {} })
});
app.post("/login", userController.login);


app.listen(WEB_PORT, () => {
  console.log(
    `Example app listening at http://localhost:${WEB_PORT}`,
    chalk.green("✓")
  );
});
