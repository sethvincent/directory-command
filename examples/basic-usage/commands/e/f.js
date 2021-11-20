function command (args, flags, context) {
  console.log('e f', args, flags, context)
}

const args = []

const flags = []

const options = {
  description: 'I am an f.'
}

export default { command, args, flags, options }
