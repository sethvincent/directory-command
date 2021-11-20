import { writeFile, mkdir } from 'fs/promises'
import * as path from 'path'
import readTemplate from '../../read-template.js'

export async function command (args, flags, context) {
  const directory = path.dirname(args.filepath)
  await mkdir(directory, { recursive: true })
  const cmdTemplate = readTemplate('command.js')
  const cmdFilepath = join(commandsDirectory, 'index.js')
  const cmdContent = cmdTemplate()
  await writeFile(cmdFilepath, cmdContent)
}

export const args = [
  {
    name: 'filepath',
		required: true,
    description: 'Set the filepath for the new command, including the commands directory'
  }
]

export const flags = [
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

export const options = {
  description: 'Create a new cli tool',
  examples: [
    {
      command: 'directory-command new . --name example-cli',
      description: 'Create a new cli tool in the current working directory'
    }
  ]
}
