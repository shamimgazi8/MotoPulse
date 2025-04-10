import sequelize from "../config/db";
import User from "./User";
import Brand from "./Brand";
import Manufacturer from "./Manufacturer";
import BikeType from "./BikeType";
import Model from "./Model";
import Specification from "./Specification";
import Review from "./Review";

User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

Brand.hasMany(Model, { foreignKey: "brandId" });
Model.belongsTo(Brand, { foreignKey: "brandId" });

Manufacturer.hasMany(Model, { foreignKey: "manufacturerId" });
Model.belongsTo(Manufacturer, { foreignKey: "manufacturerId" });

BikeType.hasMany(Model, { foreignKey: "bikeTypeId" });
Model.belongsTo(BikeType, { foreignKey: "bikeTypeId" });

Model.hasOne(Specification, { foreignKey: "modelId" });
Specification.belongsTo(Model, { foreignKey: "modelId" });

Model.hasMany(Review, { foreignKey: "modelId" });
Review.belongsTo(Model, { foreignKey: "modelId" });

export default {
  sequelize,
  User,
  Brand,
  Manufacturer,
  BikeType,
  Model,
  Specification,
  Review,
};
