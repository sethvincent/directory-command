# directory-command change log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased

* ???

## v1.0.0

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

[v1.0.0]: https://github.com/sethvincent/directory-command/tree/v1.0.0
