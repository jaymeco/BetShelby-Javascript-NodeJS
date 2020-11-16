exports.up = function (knex) {
  return knex.schema.createTable('hourses', function (table) {
    table.string('id').notNullable();
    table.string('name').notNullable();
    table.string('sex').notNullable();
    table.string('breed').notNullable();
    table.integer('age').notNullable();
    table.decimal('weight').notNullable();
    table.decimal('height').notNullable();
    table.string('description').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('horses');
};
