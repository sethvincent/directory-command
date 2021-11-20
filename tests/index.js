import { join } from 'desm'
import test from 'tape'

import directoryCommand from '../index.js'

test('simple usage', function (t) {
  t.plan(14)
  const directory = join(import.meta.url, 'fixtures', 'simple')

  const options = {
    commandName: 'test',
    directory,
    context: {
      t: t
    }
  }

  const config1 = Object.assign(options, { argv: ['a', '--hi', 'huh'] })
  directoryCommand(config1)

  const config2 = Object.assign(options, { argv: ['b', '--hi', 'huh'] })
  directoryCommand(config2)

  const config3 = Object.assign(options, { argv: ['b', 'example', '--hi', 'huh'] })
  directoryCommand(config3)

  const config4 = Object.assign(options, { argv: ['c', 'd', '--hi', 'huh'] })
  directoryCommand(config4)

  const config5 = Object.assign(options, { argv: ['', '--hi', 'huh'] })
  directoryCommand(config5)

  const config6 = Object.assign(options, { argv: ['demo', '--demo', 'huh'] })
  directoryCommand(config6)

  const config7 = Object.assign(options, { argv: ['num', '7', '--num', '7'] })
  directoryCommand(config7)

  const config8 = Object.assign(options, { argv: ['num', 8, '--num', 8] })
  directoryCommand(config8)

  const config9 = Object.assign(options, { argv: ['num', '9.1', '--num', '9.2'] })
  directoryCommand(config9)

  const config10 = Object.assign(options, { argv: ['num', 10.1, '--num', 10.2] })
  directoryCommand(config10)
})

test('default values', function (t) {
  t.plan(2)

  const directory = join(import.meta.url, 'fixtures', 'default-values')

  const config = {
    directory,
    argv: [],
    commandName: 'test',
    context: {
      t: t
    }
  }

  directoryCommand(config)
})

test('missing module', async function (t) {
  const directory = join(import.meta.url, 'fixtures', 'missing-module')

  const config = {
    directory,
    argv: [],
    commandName: 'test',
    context: {
      t: t
    }
  }

  try {
    await directoryCommand(config)
  } catch (err) {
    t.ok(err.code === 'ERR_MODULE_NOT_FOUND')
    t.end()
  }
})
