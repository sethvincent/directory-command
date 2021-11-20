function command (args, flags, context) {
  context.t.ok(flags.hi === 'huh')
}

const args = []

const flags = [
  {
    name: 'hi',
    type: 'string'
  }
]

export default {
  command,
  args,
  flags
}
