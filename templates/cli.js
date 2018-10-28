#! /usr/bin/env node

const path = require('path')
const directoryCommand = require('directory-command')

const directory = path.join(__dirname, '{{ commandsDirectory }}')

const options = {
  commandName: '{{ commandName }}',
  context: {}
}

directoryCommand(directory, process.argv.slice(2), options)
