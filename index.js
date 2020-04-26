let express = require('express');
let bodyParser = require('body-parser');
let app = express();

const mongoose = require('mongoose');

let usersRouter = require('./src/routes/UsersRouter');
let settingsRouter = require('./src/routes/SettingsRouter');
let drinksRouter = require('./src/routes/DrinksRouter');
let beveragesRouter = require('./src/routes/BeveragesRouter');

// Local URL
const url = 'mongodb://127.0.0.1:27017/CRAWLR';
// Development URL
// const url = 'mongodb+srv://Admin:admin@crawlr-cluster-abo1p.mongodb.net/test?retryWrites=true&w=majority';

// Connect to MongoDB server
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
db.once('open', _ => {
    console.log('Database connected: ', url)
});

db.on('error', err => {
    console.error('Connection error: ', err)
});

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

// http status codes
const statusOK = 200;
const statusNotFound = 404;
const statusError = 500;

app.use(bodyParser.json({ type: 'application/json' }));
app.enable('strict routing');
app.set('strict routing', true);
app.use(usersRouter);
app.use(settingsRouter);
app.use(drinksRouter);
app.use(beveragesRouter);

app.get('/', function (req, res) {
    res.send("CRAWLR-API")
})

app.use(function(err, req, res) {
    console.log(err)
});

app.listen(port, hostname, function () {
    console.log(`Listening at http://${hostname}:${port}`);
});

