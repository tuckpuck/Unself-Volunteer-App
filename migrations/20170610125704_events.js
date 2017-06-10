
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("events", function(table){
    table.string("description", 255).alter();
    table.integer("organization_id").references("id").inTable("organizations").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("events", function(table){
    table.string("description", 1024).alter();
    table.dropColumn("organization_id");
  });
};
