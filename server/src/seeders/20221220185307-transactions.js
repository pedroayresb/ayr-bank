'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transactions', [
      {
        value: 100,
        creditedAccount: '1',
        debitedAccount: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        value: 200,
        creditedAccount: '2',
        debitedAccount: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        value: 300,
        creditedAccount: '3',
        debitedAccount: '4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        value: 400,
        creditedAccount: '4',
        debitedAccount: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transactions', null, {});
  }
};
