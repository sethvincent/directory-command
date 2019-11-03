function command (args, flags, context) {

}

const args = [
  {
    name: 'something',
    type: 'string',
    description: 'This will do something'
  }
]

const flags = [
  {
    name: 'toggle',
    type: 'boolean',
    description: 'Choose one of two options'
  }
]

const options = {
  description: 'This command is kinda long.',
  examples: [
    {
      cmd: 'example e a-longer-command something --toggle',
      description: 'This has a long description that maybe should be shorter but hey it is long what can you do i don\'t know but maybe we can wrap it or something oh right we\'re doing that'
    }
  ]
}

module.exports = { command, args, flags, options }
