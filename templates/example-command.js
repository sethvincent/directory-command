export async function command (args, flags, context) {
  const { message } = args
  const { excited } = flags
  console.log(`${message}${excited ? '!' : ''}`)
}

export const args = [
  {
    name: 'message',
    type: 'string',
    required: true
  }
]

export const flags = [
  {
    name: 'excited',
    alias: 'e',
    type: 'boolean',
    default: false
  }
]

export const options = {
  description: 'An example command',
  longDescription: 'This command demonstrates some of the basic features of directory-command',
  help: 'Example help text',
  examples: [
    {
      command: '{{ commandName }} example "helloooo --excited"',
      description: '!'
    }
  ],
  docsUrl: 'https://example.com'
}
