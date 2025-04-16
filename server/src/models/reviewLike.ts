import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class ReviewLike extends Model {
  public user_id!: number;
  public review_id!: number;
}

ReviewLike.init(
  {
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
    modelName: "ReviewLike",
    tableName: "review_likes",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "review_id"],
      },
    ],
  }
);

export default ReviewLike;
