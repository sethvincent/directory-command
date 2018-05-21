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

Create a commandline router with nested commands based on a directory/file structure

## Install

```sh
npm install --save directory-command
```

## Usage

```js
#! /usr/bin/env node

var path = require('path')
var directoryCommand = require('../index')

var directory = path.join(__dirname, 'commands')

var defaultCommand = {
  command: function (args, flags, context) {
    console.log(args, flags, context)
  },
  options: []
}

var options = {
  defaultCommand
}

directoryCommand(directory, process.argv.slice(2), options)
```

A command looks like:

```js
module.exports = {
  command: function (args, flags, context) {
    console.log(args, flags, context)
  },
  options: []
}
```

## Documentation
- [API](docs/api.md)
- [Tests](tests/)

### Examples
- [Basic example](examples/basic-usage.js)

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
