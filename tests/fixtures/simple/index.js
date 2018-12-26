module.exports = {
  command: function (args, flags, context) {
    if (args.d) {
      context.t.ok(flags.demo === 'huh')
    }

    if (flags.h) {
      context.t.ok(flags.hi === 'huh')
      context.t.ok(flags.hello === 'huh')
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
      alias: ['h', 'hello'],
      type: 'string'
    }
  ]
}
