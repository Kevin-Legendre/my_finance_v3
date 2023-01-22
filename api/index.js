const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('lib/passport')
const cors = require('cors')
const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
app.use('/v1', router)


router.use('/login', require('./routes/login'))
router.use('/*', passport.authenticate)
router.get('/me', (req, res) => res.json(req.user))
router.use('/user', require('./routes/user'))


app.listen(4000, () => {
  console.log('server running')
})