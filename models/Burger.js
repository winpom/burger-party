const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Burger model
class Burger extends Model {}

Burger.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        total_cost: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        },
        restaurant_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "restaurant",
                key: "id",
            },
        },
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