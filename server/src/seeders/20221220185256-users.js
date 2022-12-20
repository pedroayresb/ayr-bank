'use strict';

import * as CryptoJS from 'crypto-js';

const hash = (password) => {
  const hash = CryptoJS.SHA256(password).toString();
  return hash;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'user1',
        password: hash('aaa123'),
        accountId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'user2',
        password: hash('bbb123'),
        accountId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'user3',
        password: hash('ccc123'),
        accountId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'user4',
        password: hash('ddd123'),
        accountId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
