function command (args, flags, context) {
  console.log('e a-longer-command', args, flags, context)
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
  description: 'I am an f.'
}

export default { command, args, flags, options }
