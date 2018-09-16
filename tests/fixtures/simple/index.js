module.exports = {
  command: function (args, flags, context) {
    if (args.d) {
      context.t.ok(flags.default === 'huh')
    } else {
      context.t.ok(flags.hi === 'huh')
    }
  },
  args: [
    {
      name: 'd'
    }
  ],
  flags: [
    {
      name: 'hi',
      type: 'string'
    }
  ]
}
