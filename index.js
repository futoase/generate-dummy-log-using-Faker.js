var fs = require('fs')
  , Optparse = require('optparse')
  , Moment = require('moment')
  , Mustache = require('mustache')
  , Faker = require('Faker');

var TICK_MICRO_SECOND = 10
  , FILE_NAME = 'output.log'
  , OPT_SWITCHES = [
    ['-f', '--file-path NAME', 'Save file path'],
    ['-t', '--tick NUMBER', 'Tick time']
  ];

var parser = new Optparse.OptionParser(OPT_SWITCHES)
  , options = {
       filePath: 'output.log'
     , tick: 10
  };

parser.on('file-path', function(name, value) {
  options.filePath = value;
});

parser.on('tick', function(name, value) {
  options.tick = parseInt(value);
});

parser.parse(process.argv);

var ROW_TEMPLATE = "[{{ createdAt }}] - user_id: {{ userId }} name: {{ name }} ip: {{ ipAddress }}\n";

setInterval(function() {

  var record = Mustache.render(ROW_TEMPLATE, {
    userId: Faker.Helpers.randomNumber(100000),
    name: Faker.Name.findName(),
    ipAddress: Faker.Internet.ip(),
    createdAt: Moment(Faker.Date.between("2010-09-10", "2014-03-10")).format()
  });

  fs.appendFileSync(options.filePath, record);
  console.log(record);

}, options.tick);
