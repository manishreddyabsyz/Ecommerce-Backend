import { sequelize } from "@loaders/database";
import { DataTypes, ModelDefined } from "sequelize";
import { IElectronics, CreationIElectronicsDTO } from "../Electronics/electronics.dtos";
import { ElectronicDetailsModel } from "./electronicsdetails.model";

export const ElectronicModel: ModelDefined<IElectronics, CreationIElectronicsDTO> =
    sequelize.define(
        "Electronics",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            category_type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
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
        },
        {
            tableName: "Electronics",
            timestamps: false,
        }
    );
ElectronicModel.hasMany(ElectronicDetailsModel, {
    foreignKey: "category_id",
    onDelete: "CASCADE"
});


ElectronicDetailsModel.belongsTo(ElectronicModel, {
    foreignKey: "category_id"
});
