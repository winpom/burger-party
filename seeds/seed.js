const sequelize = require('../config/connection');
const { User } = require('../models');
const { Burger } = require('../models');
const { Review } = require('../models');
const { Restaurant } = require('../models');

const userSeedData = require('./userSeedData.json');
const burgerSeedData = require('./burgerSeedData.json');
const restaurantSeedData = require('./restaurantSeedData.json');
const reviewSeedData = require('./reviewSeedData.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  await Restaurant.bulkCreate(restaurantSeedData, {
    individualHooks: true,
    returning: true,
  });

  await Burger.bulkCreate(burgerSeedData, {
    individualHooks: true,
    returning: true,
  });

  await Review.bulkCreate(reviewSeedData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedAll();