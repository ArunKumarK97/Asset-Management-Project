module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('asset_categories', [
      {
        name: 'Laptop',
        description: 'Portable computer',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Mobile Phone',
        description: 'Smartphones issued to employees',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('asset_categories', null, {});
  }
};