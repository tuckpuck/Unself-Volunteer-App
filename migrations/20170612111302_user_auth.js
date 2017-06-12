
exports.up = function(knex, Promise) {
  return knex.schema.createTable("user_auth", function(table){
    table.integer("user_id").references("id").inTable("users").notNullable().primary();
    table.string("email", 255).notNullable().unique();
    table.specificType("hashed_password", "char(60)").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("user_auth");
};
