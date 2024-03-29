import { sequelize } from "@loaders/database";
import { DataTypes, ModelDefined } from "sequelize";
import { IElectronics, CreationIElectronicsDTO } from "../Electronics/electronics.dtos";

export const ElectronicDetailsModel: ModelDefined<IElectronics, CreationIElectronicsDTO> =
    sequelize.define(
        "ElectronicDetails",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            category_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
                references: {
                    model: {
                        tableName: "Electronics"
                    },
                    key: "id"
                }
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            ratings: {
                type: DataTypes.FLOAT,
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
            tableName: "ElectronicDetails",
            timestamps: false,
        }
    );
