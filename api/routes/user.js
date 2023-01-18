const _ = require('lodash')
const express = require('express')
const { User } = require('models')

const router = express.Router()

router.put('/', (req, res, next) => {
  User.get(req.user.id).then((data) => {
    data.merge(_.pick(req.body, 'firstName', 'lastName', 'password'))
    data.save().then((data) => res.json({ ...data, password: undefined })).error(next)
  })
})

router.delete('/account', (req, res, next) => {
  User.get(req.user.id).then((user) => {
    user.active = false
    return user.save().then(() => res.sendStatus(200))
  }).error(next)
})

module.exports = router
