const bcrypt = require('bcryptjs')
const thinky = require('lib/thinky')
const moment = require('moment-timezone')
const type = thinky.type

const User = thinky.createModel('User', {
  id: type.string(),
  email: type.string(),
  password: type.string(),
  firstName: type.string(),
  lastName: type.string(),
  active: type.boolean().default(true),
  created: type.number()
})

User.ensureIndex('email')

User.pre('save', function (next) {
  this.created = this.created || moment().unix()
  if (this.password && isNaN(bcrypt.getRounds(this.password))) {
    this.password = bcrypt.hashSync(this.password, 12)
  }
  next()
})

User.define('isValidPassword', function (password) {
  return this.password && bcrypt.compareSync(password, this.password)
})

module.exports = User
