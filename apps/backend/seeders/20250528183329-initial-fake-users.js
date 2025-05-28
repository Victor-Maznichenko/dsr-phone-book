const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => {
    const users = [];
    const userPhones = [];
    const saltRounds = 10;
    const departments = ['IT', 'HR', 'Sales', 'Marketing', 'Finance'];

    // Создаем 100 пользователей
    for (let i = 0; i < 100; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email(firstName, lastName);
      const password = await bcrypt.hash('Password123!', saltRounds);
      
      users.push({
        email,
        password,
        fullName: `${firstName} ${lastName}`,
        birthDate: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        hideBirthYear: faker.datatype.boolean(),
        workPhone: faker.phone.number(),
        position: faker.person.jobTitle(),
        department: departments[Math.floor(Math.random() * departments.length)],
        workAddress: `${faker.location.streetAddress()}, кабинет ${faker.number.int({ min: 100, max: 500 })}`,
        about: faker.lorem.paragraph(),
        photo: faker.image.avatar(),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Вставляем пользователей
    const insertedUsers = await queryInterface.bulkInsert('Users', users, { returning: true });

    // Добавляем личные телефоны
    insertedUsers.forEach(user => {
      const phoneCount = faker.number.int({ min: 1, max: 3 });
      for (let i = 0; i < phoneCount; i++) {
        userPhones.push({
          userId: user.id,
          phone: faker.phone.number(),
          hidePhone: faker.datatype.boolean(),
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });

    await queryInterface.bulkInsert('UserPhones', userPhones);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('UserPhones', null, {});
  }
};
