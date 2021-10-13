const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const connect = require('./connect');

/*  == USER INTERFACE ADDITIONS == */
const hbs = require('hbs');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'hbs');
app.use('/assets',express.static(__dirname + '/public'));

// connect to database
mongoose.connect(connect.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false}).then(() => {
    console.log("connected to the MongoDB database...");
}).catch(err => {
    console.log('unable to connect to the MongoDB database...', err);
    process.exit();
});

//routes
require('./routes')(app);

// listen for requests on port 4000
app.listen(4000, () => {
    console.log("Server listening on port 4000...");
});