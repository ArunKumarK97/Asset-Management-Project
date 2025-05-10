'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('asset_transactions', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      asset_id: {
        type: Sequelize.INTEGER,
        references: { model: 'assets', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      employee_id: {
        type: Sequelize.INTEGER,
        references: { model: 'employees', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      issue_date: { type: Sequelize.DATE },
      return_date: { type: Sequelize.DATE },
      return_reason: { type: Sequelize.STRING(255) },
      action: { type: Sequelize.ENUM('issue', 'return') },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('asset_transactions');
  }
};
