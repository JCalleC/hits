var dir  = __dirname.split('/')[__dirname.split('/').length-1];
var file = dir + __filename.replace(__dirname, '') + " > ";
var test = require('tape');
var extract = require('../lib/extract_request_data.js');

test(file+'Add a hit to the list for that url', function (t) {
  var db = require('../lib/db_filesystem.js');
  var req = {
    'url': '/my/awesome/url',
    headers: {
      'accept-language': 'en-US,en;q=0.8,pt;q=0.6,es;',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5)'
    },
    connection: {
      remoteAddress: '88.88.88.88'
    }
  }
  var hit = extract(req);
  db(hit, function (err, count) {
    t.ok(count >= 0, '✓ URL ' +req.url +' has: ' + count)
    db(hit, function (err, count2) {
      t.ok(count === count2 - 1, '✓ URL ' +req.url +' has: ' + count2)
      require('decache')('../lib/db_filesystem.js')
      t.end();
    })
  })
});

test(file + 'Add a hit for new url', function (t) {
  var db = require('../lib/db_filesystem.js');
  var req = {
    'url': '/another/' + Math.floor(Math.random() * 100000),
    headers: {
      'accept-language': 'en-US,en;q=0.8,pt;q=0.6,es;',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5)'
    },
    connection: {
      remoteAddress: '88.88.88.88'
    }
  }
  var hit = extract(req);
  db(hit, function (err, count) {
    t.equal(count, 1, '✓ URL ' +req.url +' has: ' + count)
    db(hit, function (err, count2) {
      t.ok(count === count2 - 1, '✓ URL ' +req.url +' has: ' + count2)
      t.end();
    })
  })
});
