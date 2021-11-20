export function command(args, flags, context) {
  context.t.ok(flags.hi === 'huh')
}
export const args = []
export const flags = [
  {
    name: 'hi',
    type: 'string'
  }
]
