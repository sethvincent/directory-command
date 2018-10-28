<img src="docs/directory-command.svg" width=150>

# directory-command

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]
[![conduct][conduct]][conduct-url]

[npm-image]: https://img.shields.io/npm/v/directory-command.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/directory-command
[travis-image]: https://img.shields.io/travis/sethvincent/directory-command.svg?style=flat-square
[travis-url]: https://travis-ci.org/sethvincent/directory-command
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard
[conduct]: https://img.shields.io/badge/code%20of%20conduct-contributor%20covenant-green.svg?style=flat-square
[conduct-url]: CONDUCT.md

## About

Create a command-line tool using directory structure to define nested subcommands.

- **Intuitive:** Creating new commands is fast and straightforward
- **Helpful:** Automatically creates help text that is displayed when a user passes the `--help` flag
- **Meticulous:** Separates args and flags making them easy to use, and validates the values that are provided

## Install

```sh
npm install --save directory-command
```

## Setup

`directory-command` is designed to make setup as quick as possible.

### Use the `directory-command` cli tool

With `npx`:

```console
npx directory-command new --name example-cli
```

```console
npm i -g directory-command
directory-command new --name example-cli
```

Make sure to add `directory-command` to your project dependencies.

### Manual setup

#### Create a bin directory

```console
mkdir bin
```

#### Create bin/index.js

```js
#! /usr/bin/env node

const path = require('path')
const directoryCommand = require('directory-command')

const directory = path.join(__dirname, 'commands')

directoryCommand(directory, process.argv.slice(2), {
  commandName: 'example'
})
```

#### Create a bin/commands directory

```console
mkdir bin/commands
```


#### Create a command

```console
touch bin/commands/index.js
```

A command file looks like:

```js
function command (args, flags, context) {
  console.log(args, flags, context)
}

const args = []
const flags = []

const options = {
  description: 'example command'
}

module.exports = { command, args, flags }
```

### Args

With `directory-command`, "args" are the options that you pass in without flags, the bits of text that start with `--` or `-`.

The order of args matters. The order that you define them in the `args` array of a command is the order they need to be placed when using a cli tool.

Here's an example definition of an arg:

```js
{
  name: 'hello',
  type: 'string',
  description: 'An arg example for saying hello'
}
```

Here's how it looks when you use the arg:

```console
example-cli hi
```

Here's how you use the `hello` arg in your command:

```js
function command (args, flags, context) {
  console.log(args.hello) // logs `hi`
}

const args = [
  {
    name: 'hello',
    type: 'string',
    description: 'An arg example for saying hello'
  }
]
const flags = []
module.exports = { command, args, flags}
```

### Flags

Unlinke args, the order that they are defined in does not matter, and they can be placed in any order when using a cli tool.

An example flag definition:

```js
{
  name: 'type-of-day',
  alias: 'day'
  type: 'string',
  description: 'An arg example for saying what kind of day it is'
}
```


Here's how it looks when you use the flag:

```console
example-cli --type-of-day awesome
```

We set an alias for the flag, so we can use that instead:

```console
example-cli --d awesome
```

Here's how you use the `type-of-day` flag in your command:

```js
function command (args, flags, context) {
  console.log(flags['type-of-day']) // logs `awesome`
}

const args = []
const flags = [
  {
    name: 'type-of-day',
    alias: 'd'
    type: 'string',
    description: 'An arg example for saying what kind of day it is'
  }
]
module.exports = { command, args, flags}
```

### Default/root command

The default command is the index.js file of the specified commands directory. See the [basic usage example](examples/basic-usage).

## Documentation
- [API](docs/api.md)
- [Tests](tests/)

### Examples
- [Basic example](examples/basic-usage)

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## Conduct

It's important that this project contributes to a friendly, safe, and welcoming environment for all. Read this project's [code of conduct](CONDUCT.md)

## Change log

Read about the changes to this project in [CHANGELOG.md](CHANGELOG.md). The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## Contact

- **issues** – Please open issues in the [issues queue](https://github.com/sethvincent/directory-command/issues)

## License

[ISC](LICENSE.md)
