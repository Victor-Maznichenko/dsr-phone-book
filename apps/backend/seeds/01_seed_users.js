const bcrypt = require('bcryptjs')
const { faker } = require('@faker-js/faker')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
function randomPhone() {
  const digits = Array.from({length: 10}, () => Math.floor(Math.random() * 10)).join('')
  return '+7' + digits
}

exports.seed = async function(knex) {
  await knex('users').del()
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1')

  // Хэш пароля для всех пользователей
  const defaultPassword = await bcrypt.hash('UserPass123!', 10)
  const adminPassword = await bcrypt.hash('AdminPass123!', 10)

  // Создаём админа (статичный)
  await knex('users').insert({
    firstName: 'Alice', 
    lastName: 'Admin',
    birthday: '1980-01-01', 
    email: 'admin@site.com',
    officePhone: '+71110000000', 
    personalPhones: ['+71110000001'],
    department: 'development', 
    position: 'lead',
    officeAddress: 'HQ Office', 
    about: 'Я админ',
    avatar: null, 
    password: adminPassword, 
    role: 'admin'
  })

  // Генерируем 10 обычных пользователей с рандомными данными
  const users = []
  for (let i = 0; i < 100; i++) {
    users.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      birthday: faker.date.between({from: '1970-01-01', to: '2000-12-31'}).toISOString().split('T')[0],
      email: faker.internet.email(),
      officePhone: randomPhone(),
      personalPhones: [randomPhone(), randomPhone()],
      department: faker.helpers.arrayElement(['development', 'marketing', 'sales', 'support']),
      position: faker.helpers.arrayElement(['junior', 'middle', 'senior']),
      officeAddress: faker.location.streetAddress(),
      about: faker.person.bio(),
      avatar: faker.image.avatar(),
      password: defaultPassword,
      role: 'user'
    })
  }

  await knex('users').insert(users)
};
