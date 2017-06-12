
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("users", function(table){
    table.dropColumn("organization_id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("users", function(table){
    table.integer("organization_id").references("id").inTable("organizations");
  });
};
