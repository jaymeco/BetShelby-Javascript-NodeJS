exports.up = function (knex) {
  return knex.schema.alterTable('horses', function (table) {
    table.text('images');
  });
};

exports.down = function (knex) {
  return knex.schema.dropColumn('images');
};
