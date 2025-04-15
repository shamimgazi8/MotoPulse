import { DataTypes, Model as SequelizeModel, Optional } from "sequelize";
import sequelize from "../config/db";

interface BikeTypeAttributes {
  id: number;
  name: string;
}

interface BikeTypeCreationAttributes
  extends Optional<BikeTypeAttributes, "id"> {}

class BikeType
  extends SequelizeModel<BikeTypeAttributes, BikeTypeCreationAttributes>
  implements BikeTypeAttributes
{
  public id!: number;
  public name!: string;
}

BikeType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "BikeType",
    tableName: "bikeTypes",
    timestamps: false,
  }
);

export default BikeType;
