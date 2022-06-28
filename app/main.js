const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const auth = require('./controller/auth')
const login = require('./controller/login')
const download = require('./controller/download')
const laodfile = require('./controller/laodfile')
const DynamoDBStore = require('connect-dynamodb')(session)

const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.use('/', session({
  store: new DynamoDBStore({table: "db-session"}),
  name: 'session-name',
  secret: 'session-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: '/',
    secure: false
  }
}))

// app.use(express.static('views'));
app.set('view engine', 'ejs',)


app.get('/', auth, laodfile,(req, res) => {
  const user = req.session.user
  const files = res.locals.file
  res.render('next.ejs',{
    file: files,
    name: user.name
  })

})

app.post('/login', login)

app.get('/download', download)

app.listen(3000, (err) => {
  if (err) throw err
  console.log("server start") 
})