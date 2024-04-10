'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
   await queryInterface.createTable("cartItems",{
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      allowNull:false
    },
    user_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      onDelete:"CASCADE",
      onUpdate:"CASCADE",
      references:{
        model:{
          tableName:"users",
        },
        key:"id",
      }
    },
    product_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      onDelete:"CASCADE",
      onUpdate:"CASCADE",
      references:{
        model:{
          tableName:"ProductDetails"
        },
        key:"id"
      }
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
   })
  },

  async down (queryInterface) {
    await queryInterface.dropTable("cartItems")
  }
};
