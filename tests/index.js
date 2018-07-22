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

  directoryCommand(directory, ['a', '--hi', 'huh'], options, (a, b, c) => {
    directoryCommand(directory, ['b', '--hi', 'huh'], options, (a, b, c) => {
      directoryCommand(directory, ['b c', '--hi', 'huh'], options, (a, b, c) => {
        directoryCommand(directory, ['', '--hi', 'huh'], options, (a, b, c) => {
          directoryCommand(directory, ['d', '--hi', 'huh'], options, (a, b, c) => {
            t.end()
          })
        })
      })
    })
  })
})
