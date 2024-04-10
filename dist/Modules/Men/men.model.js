"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenModel = void 0;
const database_1 = require("@loaders/database");
const sequelize_1 = require("sequelize");
exports.MenModel = database_1.sequelize.define("Men", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    category_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    sizes: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    ratings: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    brand: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "Men",
    timestamps: false,
});
//# sourceMappingURL=men.model.js.map