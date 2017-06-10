
exports.up = function(knex, Promise) {
  return knex.schema.createTable('states', function(table){
    table.increments();
    table.specificType("state_code", "char(4)").notNullable();
    table.string("state_name", 30).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('states');
};
