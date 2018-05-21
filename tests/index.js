var path = require('path')
var test = require('tape')

var directoryCommand = require('../index')

test('no command found, default used', function (t) {
  var directory = path.join(__dirname, 'fixtures', 'simple')

  var defaultCommand = {
    command: function (args, flags) {
      t.ok(flags.hi)
      t.end()
    },
    options: []
  }

  var options = {
    defaultCommand
  }

  directoryCommand(directory, ['d', '--hi'], options)
})

test('simple usage', function (t) {
  var directory = path.join(__dirname, 'fixtures', 'simple')

  var options = {
    context: {
      t: t
    }
  }

  directoryCommand(directory, ['a', '--hi', 'huh'], options, (a, b, c) => {
    directoryCommand(directory, ['b', '--hi', 'huh'], options, (a, b, c) => {
      directoryCommand(directory, ['b c', '--hi', 'huh'], options, (a, b, c) => {
        t.end()
      })
    })
  })
})
