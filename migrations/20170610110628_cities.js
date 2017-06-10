
exports.up = function(knex, Promise) {
  return knex.schema.createTable("cities", function(table){
    table.increments();
    table.string("name", 255).notNullable();
    table.integer("state_id").references("id").inTable("states").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("cities");
};
