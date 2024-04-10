'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Products",{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      category_type:{
        type:DataTypes.STRING,
        allowNull:false
      },
      image:{
        type:DataTypes.STRING,
        allowNull:false
      },
      title:{
        type:DataTypes.STRING,
        allowNull:false
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  }
};
