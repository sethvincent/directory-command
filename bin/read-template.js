import * as path from 'path'
import { readFileSync } from 'fs'
import { join } from 'desm'

import handlebars from 'handlebars'

const templatesDirectory = join(import.meta.url, '..', 'templates')

export default function readtemplate (filename) {
  const templateFilepath = path.join(templatesDirectory, filename)
  const source = readFileSync(templateFilepath, 'utf8')
  return handlebars.compile(source)
}
