exports.up = async function (knex) {
  await knex.schema.dropTableIfExists('cars')
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl.text('vin').notNullable().unique()
    tbl.text('make').notNullable()
    tbl.text('model').notNullable()
    tbl.integer('mileage').notNullable()
    tbl.text('title')
    tbl.text('transmission')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars')
};
