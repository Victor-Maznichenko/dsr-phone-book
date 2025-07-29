/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('firstName').notNullable()
    table.string('lastName').notNullable()
    table.date   ('birthday').notNullable()
    table.string('email').notNullable().unique()
    table.string('officePhone').notNullable()
    table.specificType('personalPhones', 'text[]').notNullable() // массив строк
    table.enu('department', ['sales','marketing','development','hr','support']).notNullable()
    table.enu('position', ['intern','junior','middle','senior','lead','architect']).notNullable()
    table.string('officeAddress',255).notNullable()
    table.text  ('about')
    table.string('avatar')  // URL или null
    table.string('password').notNullable() // хеш
    table.enu('role', ['user','admin']).notNullable().defaultTo('user')
    table.timestamps(true,true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('users')
};
