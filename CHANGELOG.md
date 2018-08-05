# directory-command change log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased

- ... _nothing yet_

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

[v2.0.0]: https://github.com/sethvincent/directory-command/compare/v1.0.1...v2.0.0
[v1.0.1]: https://github.com/sethvincent/directory-command/compare/v1.0.0...v1.0.1
[v1.0.0]: https://github.com/sethvincent/directory-command/compare/v1.0.0
