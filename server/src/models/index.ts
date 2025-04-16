import sequelize from "../config/db";
import User from "./User";
import Brand from "./Brand";
import BikeType from "./BikeType";
import Model from "./Model";
import BikeList from "./BikeList";
import Review from "./Review";

// Associations
User.hasMany(Review, { foreignKey: "user_id" });
Review.belongsTo(User, { foreignKey: "user_id" });

BikeList.hasMany(Review, { foreignKey: "bike_id" });
Review.belongsTo(BikeList, { foreignKey: "bike_id" });

Brand.hasMany(Model, { foreignKey: "brandId" });
Model.belongsTo(Brand, { foreignKey: "brandId" });

Review.belongsTo(BikeList, { foreignKey: "bike_id", as: "bike" });
BikeList.hasMany(Review, { foreignKey: "bike_id", as: "reviews" });

export default {
  sequelize,
  User,
  Brand,
  BikeType,
  Model,
  BikeList,
  Review,
};
