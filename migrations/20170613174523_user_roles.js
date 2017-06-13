
exports.up = function(knex, Promise) {
  return knex.schema.createTable("user_event_roles",   function(table){
    table.integer("user_id").references("id").inTable("users").notNullable();
    table.integer("event_role_id").references("id").inTable("event_roles").notNullable();
    table.primary(["user_id", "event_role_id"]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("user_event_roles");
};
