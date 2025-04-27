// models/ReviewBookmark.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class ReviewBookmark extends Model {
  public id!: number;
  public user_id!: number;
  public review_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ReviewBookmark.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ReviewBookmark",
    tableName: "review_bookmarks",
    timestamps: true,
  }
);

export default ReviewBookmark;
