
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('causes').del()
  .then(function () {
    // Inserts seed entries
    return knex('causes').insert([
      {id: 1, name: 'Homeless Pets'},
      {id: 2, name: 'Vets'},
      {id: 3, name: 'Refugees'},
      {id: 4, name: 'Domestic Violence'},
      {id: 5, name: 'Clean Water'},
    ])
    .then(() => {
      return knex.raw("SELECT setval('causes_id_seq', (SELECT MAX(id) FROM causes))");
    });
  });
};
