// migrations/01_create_users_table.js
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('first_name').nullable(); 
    table.string('last_name').nullable();
    table.string('phone').nullable();
    table.string('role').notNullable().defaultTo('user');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};