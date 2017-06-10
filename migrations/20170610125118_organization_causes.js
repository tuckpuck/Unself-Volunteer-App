
exports.up = function(knex, Promise) {
    return knex.schema.createTable("organization_causes", function(table){
      table.integer("organization_id").references("id").inTable("organizations").notNullable();
      table.integer("cause_id").references("id").inTable("causes").notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("organization_causes");
};
