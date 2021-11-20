function command (args, flags, context) {
  context.t.ok(!isNaN(flags.num))
  context.t.ok(!isNaN(args.num))
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

export default {
  command,
  args,
  flags
}
