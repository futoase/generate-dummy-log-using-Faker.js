var fs = require('fs')
  , Moment = require('moment')
  , Mustache = require('mustache')
  , Faker = require('Faker');

var TICK_MICRO_SECOND = 10
  , FILE_NAME = 'output.log';

var ROW_TEMPLATE = "[{{ createdAt }}] - user_id: {{ userId }} name: {{ name }} ip: {{ ipAddress }}\n";

setInterval(function() {

  var record = Mustache.render(ROW_TEMPLATE, {
    userId: Faker.Helpers.randomNumber(100000),
    name: Faker.Name.findName(),
    ipAddress: Faker.Internet.ip(),
    createdAt: Moment(Faker.Date.between("2010-09-10", "2014-03-10")).format()
  });

  fs.appendFileSync(FILE_NAME, record);
  console.log(record);

}, TICK_MICRO_SECOND);
