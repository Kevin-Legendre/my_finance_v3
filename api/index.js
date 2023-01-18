const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('lib/passport')
const app = express()

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/login', require('./routes/login'))
app.use('/*', passport.authenticate)
app.get('/me', (req, res) => res.json(req.user))
app.use('/user', require('./routes/user'))


app.listen(4000, () => {
  console.log('server running')
})