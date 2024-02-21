/**
 * imported packages Express, Mongoose, Body-parser are in use now.
 *
 */

let express = require('express'),
path = require('path'),
mongoose = require('mongoose'),
cors= require('cors'),
bodyParser = require('body-parser'),
createError = require('http-errors'),
mongoDb = require('./database/db');

var passport = require('passport');
require('./config/passport');
/**
 * Instanitate MongoDB database locally and if error it shows to user
 */
mongoose.Promise = global.Promise;

mongoose.connect(mongoDb.db, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => {
    console.log('Database Successfully connected ' + mongoDb.db)
},
error => {
    console.log('Database error: ' + error + mongoDb.db)
    }
)
/**
 *creating express for routing and middleware function calls
 *setting up port with express js
 */
const invoiceRoute = require('./routes/invoice.routes')

const app = express();
// parse requests of content-type - application/json
//app.use(bodyParser.json());
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// var corsOptions = { origin: "http://localhost:8081" };
// app.use(cors(corsOptions));
app.use(cors());
// simple route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Node APlication"});
})

//Static directory path
app.use(express.static(path.join(__dirname, 'dist/angular-login-form')));
// app.use('/', express.static(path.join(__dirname, 'dist/angular-login-form')));

//Passport should be initialized as Express middleware just before the API routes are added
app.use(passport.initialize());
// API root
app.use('/api', invoiceRoute)

//PORT: set port, listen for requests
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Listening on port ' + port)
})

/**
 *
 * REQUEST-RESPONSE CYCLE
 * Middleware Function call to have access
 *      request object(req)
 *      response object(res)
 *      next variabel is for next middleware function next()
 */

//404 handler

app.use((req,res,next) =>{
    next(createError(404));
});

//Base Route
app.get('/', (req, res) => {
    res.send('invalid endpoint');
});


app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'dist/angular-login-form/index.html'));
});

//error handler
app.use(function (err, req, res, next){
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
