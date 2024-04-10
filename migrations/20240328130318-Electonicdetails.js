'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable("ProductDetails",{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      category_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        onDelete:"CASCADE",
        onUpdate:"CASCADE",
        references:{
          model : {
            tableName:"Electronics"
          },
          key:"id"
        }
      },
      price:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      ratings:{
        type:DataTypes.FLOAT,
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

  async down (queryInterface) {
   await queryInterface.dropTable("ProductDetails")
  }
};
