'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('accounts', [
      {
        balance: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        balance: 2000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        balance: 3000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        balance: 4000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('accounts', null, {});
  }
};
