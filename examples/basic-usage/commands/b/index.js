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
      cmd: 'example b 1',
      description: 'set  `int` argument to 1'
    },
    {
      cmd: 'example b --string hi',
      description: 'set  `--string` flag to `hi`'
    }
  ]
}

module.exports = { command, args, flags, options }
