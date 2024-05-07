const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const path = require('path');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const multer = require('multer'); // Require Multer

// Configure disk storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    const filename = req.body.id + '-' + Date.now() + '-' + file.originalname;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

// Add the Multer middleware to handle file uploads
app.use(upload.single('image')); // Assuming 'image' is the name of the input field for uploading images - need to confirm

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

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

// session config
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 60 * 60 * 1000 // expires after 1 day
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// sync database and server start
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server currently running on port ${PORT}. Please visit http://localhost:${PORT}!`);
  });
});