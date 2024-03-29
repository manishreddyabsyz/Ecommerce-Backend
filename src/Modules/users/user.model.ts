import { sequelize } from "@loaders/database";
import { DataTypes, ModelDefined } from "sequelize";
import { CreationIUsersDTO, IUsers } from "../users/users.dtos";

export const  UsersModel: ModelDefined<IUsers, CreationIUsersDTO> =
  sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
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
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accesstoken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refreshtoken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "Users",
      timestamps: false,
    }
  );
