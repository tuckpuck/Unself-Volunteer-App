
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles').del()
  .then(function () {
    // Inserts seed entries
    return knex('roles').insert([
      {id: 1, name: 'Trail Builder', description: 'Build wooden boardwalks.', organization_id: 1},
      {id: 2, name: 'Ticket Sales', description: 'Sell tickets for events.', organization_id: 2},
      {id: 3, name: 'Meal Server', description: 'Serve meals at shelter daily.', organization_id: 3},
      {id: 4, name: 'Dining Room Manager', description: 'Supervise dining room area during meals.', organization_id: 3},
      {id: 5, name: 'Gift Shop Volunteer', description: 'Help customers in the gift shop.', organization_id: 4},
      {id: 6, name: 'Coach', description: 'Coach women on life skills.', organization_id: 3},
    ]);
  });
};
