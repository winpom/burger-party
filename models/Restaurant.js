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
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // column for restaurant location name
        location_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
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