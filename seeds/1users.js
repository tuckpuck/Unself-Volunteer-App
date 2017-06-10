
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(function () {
    // Inserts seed entries
    return knex('users').insert([
      {id: 1, first_name: 'Maggy', last_name: 'Pittman', email: 'Quisque.varius@eterosProin.ca', phone: '035-664-8589'},
      {id: 2, first_name: 'Mona', last_name: 'Morris', email: 'urna@Fusce.co.uk', phone: '753-637-1228'},
      {id: 3, first_name: 'Judith', last_name: 'Meadows', email: 'nulla.Donec@atfringilla.ca', phone: '809-043-6872'},
      {id: 4, first_name: 'Thaddeus', last_name: 'Guthrie', email: 'elit@mifelis.ca', phone: '187-354-1840'},
      {id: 5, first_name: 'Kirk', last_name: 'Carr', email: 'dolor.Donec@VivamusnisiMauris.org', phone: '309-268-3975'}
    ])
    .then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
    });
  });
};
