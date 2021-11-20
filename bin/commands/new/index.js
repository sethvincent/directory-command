import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import readTemplate from '../../read-template.js'

async function command (args, flags, context) {
  const binDirectory = join(args.cwd, 'bin')
  const commandsDirectory = join(binDirectory, 'commands')

  await mkdir(binDirectory)
  await mkdir(commandsDirectory)

  const cliTemplate = readTemplate('cli.js')
  const cliFilepath = join(binDirectory, 'index.js')

  const cmdTemplate = readTemplate('command.js')
  const cmdFilepath = join(commandsDirectory, 'index.js')

  const cmdExampleTemplate = readTemplate('example-command.js')
  const cmdExampleFilepath = join(commandsDirectory, 'example.js')

  const cliContent = cliTemplate({
    commandName: flags.name,
    commandsDirectory: flags['commands-directory']
  })

  const cmdContent = cmdTemplate()
  const cmdExampleContent = cmdExampleTemplate({ commandName: flags.name })

  await writeFile(cliFilepath, cliContent)
  await writeFile(cmdFilepath, cmdContent)
  await writeFile(cmdExampleFilepath, cmdExampleContent)
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
      command: 'directory-command new . --name example-cli',
      description: 'Create a new cli tool in the current working directory'
    }
  ]
}

export default { command, args, flags, options }
