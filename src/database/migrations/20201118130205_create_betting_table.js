exports.up = function (knex) {
  return knex.schema.createTable('betting', function (table) {
    table.string('id').primary().notNullable();
    table.decimal('bet_amount').notNullable();
    table
      .string('horse_id')
      .notNullable()
      .references('id')
      .inTable('horses')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('betting');
};
