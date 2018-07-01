var walker = require('folder-walker')
var minimist = require('minimist')
var cliclopts = require('cliclopts')

function noop () {}

/**
* Create a commandline router with nested commands based on a directory/file structure
*
* @name directoryCommand
* @param {string} directory - the directory with subdirectories and files that define the commands
* @param {array} args - array of arguments, like process.argv.slice(2)
* @param {object} [options] - optional options object
* @param {object} [options.context] - context object that will be passed to every command
* @param {object} [options.defaultCommand] - default command that is called if no matching command is found
* @param {function} [callback] - optional callback function that is called when the command is complete
*/
module.exports = function directoryCommand (directory, args, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  var commands = {}
  var context = options.context || {}
  var defaultCommand = options.defaultCommand || noop

  function runCommand (commandObject, args) {
    var { command, options } = commandObject
    var cliOptions = cliclopts(options)
    var argv = minimist(args, cliOptions.options())
    return command(argv._, argv, context)
  }

  function match (args, unmatchedArgs) {
    if (!unmatchedArgs) unmatchedArgs = []
    var commandStrings = Object.keys(commands)

    var commandName = commandStrings.find((commandString) => {
      return commandString === args.join(' ')
    })

    if (!args.length) {
      return runCommand(defaultCommand, unmatchedArgs)
    }

    if (!commandName) {
      unmatchedArgs.unshift(args.pop())
      return match(args, unmatchedArgs)
    }

    return runCommand(commands[commandName], unmatchedArgs)
  }

  var stream = walker(directory, options)

  stream.on('data', (data) => {
    if (data.type === 'file') {
      var { relname, filepath } = data
      var commandParts = relname.split('/')
      var finalCommand = commandParts.length - 1
      commandParts[finalCommand] = commandParts[finalCommand].split('.')[0]

      if (commandParts[finalCommand] === 'index') {
        commandParts.pop()
      }

      var commandString = commandParts.join(' ')
      commands[commandString] = require(filepath)
    }
  })

  stream.on('end', () => {
    var result = match(args)
    if (callback) callback(null, result)
  })
}
