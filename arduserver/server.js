const express = require('express')
const path = require('path')
const debug = require('debug')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const messages = require('./middleware/messages')
const register = require('./routes/register')
const login = require('./routes/login')
const entries = require('./routes/entries')
const entries2 = require('./routes/entries2')
const rest = require('./routes/rest')

var app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))
app.use('/js/jquery.js', express.static('node_modules/jquery/dist/jquery.js'))
app.use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'))
app.use('/js/bootstrap.js', express.static('node_modules/bootstrap/dist/js/bootstrap.js'))
app.use('/css/mdb.min.css', express.static('node_modules/mdbootstrap/css/mdb.min.css'))
app.use('/css/style.css', express.static('node_modules/mdbootstrap/css/style.css'))
app.use('/js/mdb.js', express.static('node_modules/mdbootstrap/js/mdb.js'))

app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }))
app.use(messages)
app.get('/', login.form)

app.get('/register', register.form)
app.post('/register', register.submit)

app.get('/login', login.form)
app.post('/login', login.submit)

app.get('/entries', entries.form)
app.get('/entries2', entries2.form)

app.post('/sensor', rest.sensor) //переключение фильтра данных на форме
app.post('/sensor2', rest.sensor2) //переключение фильтра данных на форме
app.get('/entry/:dt', rest.entry) // приходит с датчика по модему
app.get('/entry2/:dt', rest.entry2) // приходит с датчиков по модему
app.get('/filter/:dtype', rest.filter)
app.get('/filter2/:dtype', rest.filter2)


app.set('port', process.env.PORT || 3000);
let httpserver = app.listen(app.get('port'), () =>console.log('Express server listening on port ' + httpserver.address().port))