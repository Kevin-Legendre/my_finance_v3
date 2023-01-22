const express = require('express')
const { v4: uuidv4 } = require('uuid');
const { sign } = require('jsonwebtoken')
const { isEmail } = require('validator')
const { jwt } = require('lib/config')
const { User } = require('models')

const router = express.Router()

router.post('/signin', (req, res) => {
  if (!req.body.email) {
    return setTimeout(() => res.status(400).send('Bad request'), 1500)
  }

  const email = req.body.email.toLowerCase().trim()
  User.filter({ email }).nth(0).default(null).then((user) => {
    if (user && user.isValidPassword(req.body.password)) {
      res.json(sign({ email, id: user.id }, jwt.secret, jwt.opts))
    } else {
      res.status(403).send('Forbidden')
    }
  }).error(() => res.status(403).send('Forbidden'))
})

router.post('/signup', (req, res, next) => {
  if (!req.body.email || !isEmail(req.body.email) || !req.body.password) {
    return setTimeout(() => res.status(400).send('Bad request'), 1500)
  }

  const email = req.body.email.toLowerCase().trim()

  User.filter({ email }).then((users) => {
    if (users.length > 0) {
      return res.status(409).send('Already exist')
    }

    const user = new User({
      email,
      id: 'usr_' + (uuidv4().split('-').pop()),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    })
    return user.save().then((user) => res.json(sign({ email, id: user.id }, jwt.secret, jwt.opts)))
  }).error(next)
})

module.exports = router
