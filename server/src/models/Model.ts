import { DataTypes, Model as SequelizeModel, Optional } from "sequelize";
import sequelize from "../config/db";
import Brand from "./Brand";
import Manufacturer from "./Manufacturer";
import BikeType from "./BikeType";

interface ModelAttributes {
  id: number;
  name: string;
  year: number;
  brandId: number;
  manufacturerId: number;
  bikeTypeId: number;
}

interface ModelCreationAttributes extends Optional<ModelAttributes, "id"> {}

class Model
  extends SequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ModelAttributes
{
  public id!: number;
  public name!: string;
  public year!: number;
  public brandId!: number;
  public manufacturerId!: number;
  public bikeTypeId!: number;
}

Model.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    year: { type: DataTypes.INTEGER },
    brandId: { type: DataTypes.INTEGER, allowNull: false },
    manufacturerId: { type: DataTypes.INTEGER, allowNull: false },
    bikeTypeId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "Model" }
);

// Set up associations in index.ts

export default Model;
