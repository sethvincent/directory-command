function command (args, flags, context) {

}

const args = [
  {
    name: 'stringArg',
    help: 'This is a string arg'
  }
]

const flags = [
  {
    name: 'string-flag',
    alias: 's',
    help: 'This is a string flag'
  },
  {
    name: 'boolean-flag',
    alias: 'b',
    type: 'boolean',
    default: true,
    help: 'This is a boolean flag'
  },
  {
    name: 'complicated',
    alias: 'c',
    type: 'string',
    default: 'big-string-kinda',
    help: 'This has a long description that maybe should be shorter but hey it is long what can you do'
  }
]

const options = {
  description: 'This is a description.',
  longDescription: 'This is a long description that describes in more detail what the command does. It can be as long as you want, really, it\'s ok to get wild with this one, it\'ll be wrapped automatically at 80 characters so you don\'t have to worry about it.',
  examples: [
    {
      cmd: 'example',
      description: 'Just run it by itself!'
    },
    {
      cmd: 'example -c',
      description: 'This has a long description that maybe should be shorter but hey it is long what can you do'
    }
  ]
}

module.exports = { command, args, flags, options }
