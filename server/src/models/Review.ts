import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import User from "./User";
import BikeList from "./BikeList";

interface ReviewAttributes {
  id: number;
  bike_id: number;
  user_id: number;
  like_count: number;
  review: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ReviewCreationAttributes extends Optional<ReviewAttributes, "id"> {}

class Review
  extends Model<ReviewAttributes, ReviewCreationAttributes>
  implements ReviewAttributes
{
  public id!: number;
  public bike_id!: number;
  public user_id!: number;
  public like_count!: number;
  public review!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bike_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    like_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Review",
    tableName: "reviews",
    timestamps: true,
  }
);

export default Review;
