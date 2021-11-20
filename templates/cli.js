#! /usr/bin/env node

import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import directoryCommand from 'directory-command'

const __dirname = dirname(fileURLToPath(import.meta.url))
const directory = join(__dirname, '{{ commandsDirectory }}')

const config = {
  commandName: '{{ commandName }}',
  directory,
  argv: process.argv.slice(2),
  context: {}
}

try {
  directoryCommand(config)
} catch (err) {
  console.error(err)
}
