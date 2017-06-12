
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('user_auth', function(table) {
    table.dropColumn('user_id');
    table.primary('email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('user_auth', function (table) {
    table.dropPrimary();
    table.integer('user_id').references('user_id').inTable('users').primary();
  });
};
