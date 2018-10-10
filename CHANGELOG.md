# directory-command change log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased

- ... _nothing yet_

## [v3.1.0] - 2018-10-10

### Added

- support integers as validation type by bumping args-and-flags to v1.1.0

## [v3.0.1] - 2018-09-18

### Fixed
- fixed example in readme

## [v3.0.0] - 2018-09-16

### Changed
- split command `options` into `args` and `flags`. Creating a command now looks like:
  ```js
  function command (args, flags, context) {
    
  }
  
  const args = []
  const flags = []
  
  module.exports = { command, args, flags }
  ```

### Removed
- removed `callback` argument from `directoryCommand`
- removed `defaultCommand` option from `directoryCommand` - now the root index.js file in the commands directory is the only way to create a command that runs by default if no other commands match.

## [v2.0.0] - 2018-07-22

### Changed

- Default command is now specified by creating an index.js file in the commands directory. See the [basic usage example](examples/basic-usage).

## [v1.0.1] - 2018-07-01

### Fixed
- fixed argument order

## [v1.0.0] - 2017-05-20

### Added

- Initial release with this usage:
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

[v3.0.0]: https://github.com/sethvincent/directory-command/compare/v2.0.0...v3.0.0
[v2.0.0]: https://github.com/sethvincent/directory-command/compare/v1.0.1...v2.0.0
[v1.0.1]: https://github.com/sethvincent/directory-command/compare/v1.0.0...v1.0.1
[v1.0.0]: https://github.com/sethvincent/directory-command/compare/v1.0.0
