exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {id: 1, name: 'Weekend Nature Walk', street_address: '4595 Highway 285', city_id: null, zip_code: '80448', start_date: '07-22-2017', end_date: '07-23-2017', start_time: '9:00AM', end_time: '5:00PM', description: 'Join us on our 1-mile boardwalk that allows everyone - young and old, diasabled and abled, individuals and groups - to roll and stroll through the beautiful Colorado mountains.', event_url: 'http://www.wildernessonwheels.org/', photo_url: 'https://wildernessonwheels.files.wordpress.com/2014/09/wilderness-on-wheels-14.jpg', organization_id: 1},

        {id: 2, name: 'Wine2Water', street_address: '1930 Central Avenue', city_id: null, zip_code: '80301', start_date: '08-12-2017', end_date: '08-12-2017', start_time: '4:00PM', end_time: '7:00PM', description: 'Come hang out with members, drink wine, and help us fundraise for upcoming projects', event_url: 'http://boulderrotary.org/event/wine2water-fundraiser/', photo_url: 'http://winegifted.com/wp-content/uploads/2015/06/Friends-with-wine.jpg', organization_id: 2},

        {id: 3, name: '23rd Annual Boulder Shelter Golf Classic', street_address: '1400 CO-119', city_id: null, zip_code: '80504', start_date: '08-12-2017', end_date: '08-12-2017', start_time: '10:00AM', end_time: '4:00PM', description: 'Join us for a wonderful day of golf to benefit the Boulder Shelter for the Homeless.', event_url: 'http://www.bouldershelter.org/fund.golfwithregistration.html', photo_url: 'http://bayareafca.org/Websites/bayareafca/images/Golf/Golf_2015_/IMG_0863.jpg', organization_id: 3},

        {id: 4, name: 'BeansTalk Lunch Tour', street_address: '3201 Curtis Street', city_id: null, zip_code: '80205', start_date: '09-01-2017', end_date: '09-01-2017', start_time: '12:00PM', end_time: '1:00PM', description: 'This is a great opportunity to sample our products, learn about the history of Women’s Bean Project, and help out around the facility!', event_url: 'https://www.womensbeanproject.com/event/beanstalk-lunch-tour-september-2017/', photo_url: 'http://i.vimeocdn.com/video/475737376_1280x720.jpg', organization_id: 4},
      ])
      .then(() => {
        return knex.raw("SELECT setval('events_id_seq', (SELECT MAX(id) FROM events))");
      });
    });
};
