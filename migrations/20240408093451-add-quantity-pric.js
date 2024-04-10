'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.addColumn("cartItems","quantity",{
      type:DataTypes.INTEGER,
      allowNull:false
    }),
    await queryInterface.addColumn("cartItems","unit_price",{
      type:DataTypes.FLOAT,
      allowNull:false
    })
   
  },

  async down (queryInterface) {
    await queryInterface.removeColumn("cartItems","quantity")
    await queryInterface.removeColumn("cartItems","unit_price")
  }
};
