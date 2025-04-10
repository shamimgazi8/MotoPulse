import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface BikeTypeAttributes {
  id: number;
  type: string;
}

interface BikeTypeCreationAttributes
  extends Optional<BikeTypeAttributes, "id"> {}

class BikeType
  extends Model<BikeTypeAttributes, BikeTypeCreationAttributes>
  implements BikeTypeAttributes
{
  public id!: number;
  public type!: string;
}

BikeType.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "BikeType" }
);

export default BikeType;
