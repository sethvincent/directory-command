const path = require('path')
const test = require('tape')

const directoryCommand = require('../index')

test('simple usage', function (t) {
  const directory = path.join(__dirname, 'fixtures', 'simple')

  const options = {
    context: {
      t: t
    }
  }

  directoryCommand(directory, ['a', '--hi', 'huh'], options)
  directoryCommand(directory, ['b', '--hi', 'huh'], options)
  directoryCommand(directory, ['b', 'c', '--hi', 'huh'], options)
  directoryCommand(directory, ['', '--hi', 'huh'], options)
  directoryCommand(directory, ['d', '--demo', 'huh'], options)
  directoryCommand(directory, ['int', '1', '--int', '1'], options)
  directoryCommand(directory, ['int', 1, '--int', 1], options)
  directoryCommand(directory, ['num', '1.1', '--num', '1.1'], options)
  directoryCommand(directory, ['num', 1.1, '--num', 1.1], options)
  t.end()
})
