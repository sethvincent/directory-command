function command (args, flags, context) {
  console.log('b', args, flags, context)
}

const args = [
  {
    name: 'int',
    type: 'integer',
    help: 'an integer'
  }
]

const flags = [
  {
    name: 'string',
    alias: 's',
    type: 'string',
    help: 'a string'
  }
]

const options = {
  description: 'A nested command.',
  docsUrl: 'http://examplecli.com/b',
  examples: [
    {
      command: 'example b 1',
      description: 'set  `int` argument to 1'
    },
    {
      command: 'example b --string hi',
      description: 'set  `--string` flag to `hi`'
    }
  ]
}

export default { command, args, flags, options }
