const Burger = require('./Burger');
const Restaurant = require('./Restaurant');
const Review = require('./Review');
const User = require('./User');


// User.hasMany(Review)
// Review.belongsTo(User)
// Burger.belongsTo(Restaurant)
// Burger.hasMany(Review)
// Restaurant.hasMany(Burger)
// Review.hasOne(Burger)
// Restaurant.hasMany(Review)

User.hasMany(Review,{
    foreignKey: 'user_id',
    onDelete:'CASCADE'
});
Review.belongsTo(User,{
    foreignKey: 'user_id',
});
Burger.belongsTo(Restaurant,{
    foreignKey:'restaurant_id',
});
Burger.hasMany(Review,{
    foreignKey:'review_id',
});
Restaurant.hasMany(Burger,{
    foreignKey:'burger_id',
    onDelete:'CASCADE'
});
Review.hasOne(Burger,{
    foreignKey:'burger_id',
});



module.exports = { Burger, Restaurant, Review, User };
