/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('access_requests', (table) => {
    table.increments('id').primary();
    table.integer('requesterId').notNullable()
      .references('id').inTable('users')
      .onDelete('CASCADE');
    table.integer('targetUserId').notNullable()
      .references('id').inTable('users')
      .onDelete('CASCADE');
    table.enu('status', ['pending', 'approved', 'rejected']).notNullable().defaultTo('pending');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('access_requests');
};
