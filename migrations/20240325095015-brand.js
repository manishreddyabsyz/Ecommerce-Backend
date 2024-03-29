'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.addColumn("men","brand",{
      type:DataTypes.STRING,
      allowNull:false
    })
  },

  async down (queryInterface) {
    queryInterface.removeColumn("men", "brand");
  }
};
