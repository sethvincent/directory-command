const path = require('path')
const walker = require('folder-walker')
const ArgsAndFlags = require('args-and-flags')
const keypath = require('obj-keypath')
const wordWrap = require('word-wrap')
const through = require('through2')
const wrap = require('wrap-ansi')
const pump = require('pump')

/**
* Create a commandline router with nested commands based on a directory/file structure
*
* @name directoryCommand
* @param {string} directory - the directory with subdirectories and files that define the commands
* @param {array} argsInput - array of arguments, like process.argv.slice(2)
* @param {object} [config] - optional options object
* @param {object} [config.context] - context object that will be passed to every command
**/
module.exports = function directoryCommand (directory, argsInput, config) {
  if (!config) {
    config = {}
  }

  const context = config.context || {}
  const commandName = config.commandName
  const leftColumnWidth = config.leftColumnWidth || 40
  const rightColumnWidth = config.rightColumnWidth || 40
  const commands = {}

  if (config.autoHelp !== false) {
    config.autoHelp = true
  }

  function match (args, unmatchedArgs) {
    if (!unmatchedArgs) unmatchedArgs = []

    if (!args.length) {
      const cmd = commands.cmd
      delete commands.cmd
      return runCommand(cmd, unmatchedArgs, commands)
    }

    const subcommands = keypath.get(commands, argsInput)

    if (subcommands) {
      const cmd = subcommands.cmd
      delete subcommands.cmd

      return runCommand(cmd, unmatchedArgs, subcommands)
    }

    unmatchedArgs.unshift(args.pop())
    return match(args, unmatchedArgs)
  }

  function runCommand (commandObject, argsInput, subcommands) {
    const { command, parser, help } = commandObject
    const { args, flags } = parser.parse(argsInput)

    if (config.autoHelp && flags.help) {
      return renderHelp(commandObject, subcommands)
    }

    return command(args, flags, Object.assign({ help }, context))
  }

  function logName (rootName, cmd) {
    if (cmd && cmd.name && cmd.name.length) {
      return `${rootName} ${cmd.name}`
    }

    return rootName
  }

  function renderHelp (commandObject, subcommands) {
    const { help, longDescription, description, docsUrl } = commandObject

    console.log(logName(commandName, commandObject), '\n')

    if (description) {
      console.log(description, '\n')
    }

    if (longDescription) {
      console.log(wrap(longDescription, 80), '\n')
    }

    console.log('Usage:')
    renderUsage(commandName, commandObject)

    if (help) {
      console.log(help)
    }

    if (commandObject.examples && commandObject.examples.length) {
      console.log('\nExamples:')
      commandObject.examples.forEach((example) => {
        const line = `  ${example.cmd}`
        const description = logDescription(example.description)
        console.log(`${line}${logSpaces(line.length)}${description}`)
      })
    }

    const subcommandKeys = Object.keys(subcommands)
    if (subcommands && subcommandKeys.length) {
      console.log('\nSubcommands:')
      subcommandKeys.sort((a, b) => {
        return subcommands[a].cmd.name > subcommands[b].cmd.name
      }).forEach((key) => {
        const subcmd = subcommands[key]
        const cmd = subcmd.cmd
        delete subcmd.cmd

        renderUsage(commandName, cmd, subcmd)
      })

      console.log('\nSee help for subcommands:')
      console.log(`  ${logName(commandName, commandObject)} [command] --help\n`)
    }

    if (docsUrl) {
      console.log('More documentation:')
      console.log(docsUrl, '\n')
    }
  }

  function logDescription (text) {
    if (!text) return ''
    if (text.length > rightColumnWidth) {
      const lines = wordWrap(text, { width: rightColumnWidth }).split(/\r?\n/).map((line, i) => {
        if (i === 0) return line.trim()
        return ' '.repeat(leftColumnWidth) + line.trim()
      })
      return lines.join('\n')
    }
    return text
  }

  function logSpaces (lineLength) {
    const padding = leftColumnWidth - lineLength
    return ' '.repeat(padding)
  }

  function renderUsage (rootName, cmd, subcommands) {
    const subcommandKeys = Object.keys(subcommands || {})

    function logCommands () {
      if (!subcommandKeys.length) return ''
      return ' [command]'
    }

    const line = `  ${logName(rootName, cmd)}${logCommands()}`
    const description = cmd && cmd.description ? logDescription(cmd.description) : ''
    console.log(`${line}${logSpaces(line.length)}${description}`)

    if (!subcommands || !subcommandKeys.length) return

    subcommandKeys.sort((a, b) => {
      return subcommands[a].cmd.name > subcommands[b].cmd.name
    }).forEach((key) => {
      const subcmd = subcommands[key]
      const cmd = subcmd.cmd
      delete subcmd.cmd

      renderUsage(rootName, cmd, subcmd)
    })
  }

  function each (data, enc, next) {
    // TODO: consider supporting other file types
    if (data.type === 'file' && path.extname(data.relname) !== '.js') return next()

    const commandParts = data.relname.split('/')
    const finalCommand = commandParts.length - 1
    commandParts[finalCommand] = commandParts[finalCommand].split('.')[0]

    if (commandParts[finalCommand] === 'index') {
      commandParts.pop()
    }

    const command = {
      cmd: {}
    }

    try {
      command.cmd = require(data.filepath)
    } catch (err) {
      if (!err.message.indexOf('Cannot find module') === 0) {
        return next(err)
      } else {
        command.cmd.name = commandParts.join(' ')
        keypath.set(commands, commandParts, command)
        return next()
      }
    }

    const options = command.cmd.options || {}
    command.cmd.parser = new ArgsAndFlags(command.cmd)
    command.cmd.help = command.cmd.parser.help({
      argsHeaderText: 'Args:',
      flagsHeaderText: 'Flags:',
      leftColumnWidth,
      rightColumnWidth
    })

    command.cmd.name = commandParts.join(' ')
    command.cmd.description = options.description
    command.cmd.longDescription = options.longDescription
    command.cmd.examples = options.examples
    command.cmd.docsUrl = options.docsUrl

    if (data.type === 'directory') {
      keypath.set(commands, commandParts, command)
    } else if (data.type === 'file') {
      if (!commandParts.length) {
        keypath.set(commands, 'cmd', command.cmd)
      } else {
        keypath.set(commands, commandParts, command)
      }
    }

    next()
  }

  function end () {
    match(argsInput)
  }

  pump(walker(directory), through.obj(each, end), (err) => {
    if (err) console.error(err)
  })
}
