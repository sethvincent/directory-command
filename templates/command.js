function command (args, flags, context) {
  console.log(args, flags, context)
}

const args = []
const flags = []

const options: {
  description: '',
  longDescription: '',
  examples: []
}

module.exports = { command, args, flags, options }
