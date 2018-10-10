function command (args, flags, context) {
  context.t.ok(flags.int === 1)
  context.t.ok(args.int === 1)
}

const args = [
  {
    name: 'int',
    type: 'integer'
  }
]

const flags = [
  {
    name: 'int',
    type: 'integer'
  }
]

module.exports = {
  command,
  args,
  flags
}
