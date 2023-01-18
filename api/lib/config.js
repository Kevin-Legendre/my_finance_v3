const _ = require('lodash')
const config = require('../config.json')

module.exports = _.merge(config, {
  api: process.env.VUE_APP_API,
  url: process.env.VUE_APP_URL,
  rethinkdb: {
    host: process.env.API_RETHINKDB_HOST,
    port: process.env.API_RETHINKDB_PORT,
    db: process.env.API_RETHINKDB_DB,
    silent: !!process.env.API_RETHINKDB_HOST
  },
  jwt: {
    secret: process.env.API_JWT_SECRET || 'SuperSECRETpass'
  }
})
