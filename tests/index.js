const path = require('path')
const test = require('tape')

const directoryCommand = require('../index')

test('simple usage', function (t) {
  const directory = path.join(__dirname, 'fixtures', 'simple')

  const options = {
    commandName: 'test',
    context: {
      t: t
    }
  }

  directoryCommand(directory, ['a', '--hi', 'huh'], options)
  directoryCommand(directory, ['b', '--hi', 'huh'], options)
  directoryCommand(directory, ['b', 'example', '--hi', 'huh'], options)
  directoryCommand(directory, ['c', 'd', '--hi', 'huh'], options)
  directoryCommand(directory, ['', '--hi', 'huh'], options)
  directoryCommand(directory, ['demo', '--demo', 'huh'], options)
  directoryCommand(directory, ['int', '1', '--int', '1'], options)
  directoryCommand(directory, ['int', 1, '--int', 1], options)
  directoryCommand(directory, ['num', '1.1', '--num', '1.1'], options)
  directoryCommand(directory, ['num', 1.1, '--num', 1.1], options)
  t.end()
})

test('default values', function (t) {
  const directory = path.join(__dirname, 'fixtures', 'default-values')

  const options = {
    commandName: 'test',
    context: {
      t: t
    }
  }

  directoryCommand(directory, [], options)
  t.end()
})

test('missing module', function (t) {
  const directory = path.join(__dirname, 'fixtures', 'missing-module')

  const options = {
    commandName: 'test',
    context: {
      t: t
    }
  }

  directoryCommand(directory, [], options, (err) => {
    t.ok(err.message === 'Cannot find module \'./does-not-exist\'')
    t.end()
  })
})
