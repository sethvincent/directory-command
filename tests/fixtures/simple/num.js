function command (args, flags, context) {
  context.t.ok(flags.num === 1.1)
  context.t.ok(args.num === 1.1)
}

const args = [
  {
    name: 'num',
    type: 'number'
  }
]

const flags = [
  {
    name: 'num',
    type: 'number'
  }
]

module.exports = {
  command,
  args,
  flags
}
