const Burger = require('./Burger');
const Restaurant = require('./Restaurant');
const Review = require('./Review');
const User = require('./User');

User.hasMany(Review, {
  foreignKey: '',
  onDelete: 'CASCADE'
});

Review.belongsTo(User, {
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