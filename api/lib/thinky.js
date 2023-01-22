const Thinky = require('thinky')
const { rethinkdb, rethinkdbDev } = require('lib/config')
const environement = process.env.NODE_ENV

module.exports = Thinky(environement === 'development' ? rethinkdbDev : rethinkdb)
