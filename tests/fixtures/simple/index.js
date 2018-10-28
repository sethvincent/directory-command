module.exports = {
  command: function (args, flags, context) {
    if (args.d) {
      context.t.ok(flags.demo === 'huh')
    }

    if (flags.h) {
      context.t.ok(flags.hi === 'huh')
    }
  },
  args: [
    {
      name: 'huh'
    }
  ],
  flags: [
    {
      name: 'hi',
      alias: 'h',
      type: 'string'
    }
  ]
}
