const doesNotExist = require('./does-not-exist')

module.exports = {
  command: function (args, flags, context) {
    console.log('huh', args, flags)
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
