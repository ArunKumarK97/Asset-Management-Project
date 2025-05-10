'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('assets', [
      {
        unique_id: 'ASSET001',
        serial_number: 'SN123456',
        make: 'Dell',
        model: 'XPS 13',
        purchase_date: '2024-01-15',
        purchase_price: 1200.00,
        status: 'in_stock',
        asset_category_id: 1,
        branch: 'New York',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        unique_id: 'ASSET002',
        serial_number: 'SN654321',
        make: 'Apple',
        model: 'iPhone 13',
        purchase_date: '2024-02-01',
        purchase_price: 999.99,
        status: 'in_stock',
        asset_category_id: 2,
        branch: 'San Francisco',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('assets', null, {});
  }
};
