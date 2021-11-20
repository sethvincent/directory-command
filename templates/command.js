export async function command (args, flags, context) {
  console.log(args, flags, context)
}

export const args = [
  {
    name: '<arg name>',
    type: '<arg type>',
    default: '<default value>',
    help: '<arg help text>',
    // required: true
  }
]

export const flags = [
  {
    name: '<flag name>',
    alias: '<flag alias>',
    type: '<flag type>',
    default: '<default value>',
    help: '<flag help text>',
    // required: true
  }
]

export const options = {
  description: '',
  longDescription: '',
  help: '<more help text>',
  examples: [
    {
      command: '<command usage example>',
      description: '<decription of example>'
    }
  ],
  docsUrl: ''
}
