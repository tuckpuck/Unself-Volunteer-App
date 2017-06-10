
exports.up = function(knex, Promise) {
  return knex.schema.createTable("event_causes", function(table){
    table.integer("event_id").references("id").inTable("events").notNullable();
    table.integer("cause_id").references("id").inTable("causes").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("event_causes");
};
