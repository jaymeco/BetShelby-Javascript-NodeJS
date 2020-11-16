exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.string('id').primary().notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('phone').notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
