const Burger = require('./Burger');
const Restaurant = require('./Restaurant');
const Review = require('./Review');
const User = require('./User');

Traveller.belongsToMany(Location, {
    through: {
        model: Trip,
        unique: false
    },
});

Location.belongsToMany(Traveller, {
    through: {
        model: Trip,
        unique: false
    },
});

module.exports = { Burger, Restaurant, Review, User };
