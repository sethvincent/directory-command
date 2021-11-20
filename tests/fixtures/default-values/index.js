export function command(args, flags, context) {
  context.t.ok(args.hello === 'hi')
  context.t.ok(flags.int === 1)
}
export const args = [
  {
    name: 'hello',
    alias: ['hey', 'hi'],
    type: 'string',
    default: () => { return 'hi' },
    help: 'an argument for saying hello'
  }
]
export const flags = [
  {
    name: 'int',
    alias: ['i', 'integer'],
    default: () => { return 1 },
    type: 'integer',
    help: 'an integer argument'
  }
]
