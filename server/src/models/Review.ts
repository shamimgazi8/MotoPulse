import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface ReviewAttributes {
  id: number;
  userId: number;
  modelId: number;
  rating: number;
  review: string;
}

interface ReviewCreationAttributes extends Optional<ReviewAttributes, "id"> {}

class Review
  extends Model<ReviewAttributes, ReviewCreationAttributes>
  implements ReviewAttributes
{
  public id!: number;
  public userId!: number;
  public modelId!: number;
  public rating!: number;
  public review!: string;
}

Review.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    modelId: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER },
    review: { type: DataTypes.TEXT },
  },
  { sequelize, modelName: "Review" }
);

export default Review;
