import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface SpecificationAttributes {
  id: number;
  modelId: number;
  engine: string;
  horsepower: number;
  weight: number;
}

interface SpecificationCreationAttributes
  extends Optional<SpecificationAttributes, "id"> {}

class Specification
  extends Model<SpecificationAttributes, SpecificationCreationAttributes>
  implements SpecificationAttributes
{
  public id!: number;
  public modelId!: number;
  public engine!: string;
  public horsepower!: number;
  public weight!: number;
}

Specification.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    modelId: { type: DataTypes.INTEGER, allowNull: false },
    engine: { type: DataTypes.STRING },
    horsepower: { type: DataTypes.FLOAT },
    weight: { type: DataTypes.FLOAT },
  },
  { sequelize, modelName: "Specification" }
);

export default Specification;
