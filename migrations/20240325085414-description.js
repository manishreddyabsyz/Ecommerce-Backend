'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.addColumn("men","description",{
      type:DataTypes.STRING,
      allowNull:false
    })
  },

  async down (queryInterface, DataTypes) {
    queryInterface.removeColumn("men", "description");
  }
};
