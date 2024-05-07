const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// review model
class Review extends Model { }

Review.init(
    {
        // column for review id
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // column for user id
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id"
            }
        },
        // column for rating
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // column for restaurant id
        restaurant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "restaurant",
                key: "id"
            }
        },
        // column for burger id
        burger_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "burger",
                key: "id"
            }
        },
        // column for review
        review_content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    },

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "review"
    }
);

module.exports = Review;