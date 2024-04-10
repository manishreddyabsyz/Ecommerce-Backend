"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfoModel = void 0;
const database_1 = require("@loaders/database");
const sequelize_1 = require("sequelize");
exports.UserInfoModel = database_1.sequelize.define("userinfo", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
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
    cart: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    wishlist: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
}, {
    tableName: "userinfo",
    timestamps: false,
});
//# sourceMappingURL=userInfo.model.js.map