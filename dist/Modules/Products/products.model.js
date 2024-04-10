"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectronicModel = void 0;
const database_1 = require("@loaders/database");
const sequelize_1 = require("sequelize");
const productsdetails_model_1 = require("./productsdetails.model");
exports.ElectronicModel = database_1.sequelize.define("Products", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    category_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
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
    product_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "Products",
    timestamps: false,
});
exports.ElectronicModel.hasMany(productsdetails_model_1.ProductDetailsModel, {
    foreignKey: "category_id",
    onDelete: "CASCADE",
});
productsdetails_model_1.ProductDetailsModel.belongsTo(exports.ElectronicModel, {
    foreignKey: "category_id",
});
//# sourceMappingURL=products.model.js.map