'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('employees', [
      {
        name: 'Alice Smith',
        email: 'alice@example.com',
        phone: '1234567890',
        status: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        phone: '9876543210',
        status: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('employees', null, {});
  }
};