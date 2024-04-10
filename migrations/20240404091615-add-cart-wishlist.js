'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
  await queryInterface.addColumn("users","cart",{
    type:DataTypes.JSON,
    allowNull:false
  })
  await queryInterface.addColumn("users","wishlist",{
    type:DataTypes.JSON,
    allowNull:false
  })
  },

  async down (queryInterface,DataTypes) {
   await queryInterface.removeColumn("users","cart");
   await queryInterface.removeColumn("users","wishlist")
  }
};
