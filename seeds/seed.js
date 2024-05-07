const sequelize = require('../config/connection');

const seedBurgers = require('./burgerSeedData');

const seedRestaurants = require('./restaurantSeedData');

const seedReviews = require('./reviewSeedData');

const seedUsers = require('./userSeedData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedBurgers();

  await seedRestaurants();

  await seedUsers();

  process.exit(0);
};

seedAll();