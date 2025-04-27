import sequelize from "../config/db";
import User from "./User";
import Brand from "./Brand";
import BikeType from "./BikeType";
import Model from "./Model";
import BikeList from "./BikeList";
import Review from "./Review";
import ReviewLike from "./reviewLike";
import Comment from "./comment";
import ReviewBookmark from "./RevieBookmark";

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

BikeList.belongsTo(Brand, { foreignKey: "brand_id", as: "brand" });
BikeList.belongsTo(Model, { foreignKey: "model_id", as: "model" });
BikeList.belongsTo(BikeType, { foreignKey: "bike_type_id", as: "type" });

User.hasMany(ReviewLike, { foreignKey: "user_id" });
ReviewLike.belongsTo(User, { foreignKey: "user_id" });

Review.hasMany(Comment, { foreignKey: "review_id", as: "comments" });
Comment.belongsTo(Review, { foreignKey: "review_id", as: "reviews" });

User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

//bookmark association
User.hasMany(ReviewBookmark, { foreignKey: "user_id" });
ReviewBookmark.belongsTo(User, { foreignKey: "user_id" });

Review.hasMany(ReviewBookmark, { foreignKey: "review_id" });
ReviewBookmark.belongsTo(Review, { foreignKey: "review_id", as: "review" });

export default {
  sequelize,
  User,
  Brand,
  BikeType,
  Model,
  BikeList,
  Review,
  Comment,
  ReviewBookmark,
};
