import * as fs from 'fs/promises'
import * as path from 'path'

import ArgsAndFlags from 'args-and-flags'
import wrap from 'wrap-ansi'

/**
* Create a commandline router with nested commands based on a directory/file structure
*
* @name directoryCommand
* @param {object} config - options object
* @param {string} config.directory - the directory with subdirectories and files that define the commands
* @param {array} config.argv - array of arguments, like process.argv.slice(2)
* @param {string} config.commandName - base command name of the cli tool
* @param {integer} [config.leftColumnWidth] - width in pixels of the left column of help text
* @param {integer} [config.rightColumnWidth] - width in pixels of the right column of help text
* @param {object} [config.context] - context object that will be passed to every command
* @return {Promise}
*/
export default async function directoryCommand (config) {
  if (!config) {
    throw new Error('config object is required as the 3rd argument')
  }

  if (!config.commandName) {
    throw new Error('config.commandName string is required')
  }

  config.leftColumnWidth = config.leftColumnWidth || process.stdout.columns / 2
  config.rightColumnWidth = config.rightColumnWidth || process.stdout.columns / 2

  return runCommand(config)
}

async function runCommand (config) {
	const { directory, argv, context = {} } = config

	const commands = await importCommands(directory)
	const command = findCommand(argv, commands)

	if (!command) {
		render(`${argv.join(' ')} command not found`)
	}

	const { args, flags } = command.parser.parse(command.unusedArgs)

	if (flags.help) {
		return renderHelp(command, config)
	}

	context.help = function () {
		renderHelp(command, config)
	}

	return command.command(args, flags, context)
}

async function importCommands (commandsDirectory, config = {}) {
	const { argumentParser = {} } = config
	const commands = {}

	async function onFile (file) {
		const { filepath } = file

		if (file.ext !== '.js') {
			return
		}

		let commandString = filepath
			.replace(commandsDirectory, '')
			.replace('.js', '')
			.replace('/index', '')
			.replace(/^\//, '')
			.split(path.sep)
			.join('_')

		const moduleImport = await import(filepath)

		if (moduleImport.default) {
			commands[commandString] = Object.assign(file, moduleImport.default)
		} else {
			commands[commandString] = Object.assign(file, moduleImport)
		}

		commands[commandString].parser = new ArgsAndFlags(Object.assign(argumentParser, commands[commandString]))
	}

	await walkDirectory(commandsDirectory, onFile)
	return commands
}

async function walkDirectory (filepath, onFile) {
	const stats = await fs.stat(filepath)
	const parsedPath = path.parse(filepath)

	if (stats.isDirectory()) {
		const filepaths = await fs.readdir(filepath)

		const recurse = await filepaths.map((filename) => {
			return walkDirectory(path.join(filepath, filename), onFile)
		})

		await Promise.all(recurse)
	} else {
		await onFile(Object.assign(parsedPath, { filepath, stats }))
	}
}

function findCommand (args, commands, unusedArgs = []) {
	const commandArgs = [...args]
	let commandString = commandArgs.join('_')

	if (commands[commandString]) {
		commands[commandString].name = commandArgs.join(' ')
		commands[commandString].subcommands = findSubcommands(commandString, commands)
		commands[commandString].unusedArgs = unusedArgs
		return commands[commandString]
	} else {
		const arg = commandArgs.pop()
		unusedArgs.unshift(arg)

		if (!commandArgs.length) {
      // root command key is an empty string
			commands[''].subcommands = Object.keys(commands).reduce((obj, key) => {
				if (key.length) {
					obj[key] = commands[key]
				}

				return obj
			}, {})
			commands[''].unusedArgs = unusedArgs
			return commands['']
		}

		return findCommand(commandArgs, commands, unusedArgs)
	}
}

function findSubcommands (commandString, commands) {
	const subcommands = {}

	for (const key of Object.keys(commands)) {
		if (commandString !== key && key.includes(commandString)) {
			subcommands[key] = commands[key]
			subcommands[key].parentCommandName = commandString.replace('_', ' ')
		}
	}

	return subcommands
}

function renderHelp (commandDefinition, config) {
	const { options = {}, parser, subcommands } = commandDefinition

	if (options.description) {
		render(options.description, '\n')
	}

	if (options.longDescription) {
		render(wrap(options.longDescription, 80), '\n')
	}

	render('Usage:')
	renderUsage(config, commandDefinition)

	if (options.help && options.help.trim().length) {
		render(options.help)
	}

	if (options.examples && options.examples.length) {
		render('\nExamples:')
		options.examples.forEach((example) => {
			const line = `  ${example.command}`
			const description = parser.formatDescription(example.description)
			render(`${line}${formatSpaces(line.length, config.leftColumnWidth)}${description}`)
		})
	}

	if (subcommands) {
		const subcommandKeys = Object.keys(subcommands)
		if (subcommandKeys.length) {
			render('\nSubcommands:')
			subcommandKeys.sort((a, b) => {
				return subcommands[a].name > subcommands[b].name
			}).forEach((key) => {
				const subcmd = subcommands[key]
				renderUsage(config, subcmd)
			})

			render('\nSee help for subcommands:')
			render(`  ${formatName(config.commandName, commandDefinition)} [command] --help\n`)
		}
	}

	if (options.docsUrl) {
		render('More documentation:')
		render(options.docsUrl, '\n')
	}
}

function formatName (commandName, cmd) {
	if (cmd && cmd.name && cmd.name.length) {
		if (cmd.parentCommandName) {
			return `${commandName} ${cmd.parentCommandName} ${cmd.name}`
		}

		return `${commandName} ${cmd.name}`
	}

	return commandName
}

function formatSpaces (lineLength, leftColumnWidth) {
	const padding = leftColumnWidth - lineLength
	return ' '.repeat(padding)
}

function renderUsage (config, commandDefinition) {
	const { parser , subcommands, options = {} } = commandDefinition
	const { commandName, leftColumnWidth } = config

	const subcommandKeys = Object.keys(subcommands || {})

	function formatCommandName () {
		if (!subcommandKeys.length) return ''
		return ' [command]'
	}

	const line = `  ${formatName(commandName, commandDefinition)}${formatCommandName()}`
	const description = options.description ? parser.formatDescription(options.description) : ''
	render(`${line}${formatSpaces(line.length, leftColumnWidth)}${description}`)

	if (!subcommands || !subcommandKeys.length) return

	subcommandKeys.sort((a, b) => {
		return subcommands[a].name > subcommands[b].name
	}).forEach((key) => {
		const subcommand = subcommands[key]
		renderUsage(config, subcommand)
	})
}

function render () {
	console.log(...arguments)
}
