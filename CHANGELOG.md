# directory-command change log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased
- _nothing yet ..._

## [v4.3.0] - 2019-08-11
### Added
- allow synchronous functions to values for arg & flag default values

### Fixed
- improved error handling for case when a command requires a module that doesn't exist closed [#3](https://github.com/sethvincent/directory-command/issues/3)

## [v4.2.1] - 2019-08-11
### Fixed
- fix base templates

## [v4.2.0] - 2018-12-26
### Added
- updated args-and-flags dependency to allow accessing all arg values via `args._`

## [v4.1.1] - 2018-11-17
### Fixed
- update through2 dependency

## [v4.1.0] - 2018-11-17
### Fixed
- better error handling when a command has an error

### Added
- add an example command with better examples when creating a new command with `directory-command new`

## [v4.0.1] - 2018-10-28
### Fixed
- docs fix

## [v4.0.0] - 2018-10-28

### Changed
- `config` and `config.commandName` are now required in `directoryCommand()`

### Added
- new `directory-command` cli tool for quickly creating new cli tools
- `leftColumnWidth` and `rightColumnWidth` for controlling the width of left and right columns of help output

## [v3.2.0] - 2018-10-27

### Added
- refactored to enable automatic help rendering when the `--help` flag is used

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

[v4.3.0]: https://github.com/sethvincent/directory-command/compare/v4.2.1...v4.3.0
[v4.2.1]: https://github.com/sethvincent/directory-command/compare/v4.2.0...v4.2.1
[v4.2.0]: https://github.com/sethvincent/directory-command/compare/v4.1.1...v4.2.0
[v4.1.1]: https://github.com/sethvincent/directory-command/compare/v4.1.0...v4.1.1
[v4.1.0]: https://github.com/sethvincent/directory-command/compare/v4.0.1...v4.1.0
[v4.0.1]: https://github.com/sethvincent/directory-command/compare/v4.0.0...v4.0.1
[v4.0.0]: https://github.com/sethvincent/directory-command/compare/v3.2.0...v4.0.0
[v3.2.0]: https://github.com/sethvincent/directory-command/compare/v3.1.0...v3.2.0
[v3.1.0]: https://github.com/sethvincent/directory-command/compare/v3.0.1...v3.1.0
[v3.0.1]: https://github.com/sethvincent/directory-command/compare/v3.0.0...v3.0.1
[v3.0.0]: https://github.com/sethvincent/directory-command/compare/v2.0.0...v3.0.0
[v2.0.0]: https://github.com/sethvincent/directory-command/compare/v1.0.1...v2.0.0
[v1.0.1]: https://github.com/sethvincent/directory-command/compare/v1.0.0...v1.0.1
[v1.0.0]: https://github.com/sethvincent/directory-command/compare/v1.0.0
