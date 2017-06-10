
exports.up = function(knex, Promise) {
    return knex.schema.createTable("organization_causes", function(table){
      table.integer("organization_id").references("id").inTable("organizations").notNullable().onDelete("cascade");
      table.integer("cause_id").references("id").inTable("causes").notNullable().onDelete("cascade");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("organization_causes");
};
