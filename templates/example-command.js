function command (args, flags, context) {
  const { message } = args
  const { excited } = flags
  console.log(`${message}${excited ? '!' : ''}`)
}

const args = [
  {
    name: 'message',
    type: 'string',
    required: true
  }
]

const flags = [
  {
    name: 'excited',
    alias: 'e',
    type: 'boolean',
    default: false
  }
]

const options: {
  description: 'An example command',
  longDescription: 'This command demonstrates some of the basic features of directory-command',
  examples: [
    {
      cmd: '{{ commandName }} example "helloooo --excited"',
      description: '!'
    },
  ]
}

module.exports = { command, args, flags, options }
