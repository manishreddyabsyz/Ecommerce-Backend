'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
  await queryInterface.addColumn("ProductDetails","image",{
    type:DataTypes.STRING,
    allowNull:false
  })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("ProductDetails","image");
  }
};
