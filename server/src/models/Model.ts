import { DataTypes, Model as SequelizeModel, Optional } from "sequelize";
import sequelize from "../config/db";
import Brand from "./Brand"; // Importing Brand for association

interface ModelAttributes {
  id: number;
  brand_id: number;
  manufacturer: string;
  modelName: string;
  year: number; // <-- Added year
}

interface ModelCreationAttributes extends Optional<ModelAttributes, "id"> {}

class Model
  extends SequelizeModel<ModelAttributes, ModelCreationAttributes>
  implements ModelAttributes
{
  public id!: number;
  public brand_id!: number;
  public manufacturer!: string;
  public modelName!: string;
  public year!: number; // <-- Added year
}

Model.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "brands", // matches table name of Brand
        key: "id",
      },
      onDelete: "CASCADE",
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false, // you can set to true if you want it optional
    },
  },
  {
    sequelize,
    modelName: "Model",
    tableName: "models",
    timestamps: true,
  }
);

// Association
Model.belongsTo(Brand, { foreignKey: "brand_id", as: "brand" });

export default Model;
