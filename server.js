const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./routes');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers });

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

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Mount Routes
app.use(routes);

// sync database and server start
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server currently running on port ${PORT}. Please visit http://localhost:${PORT}!`);
  });
});