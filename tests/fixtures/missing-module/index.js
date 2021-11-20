import doesNotExist from './does-not-exist.js'

export function command(args, flags, context) {
  console.log('huh', args, flags)
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
