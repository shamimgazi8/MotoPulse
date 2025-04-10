import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface ManufacturerAttributes {
  id: number;
  name: string;
  headquarters: string;
}

interface ManufacturerCreationAttributes
  extends Optional<ManufacturerAttributes, "id"> {}

class Manufacturer
  extends Model<ManufacturerAttributes, ManufacturerCreationAttributes>
  implements ManufacturerAttributes
{
  public id!: number;
  public name!: string;
  public headquarters!: string;
}

Manufacturer.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    headquarters: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "Manufacturer" }
);

export default Manufacturer;
