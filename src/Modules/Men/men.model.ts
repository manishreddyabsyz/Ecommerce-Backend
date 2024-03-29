import { sequelize } from "@loaders/database";
import { DataTypes, ModelDefined } from "sequelize";
import { IMen, CreationIMenDTO } from "./men.dtos";
export const MenModel: ModelDefined<IMen, CreationIMenDTO> = sequelize.define(
  "Men",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sizes: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    ratings: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);
