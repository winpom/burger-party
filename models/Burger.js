const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// burger model
class Burger extends Model {}

Burger.init(
    {
        // column for burger id
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // column for burger name
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // column for burger total cost
        total_cost: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        // column for restaurant id
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
    modelName: "burger"
    }
);

module.exports = Burger;