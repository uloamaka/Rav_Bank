// migrations/01_create_users_table.js
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('phone_number').notNullable().unique();
    table.string('role').notNullable().defaultTo('user');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};