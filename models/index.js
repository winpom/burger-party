const Burger = require('./Burger');
const Restaurant = require('./Restaurant');
const Review = require('./Review');
const User = require('./User');

<<<<<<< HEAD
User.hasMany(Review, {
  foreignKey: '',
=======
// Define associations
User.hasMany(Review, {
  foreignKey: 'user_id',
>>>>>>> 8b6cc99739650d8f4a54a312530581688efa6dba
  onDelete: 'CASCADE'
});

Review.belongsTo(User, {
<<<<<<< HEAD
  foreignKey: ''
});

Burger.belongsTo(Restaurant, {
    foreignKey: ''
  });

Burger.hasMany(Review,{
  foreignKey:''
});

Restaurant.hasMany(Burger, {
  foreignKey: ''
});

Review.hasOne(Burger,{
  foreignKey:''
});
Restaurant.hasMany(Review,{
  foreignKey:''
});

module.exports = { Burger, Restaurant , Review, User };
=======
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
  foreignKey: 'restaurant_id'
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
>>>>>>> 8b6cc99739650d8f4a54a312530581688efa6dba
