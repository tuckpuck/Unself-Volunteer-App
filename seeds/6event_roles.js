exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('event_roles').del()
    .then(function() {
      // Inserts seed entries
      return knex('event_roles').insert([
        {
          id: 1,
          start_date: '07-22-2017',
          end_date: '07-23-2017',
          start_time: '9:00AM',
          end_time: '5:00PM',
          number_needed: 4,
          role_id: 1,
          event_id: 1
        },
        {
          id: 2,
          start_date: '07-22-2017',
          end_date: '07-23-2017',
          start_time: '9:00AM',
          end_time: '5:00PM',
          number_needed: 2,
          role_id: 5,
          event_id: 1
        },
        {
          id: 3,
          start_date: '08-12-2017',
          end_date: '08-12-2017',
          start_time: '4:00PM',
          end_time: '7:00PM',
          number_needed: 1,
          role_id: 4,
          event_id: 2
        },
        {
          id: 4,
          start_date: '08-12-2017',
          end_date: '08-12-2017',
          start_time: '4:00PM',
          end_time: '7:00PM',
          number_needed: 3,
          role_id: 3,
          event_id: 2
        },
        {
          id: 5,
          start_date: '08-12-2017',
          end_date: '08-12-2017',
          start_time: '4:00PM',
          end_time: '7:00PM',
          number_needed: 2,
          role_id: 2,
          event_id: 2
        },
        {
          id: 6,
          start_date: '08-12-2017',
          end_date: '08-12-2017',
          start_time: '10:00AM',
          end_time: '4:00PM',
          number_needed: 1,
          role_id: 2,
          event_id: 3
        },
        {
          id: 7,
          start_date: '09-01-2017',
          end_date: '09-01-2017',
          start_time: '12:00PM',
          end_time: '1:00PM',
          number_needed: 2,
          role_id: 6,
          event_id: 4
        },
        {
          id: 8,
          start_date: '09-01-2017',
          end_date: '09-01-2017',
          start_time: '12:00PM',
          end_time: '1:00PM',
          number_needed: 2,
          role_id: 3,
          event_id: 4
        },
        {
          id: 9,
          start_date: '09-01-2017',
          end_date: '09-01-2017',
          start_time: '12:00PM',
          end_time: '1:00PM',
          number_needed: 1,
          role_id: 4,
          event_id: 4
        }
      ])
      .then(() => {
        return knex.raw("SELECT setval('event_roles_id_seq', (SELECT MAX(id) FROM event_roles))");
    });
  });
};
