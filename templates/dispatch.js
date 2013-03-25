var master = require('pm').createMaster({
  'pidfile' : '/tmp/demo.pid'
});

master.register('group1', __dirname + '/app.js', {
  'listen' : [7001]
});

master.on('giveup', function (name, num, pause) {
  // YOU SHOULD ALERT HERE!
});

master.dispatch();
