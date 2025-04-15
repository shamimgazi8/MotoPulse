import sequelize from "../config/db";
import User from "./User";
import Brand from "./Brand";

import BikeType from "./BikeType";
import Model from "./Model";

import Review from "./Review";

// Associations

User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

Brand.hasMany(Model, { foreignKey: "brandId" });
Model.belongsTo(Brand, { foreignKey: "brandId" });

BikeType.hasMany(Model, { foreignKey: "bikeTypeId" });
Model.belongsTo(BikeType, { foreignKey: "bikeTypeId" });

Model.hasMany(Review, { foreignKey: "modelId" });
Review.belongsTo(Model, { foreignKey: "modelId" });

export default {
  sequelize,
  User,
  Brand,

  BikeType,
  Model,

  Review,
};
