const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");
const path = require("path");

const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup express-session middleware
app.use(session({
  secret: "helloworld",
  resave: false,
  saveUninitialized: false
}));

// middleware checking if user is authenticated
function requireAuth(req, res, next) {
  if (req.session.authenticated) {
      next();
  } else {
      res.status(401).send("Unauthorized");
  }
};

// login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "user" && password === "password") {
      req.session.authenticated = true;
      res.send("Login successful");
  } else {
      res.status(401).send("Invalid username or password");
  }
});

// protected route
app.get("/protected-route", requireAuth, (req, res) => {
  res.send("This is a protected route");
});

const sess = {
  secret: "iliketequila",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});