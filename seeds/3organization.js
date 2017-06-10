
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('organizations').del()
  .then(function () {
    // Inserts seed entries
    return knex('organizations').insert([
      {id: 1, name: 'Wilderness on Wheels', phone: '(303) 403-1110', email: 'wildernessonwheels@gmail.com', web_url: 'http://www.wildernessonwheels.org/', description: 'Providing ACCESS TO NATURE for people of all abilities, their family and caregivers for over 30 years.', photo_url: 'img/wildernessOnWheels.png'},
      {id: 2, name: 'Boulder Rotary Club', phone: '(720) 772-1091', email: 'clubadmin@boulderrotary.org', web_url: 'http://www.boulderrotary.org/', description: 'Benefiting our Community and our World through action, integrity, service and fellowship', photo_url: 'img/boulderRotary.png'},
      {id: 3, name: 'Boulder Shelter for the Homeless', phone: '303-442-4646', email: 'info@bouldershelter.org', web_url: 'http://www.bouldershelter.org/', description: 'We believe that all people deserve the basic necessities of life, and the community in which we live is called to serve this purpose.', photo_url: 'img/bouldershelter.png'},
      {id: 4, name: "Women's Bean Project", phone: '303.292.1919', email: 'info@womensbeanproject.com', web_url: 'https://www.womensbeanproject.com/', description: 'The mission of Women’s Bean Project is to change women’s lives by providing stepping stones to self-sufficiency through social enterprise.', photo_url: 'img/womensbean.png'},
    ])
    .then(() => {
      return knex.raw("SELECT setval('organizations_id_seq', (SELECT MAX(id) FROM organizations))");
    });
  });
};
