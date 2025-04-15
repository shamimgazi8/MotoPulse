import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import User from "./User"; // Assuming User model exists in the same folder

interface BrandAttributes {
  id: number;
  user_id: number;
  brandName: string;
  country: string;
}

interface BrandCreationAttributes extends Optional<BrandAttributes, "id"> {}

class Brand
  extends Model<BrandAttributes, BrandCreationAttributes>
  implements BrandAttributes
{
  public id!: number;
  public user_id!: number;
  public brandName!: string;
  public country!: string;
}

Brand.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // references the "users" table
        key: "id",
      },
      onDelete: "CASCADE",
    },
    brandName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Brand",
    tableName: "brands",
    timestamps: true, // automatically includes createdAt and updatedAt
  }
);

// Associations
Brand.belongsTo(User, {
  foreignKey: "user_id", // foreign key in Brand that links to User
  as: "user", // alias for this association
});

// Optional: If you want to add the reverse association in the User model (if it's missing)
User.hasMany(Brand, {
  foreignKey: "user_id", // foreign key in Brand
  as: "brands", // alias for the association on User's side
});

export default Brand;
