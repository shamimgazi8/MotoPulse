import { DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../config/db";

// Attributes in the User table
interface UserAttributes {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  address?: string | null;
  profile_url?: string | null;
}

// For creation, id is optional because it's auto-incremented
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public email!: string;
  public password!: string;
  public address?: string | null;
  public profile_url?: string | null;

  // Method to hide sensitive info in responses
  toJSON() {
    const values = { ...this.get() } as any;
    delete values.password;
    return values;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User;
