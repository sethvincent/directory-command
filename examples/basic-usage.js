#! /usr/bin/env node

var path = require('path')
var directoryCommand = require('../index')

var directory = path.join(__dirname, '..', 'tests', 'fixtures', 'simple')

var defaultCommand = {
  command: function () {},
  options: []
}

var options = {
  defaultCommand
}

directoryCommand(directory, process.argv.slice(2), options)
