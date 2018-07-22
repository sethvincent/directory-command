module.exports = {
  command: function (args, flags, context) {
    context.t.ok(flags.hi === 'huh')
  },
  options: []
}
