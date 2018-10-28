const fs = require('fs')
const path = require('path')

const handlebars = require('handlebars')

const templatesDirectory = path.join(__dirname, '..', 'templates')

module.exports = function readtemplate (filename) {
  const templateFilepath = path.join(templatesDirectory, filename)
  const source = fs.readFileSync(templateFilepath, 'utf8')
  return handlebars.compile(source)
}
