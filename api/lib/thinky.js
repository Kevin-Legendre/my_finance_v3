const Thinky = require('thinky')
const { rethinkdb } = require('lib/config')

module.exports = Thinky(rethinkdb)
