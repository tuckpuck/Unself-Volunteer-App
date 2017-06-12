
exports.up = function(knex, Promise) {
  return knex.schema.createTable("event_roles", function(table){
    table.increments();
    table.string("start_date", 50).notNullable();
    table.string("end_date", 50).notNullable();
    table.string("start_time", 50).notNullable();
    table.string("end_time", 50).notNullable();
    table.integer("number_needed").notNullable();
    table.integer("role_id").references("id").inTable("roles").notNullable();
    table.integer("event_id").references("id").inTable("events");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("event_roles");
};
