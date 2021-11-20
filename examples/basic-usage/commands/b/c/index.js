export function command(args, flags, context) {
  console.log('b c', args, flags, context)
}
export const args = []
export const flags = []
export const options = {
  description: 'example description',
  longDescription: 'this is an example of a nested command',
  examples: [
    {
      command: 'example b c',
      description: 'This executes the b c command'
    }
  ],
  docsUrl: 'https://example.com'
}