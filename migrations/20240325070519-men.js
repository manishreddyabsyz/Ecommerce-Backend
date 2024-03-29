'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable("men",{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      category_type:{
        type:DataTypes.STRING,
        allowNull:false
      }
      ,price:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      sizes:{
        type:DataTypes.JSON,
        allowNull:false
      },
      ratings:{
        type:DataTypes.FLOAT,
        allowNull:false
      }
    })
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.dropTable("men");
  }
};
