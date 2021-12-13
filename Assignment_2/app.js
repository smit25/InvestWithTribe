var express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
var nodemailer = require('nodemailer')

var http = require('http')
var app = express()
const server = http.createServer(app)

// Declaring Mongo Sevrer
var mongoServer = require('./config/database')
// Declaration in express for identifying static files
app.use(express.static(path.join(__dirname, '/public')))

// Declaring the Routes
var routes = require('./routes/route')
var signup = require('./routes/signup')

// Database Server
mongoServer()

// Setting the template engine
app.set('view engine', 'ejs')

// Initialising Body-Parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Calling the Routes
routes(app)
app.use('/', signup)

// Run the server
const host = process.env.PORT || 3000
server.listen(host)
console.log('Hey Smit, server is running')
