'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('assets', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      unique_id: { type: Sequelize.STRING(100), unique: true, allowNull: false },
      serial_number: { type: Sequelize.STRING(100), unique: true, allowNull: false },
      make: { type: Sequelize.STRING(100) },
      model: { type: Sequelize.STRING(100) },
      purchase_date: { type: Sequelize.DATEONLY },
      purchase_price: { type: Sequelize.DECIMAL(12, 2) },
      status: { type: Sequelize.STRING(20), defaultValue: 'in_stock' },
      asset_category_id: {
        type: Sequelize.INTEGER,
        references: { model: 'asset_categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      branch: { type: Sequelize.STRING(100) },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('assets');
  }
};