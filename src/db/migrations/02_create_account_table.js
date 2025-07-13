// migrations/01_create_users_table.js
exports.up = function(knex) {
  return knex.schema.createTable('bank_accounts', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('account_number').notNullable().unique();
    table.string('account_name').notNullable();
    table.string('bank_name').notNullable();
    table.boolean('is_permanent').notNullable().defaultTo(false);
    table.decimal('initial_amount', 12, 2).notNullable().defaultTo(0.00); // string "100" parsed to decimal
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('bank_accounts');
};