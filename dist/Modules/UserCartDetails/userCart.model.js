"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemsModel = void 0;
const database_1 = require("@loaders/database");
const sequelize_1 = require("sequelize");
exports.CartItemsModel = database_1.sequelize.define("cartitems", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
            model: {
                tableName: "users",
            },
            key: "id",
        },
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
            model: {
                tableName: "ProductDetails",
            },
            key: "id",
        },
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    unit_price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    total_price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    tableName: "cartItems",
    timestamps: false,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
//# sourceMappingURL=userCart.model.js.map