const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
const {flash} = require('express-flash-message')
const session = require('express-session')
//const store = require('express-mysql-session')

require('./database')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.set('port', 5000 || process.env.PORT)

app.use(session({
  secret: '12313154235',
  resave: false,
  saveUninitialized: true
}))
app.use(flash())
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({extended:false}))

app.use((req, res, next) => {
    app.locals.send = req.flash('send')
    next()
})

app.use(require('./routes/routes'))

app.use((express.static('public')))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.listen(app.get('port')), () => {
    console.log('Server on port', app.get('port'))
}