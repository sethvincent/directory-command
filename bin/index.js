#! /usr/bin/env node

const path = require('path')
const directoryCommand = require('../index')

const directory = path.join(__dirname, 'commands')

const options = {
  commandName: 'directory-command',
  leftColumnWidth: 50,
  rightColumnWidth: 30,
  context: {}
}

directoryCommand(directory, process.argv.slice(2), options)
