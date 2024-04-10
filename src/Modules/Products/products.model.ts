import { sequelize } from "@loaders/database";
import { DataTypes, ModelDefined } from "sequelize";
import { IElectronics, CreationIElectronicsDTO } from "./products.dtos";
import { ProductDetailsModel } from "./productsdetails.model";

export const ElectronicModel: ModelDefined<
  IElectronics,
  CreationIElectronicsDTO
> = sequelize.define(
  "Products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    category_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    product_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Products",
    timestamps: false,
  }
);
ElectronicModel.hasMany(ProductDetailsModel, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

ProductDetailsModel.belongsTo(ElectronicModel, {
  foreignKey: "category_id",
});
