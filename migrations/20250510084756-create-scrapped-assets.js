'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('scrapped_assets', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      asset_id: {
        type: Sequelize.INTEGER,
        unique: true,
        references: { model: 'assets', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      scrap_date: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      reason: { type: Sequelize.TEXT }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('scrapped_assets');
  }
};
