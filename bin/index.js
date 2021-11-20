#! /usr/bin/env node

import { join } from 'desm'
import directoryCommand from '../index.js'

const directory = join(import.meta.url, 'commands')

const config = {
  commandName: 'directory-command',
  directory,
  argv: process.argv.slice(2),
  leftColumnWidth: 50,
  rightColumnWidth: 30,
  context: {}
}

try {
  directoryCommand(config)
} catch (err) {
  console.error(err)
}
