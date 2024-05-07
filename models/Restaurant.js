const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// restautant model
class Restaurant extends Model {}

Restaurant.init(
    {
        // column for id
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        // column for restaurant name
        },
        restaurant_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // column for restaurant location name
        location_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        average_review: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        average_meal_price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
                burger_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'burger',
                key:'id',
            }
        },
        // photos??
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "restaurant"
    }
);

module.exports = Restaurant;