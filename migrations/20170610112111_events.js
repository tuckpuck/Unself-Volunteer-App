
exports.up = function(knex, Promise) {
  return knex.schema.createTable("events", function(table){
    table.increments();
    table.string("name", 255).notNullable();
    table.string("street_address", 255);
    table.integer("city_id").references("id").inTable("cities");
    table.string("zip_code");
    table.date("start_date").notNullable();
    table.date("end_date").notNullable();
    table.string("start_time", 10).notNullable();
    table.string("end_time", 10).notNullable();
    table.string("description", 1024).notNullable();
    table.string("event_url", 512);
    table.string("photo_url", 512);
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("events");
};
