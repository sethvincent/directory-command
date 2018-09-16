var path = require('path')
var test = require('tape')

var directoryCommand = require('../index')

test('simple usage', function (t) {
  var directory = path.join(__dirname, 'fixtures', 'simple')

  var options = {
    context: {
      t: t
    }
  }

  directoryCommand(directory, ['a', '--hi', 'huh'], options)
  directoryCommand(directory, ['b', '--hi', 'huh'], options)
  directoryCommand(directory, ['b c', '--hi', 'huh'], options)
  directoryCommand(directory, ['', '--hi', 'huh'], options)
  directoryCommand(directory, ['d', '--default', 'huh'], options)
  t.end()
})
