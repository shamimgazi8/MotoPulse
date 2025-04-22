import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import slugify from "slugify"; // Make sure to install this: npm install slugify
import User from "./User";
import BikeList from "./BikeList";

interface ReviewAttributes {
  id: number;
  bike_id: number;
  user_id: number;
  like_count: number;
  review: string;
  slug?: string;
  coverPhoto?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ReviewCreationAttributes
  extends Optional<ReviewAttributes, "id" | "slug"> {}

class Review
  extends Model<ReviewAttributes, ReviewCreationAttributes>
  implements ReviewAttributes
{
  public id!: number;
  public bike_id!: number;
  public user_id!: number;
  public like_count!: number;
  public review!: string;
  public slug?: string;
  public coverPhoto?: string;

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
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    coverPhoto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Review",
    tableName: "reviews",
    timestamps: true,
    hooks: {
      beforeCreate: (review) => {
        review.slug = slugify(review.review.slice(0, 50), {
          lower: true,
          strict: true,
        });
      },
      beforeUpdate: (review) => {
        if (review.changed("review")) {
          review.slug = slugify(review.review.slice(0, 50), {
            lower: true,
            strict: true,
          });
        }
      },
    },
  }
);

export default Review;
