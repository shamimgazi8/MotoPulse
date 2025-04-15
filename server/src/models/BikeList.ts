import { DataTypes, Model as SequelizeModel, Optional } from "sequelize";
import sequelize from "../config/db";
import Brand from "./Brand";
import Model from "./Model";
import BikeType from "./BikeType";

interface BikeListAttributes {
  id: number;
  brand_id: number;
  model_id: number;
  bike_type_id: number;
  imgUrl: string;
  engineCC: number;
  horsePower: number;
  torque: number;
  weight: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BikeListCreationAttributes
  extends Optional<BikeListAttributes, "id"> {}

class BikeList
  extends SequelizeModel<BikeListAttributes, BikeListCreationAttributes>
  implements BikeListAttributes
{
  public id!: number;
  public brand_id!: number;
  public model_id!: number;
  public bike_type_id!: number;
  public imgUrl!: string;
  public engineCC!: number;
  public horsePower!: number;
  public torque!: number;
  public weight!: number;

  // Optional: for TypeScript access
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BikeList.init(
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
        model: "brands",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    model_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "models",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    bike_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "bikeTypes",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    engineCC: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    horsePower: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    torque: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "BikeList",
    tableName: "bikes",
    timestamps: true, // Auto-manages createdAt and updatedAt
  }
);

// Associations
BikeList.belongsTo(Brand, { foreignKey: "brand_id", as: "brand" });
BikeList.belongsTo(Model, { foreignKey: "model_id", as: "model" });
BikeList.belongsTo(BikeType, { foreignKey: "bike_type_id", as: "type" });

export default BikeList;
