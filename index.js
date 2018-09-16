const path = require('path')
const walker = require('folder-walker')
const ArgsAndFlags = require('args-and-flags')

/**
* Create a commandline router with nested commands based on a directory/file structure
*
* @name directoryCommand
* @param {string} directory - the directory with subdirectories and files that define the commands
* @param {array} argsInput - array of arguments, like process.argv.slice(2)
* @param {object} [options] - optional options object
* @param {object} [options.context] - context object that will be passed to every command
*/
module.exports = function directoryCommand (directory, argsInput, options) {
  if (!options) {
    options = {}
  }

  const commands = {}
  const context = options.context || {}
  let defaultCommand

  function runCommand (commandObject, argsInput) {
    const command = commandObject.command

    const parser = new ArgsAndFlags({
      args: commandObject.args,
      flags: commandObject.flags
    })

    const { args, flags } = parser.parse(argsInput)
    context.help = parser.help()
    return command(args, flags, context)
  }

  function match (args, unmatchedArgs) {
    if (!unmatchedArgs) unmatchedArgs = []
    const commandStrings = Object.keys(commands)

    const commandName = commandStrings.find((commandString) => {
      return commandString === args.join(' ')
    })

    if (!args.length) {
      return runCommand(defaultCommand, unmatchedArgs)
    }

    if (!commandName) {
      unmatchedArgs.unshift(args.pop())
      return match(argsInput, unmatchedArgs)
    }

    return runCommand(commands[commandName], unmatchedArgs)
  }

  const stream = walker(directory)

  stream.on('data', (data) => {
    if (data.type === 'file' && path.extname(data.relname) === '.js') {
      const { relname, filepath } = data
      const commandParts = relname.split('/')
      const finalCommand = commandParts.length - 1
      commandParts[finalCommand] = commandParts[finalCommand].split('.')[0]

      if (commandParts[finalCommand] === 'index') {
        commandParts.pop()
      }

      const commandString = commandParts.join(' ')

      if (relname === 'index.js') {
        defaultCommand = require(filepath)
      } else {
        commands[commandString] = require(filepath)
      }
    }
  })

  stream.on('end', () => {
    match(argsInput)
  })
}
