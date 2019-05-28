const express = require('express');
const bodyParser = require('body-parser');

process.env.NODE_ENV = 'production';
const port=process.env.PORT || 3000;

// config variables
const config = require('./config.js');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(global.gConfig.database, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

require('./app/routes/fountain.routes.js')(app);

// listen for requests
app.listen(port, () => {
    console.log(`${global.gConfig.app_name} listening on port ${port}`);
});