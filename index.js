/** 
 * imported packages Express, Mongoose, Body-parser are in use now.
 *
 */ 
let express = require('express'),
path = require('path'),
mongoose = require('mongoose'),
cors= require('cors'),
bodyParser = require('body-parser'),

/**
 * Instanitate MongoDB database locally and if error it shows to user
 */
mongoDb = require('./database/db');
mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
    useNewUrlParser: true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(() => {
    console.log('Database Successfully connected ')
},
error => {
    console.log('Database error: ' + error)
    }
)
/**
 * 
 *creating express for routing and middleware function calls 
 */
 
const invoiceRoute = require('./routes/invoice.routes')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

//Static directory path
app.use(express.static(path.join(__dirname, 'dist/angualr-mean-crud-turorial')));

// API root
app.use('./api', invoiceRoute)

//PORT
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
    res.sendFile(path.join(__dirname, 'dist/angular-mean-crud-tutorial/index.html'));
});

//error handler
app.use(function (err, req, res, next){
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
