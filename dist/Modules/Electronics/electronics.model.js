"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectronicModel = void 0;
const database_1 = require("@loaders/database");
const sequelize_1 = require("sequelize");
const electronicsdetails_model_1 = require("./electronicsdetails.model");
exports.ElectronicModel = database_1.sequelize.define("Products", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    category_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    tableName: "Products",
    timestamps: false,
});
exports.ElectronicModel.hasMany(electronicsdetails_model_1.ElectronicDetailsModel, {
    foreignKey: "category_id",
    onDelete: "CASCADE"
});
electronicsdetails_model_1.ElectronicDetailsModel.belongsTo(exports.ElectronicModel, {
    foreignKey: "category_id"
});
//# sourceMappingURL=electronics.model.js.map