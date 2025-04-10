import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface BrandAttributes {
  id: number;
  name: string;
  country: string;
}

interface BrandCreationAttributes extends Optional<BrandAttributes, "id"> {}

class Brand
  extends Model<BrandAttributes, BrandCreationAttributes>
  implements BrandAttributes
{
  public id!: number;
  public name!: string;
  public country!: string;
}

Brand.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "Brand" }
);

export default Brand;
