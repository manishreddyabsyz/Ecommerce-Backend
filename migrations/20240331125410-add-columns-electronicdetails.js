'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
   await queryInterface.addColumn("ProductDetails","title",{
    type:DataTypes.STRING,
    allowNull:false
   });
   await queryInterface.addColumn("ProductDetails","features",{
    type:DataTypes.JSON,
    allowNull:false
   });
   await queryInterface.addColumn("ProductDetails","offer_percentage",{
    type:DataTypes.FLOAT,
    allowNull:false
   })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn("ProductDetails","title");
   await queryInterface.removeColumn("ProductDetails","features");
   await queryInterface.removeColumn("ProductDetails","offer_percentage")
  }
};
