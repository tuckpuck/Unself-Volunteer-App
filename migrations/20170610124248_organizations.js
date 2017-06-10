
exports.up = function(knex, Promise) {
    return knex.schema.createTable("organization", function(table){
      table.increments();
      table.string("name", 255).notNullable();
      table.string("phone", 25);
      table.string("email", 255);
      table.string("web_url", 500);
      table.string("description", 255);
      table.string("photo_url");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("organizations");
};
