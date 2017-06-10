
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string("first_name", 255).notNullable();
    table.string("last_name", 255).notNullable();
    table.string("email", 255).notNullable();
    table.string("phone", 25);
    table.smallint("age");
    table.string("photo_url", 500);
    table.unique("email");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
