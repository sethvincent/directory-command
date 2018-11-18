const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const readTemplate = require('../../read-template')

function command (args, flags, context) {
  const binDirectory = path.join(args.cwd, 'bin')
  const commandsDirectory = path.join(binDirectory, 'commands')

  mkdirp.sync(binDirectory)
  mkdirp.sync(commandsDirectory)

  const cliTemplate = readTemplate('cli.js')
  const cliFilepath = path.join(binDirectory, 'index.js')

  const cmdTemplate = readTemplate('command.js')
  const cmdFilepath = path.join(commandsDirectory, 'index.js')

  const cmdExampleTemplate = readTemplate('example-command.js')
  const cmdExampleFilepath = path.join(commandsDirectory, 'example.js')

  const cliContent = cliTemplate({
    commandName: flags.name,
    commandsDirectory: flags['commands-directory']
  })

  const cmdContent = cmdTemplate()
  const cmdExampleContent = cmdExampleTemplate({ commandName: flags.name })

  fs.writeFileSync(cliFilepath, cliContent)
  fs.writeFileSync(cmdFilepath, cmdContent)
  fs.writeFileSync(cmdExampleFilepath, cmdExampleContent)
}

const args = [
  {
    name: 'cwd',
    default: process.cwd(),
    description: 'Set the directory for the new command-line tool'
  }
]

const flags = [
  {
    name: 'name',
    alias: 'n',
    required: true
  },
  {
    name: 'commands-directory',
    alias: 'c',
    description: 'filepath of the directory that will contain command files',
    default: 'commands'
  }
]

const options = {
  description: 'Create a new cli tool',
  examples: [
    {
      cmd: 'directory-command new . --name example-cli',
      description: 'Create a new cli tool in the current working directory'
    }
  ]
}

module.exports = { command, args, flags, options }
