exports.up = function(knex, Promise) {
  return knex.schema.alterTable("events", function(table){
    table.string("start_date", 255).notNullable().alter();
    table.string("end_date", 255).notNullable().alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("events", function(table){
    table.date("start_date").notNullable().alter();
    table.date("end_date").notNullable().alter();
  });
};
