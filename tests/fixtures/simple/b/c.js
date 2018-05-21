module.exports = {
  command: function (args, flags, context) {
    context.t.ok(flags.hi)
    context.t.ok(args[0] = 'huh')
  },
  options: []
}
