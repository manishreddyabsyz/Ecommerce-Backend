"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDetailsModel = void 0;
const database_1 = require("@loaders/database");
const sequelize_1 = require("sequelize");
exports.ProductDetailsModel = database_1.sequelize.define("ProductDetails", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    category_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
            model: {
                tableName: "Electronics",
            },
            key: "id",
        },
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    ratings: {
        type: sequelize_1.DataTypes.FLOAT,
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
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    features: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    offer_percentage: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "ProductDetails",
    timestamps: false,
});
//# sourceMappingURL=productsdetails.model.js.map