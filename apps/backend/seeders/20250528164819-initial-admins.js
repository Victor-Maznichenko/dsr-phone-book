const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    const saltRounds = 10;
    const admins = [
      {
        email: 'admin1@example.com',
        password: await bcrypt.hash('SecurePassword123!', saltRounds),
        fullName: 'Главный Администратор',
        birthDate: new Date(1980, 0, 1),
        workPhone: '+79991234567',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'admin2@example.com',
        password: await bcrypt.hash('AnotherSecurePass!', saltRounds),
        fullName: 'Заместитель Администратора',
        birthDate: new Date(1985, 5, 15),
        workPhone: '+79997654321',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('users', admins);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', {
      email: { [Sequelize.Op.in]: ['admin1@example.com', 'admin2@example.com'] }
    });
  }
};
