const passport = require('passport')
const passportJwt = require('passport-jwt')
const moment = require('moment')
const { jwt } = require('lib/config')
const { User } = require('models')
const thinky = require('lib/thinky')

const opts = {
  secretOrKey: jwt.secret,
  jwtFromRequest: passportJwt.ExtractJwt.fromExtractors([
    passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    passportJwt.ExtractJwt.fromUrlQueryParameter('token'),
    passportJwt.ExtractJwt.fromExtractors([(req) => (req && req.cookies) ? req.cookies.token : null])
  ]),
  passReqToCallback: true
}

passport.use(new passportJwt.Strategy(opts, (req, payload, done) => {
  User.get(payload.id)
    .without({
      password: true
    }).then((user) => {
      if (!user.active) {
        return done(null, false, { code: 403 })
      }
      return done(null, user)
    })
    .catch(thinky.Errors.DocumentNotFound, () => done(null, false, { code: 403 }))
    .error(done)
}))

module.exports = {
  initialize: passport.initialize(),
  authenticate: (req, res, next) => passport
    .authenticate('jwt', { session: false })(req, res, next)
}
