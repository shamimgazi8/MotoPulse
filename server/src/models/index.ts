import sequelize from "../config/db";
import User from "./User";
import Brand from "./Brand";
import BikeType from "./BikeType";
import Model from "./Model";
import BikeList from "./BikeList";
import Review from "./Review";
import ReviewLike from "./reviewLike";

// Associations
User.hasMany(Review, { foreignKey: "user_id" });
Review.belongsTo(User, { foreignKey: "user_id" });

BikeList.hasMany(Review, { foreignKey: "bike_id" });
Review.belongsTo(BikeList, { foreignKey: "bike_id" });

Brand.hasMany(Model, { foreignKey: "brand_id" });
Model.belongsTo(Brand, { foreignKey: "brand_id" });

Review.belongsTo(BikeList, { foreignKey: "bike_id", as: "bike" });
BikeList.hasMany(Review, { foreignKey: "bike_id", as: "reviews" });

Review.hasMany(ReviewLike, { foreignKey: "review_id" });
ReviewLike.belongsTo(Review, { foreignKey: "review_id" });

User.hasMany(ReviewLike, { foreignKey: "user_id" });
ReviewLike.belongsTo(User, { foreignKey: "user_id" });

export default {
  sequelize,
  User,
  Brand,
  BikeType,
  Model,
  BikeList,
  Review,
};
