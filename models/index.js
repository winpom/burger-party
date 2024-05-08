const Burger = require('./Burger');
const Restaurant = require('./Restaurant');
const Review = require('./Review');
const User = require('./User');

// Define associations
User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Review.belongsTo(User, {
  foreignKey: 'user_id'
});

Burger.belongsTo(Restaurant, {
  foreignKey: 'restaurant_id',
  onDelete: 'CASCADE'
});

Review.belongsTo(Burger, {
  foreignKey: 'burger_id',
  onDelete: 'CASCADE'
});

Restaurant.hasMany(Burger, {
  foreignKey: 'restaurant_id',
  onDelete: 'CASCADE'
});

// Define associations
Review.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Review.belongsTo(Restaurant, {
  foreignKey: 'restaurant_id',
  onDelete: 'CASCADE'
});


// Remove the association causing circular dependency
// Burger.hasMany(Review, {
//   foreignKey: 'review_id',
//   onDelete: 'CASCADE'
// });

// Restaurant.hasMany(Review, {
//   foreignKey: 'review_id',
//   onDelete: 'CASCADE'
// });

module.exports = { Burger, Restaurant, Review, User };

