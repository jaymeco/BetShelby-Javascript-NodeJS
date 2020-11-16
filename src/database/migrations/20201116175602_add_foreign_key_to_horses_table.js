exports.up = function (knex) {
  return knex.schema.alterTable('horses', function (table) {
    table
      .string('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropColumn('user_id');
};
