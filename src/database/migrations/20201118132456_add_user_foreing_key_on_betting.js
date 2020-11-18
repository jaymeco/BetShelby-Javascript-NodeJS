exports.up = function (knex) {
  return knex.schema.alterTable('betting', function (table) {
    table
      .string('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropColumn('user_id');
};
