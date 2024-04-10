'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.addColumn("cartItems","total_price",{
      type:DataTypes.FLOAT,
      allowNull:false
    })
  },

  async down (queryInterface,DataTypes) {
   await queryInterface.removeColumn("cartItems","total_price")
  }
};
