const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/connection");
const Review = require("./Review");

// Restaurant model
class Restaurant extends Model {
  // Method to calculate average meal price
  static async calculateAverageMealPrice(restaurantId) {
    const result = await Review.findOne({
      attributes: [
        [Sequelize.fn("avg", Sequelize.col("meal_price")), "average_meal_price"],
      ],
      where: { restaurant_id: restaurantId },
    });
    return result.get("average_meal_price") || 0;
  }

  // Method to calculate average review rating
  static async calculateAverageReviewRating(restaurantId) {
    const result = await Review.findOne({
      attributes: [
        [Sequelize.fn("avg", Sequelize.col("review_star")), "average_review_rating"],
      ],
      where: { restaurant_id: restaurantId },
    });
    return result.get("average_review_rating") || 0;
  }
}

Restaurant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    restaurant_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "restaurant",
  }
);

module.exports = Restaurant;
