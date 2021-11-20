export function command(args, flags, context) {
  if (args.demo) {
    context.t.ok(flags.demo === 'huh')
  }

  if (flags.h) {
    context.t.ok(flags.hi === 'huh')
    context.t.ok(flags.hello === 'huh')
  }
}
export const args = [
  {
    name: 'huh'
  }
]
export const flags = [
  {
    name: 'hi',
    alias: ['h', 'hello'],
    type: 'string'
  }
]
