
exports.up = function(knex, Promise) {
  return knex.schema.createTable("roles", function(table){
    table.increments();
    table.string("name", 50).notNullable();
    table.string("description", 255).notNullable();
    table.integer("organization_id").references("id").inTable("organizations").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("roles");
};
