'use strict';



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface,DataTypes) {
    await queryInterface.addColumn("Products","product_type",{
      type:DataTypes.STRING,
      allowNull:false
    })
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.removeColumn("Products","product_type");
   
  }
};
