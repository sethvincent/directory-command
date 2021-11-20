#! /usr/bin/env node

import { join } from 'desm'
import directoryCommand from '../../index.js'

const directory = join(import.meta.url, 'commands')

try {
  await directoryCommand({
    commandName: 'example',
    context: {},
    directory,
    argv: process.argv.slice(2)
  })  
} catch (err) {
  console.log(err)
}
