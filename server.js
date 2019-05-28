const express = require('express');
const bodyParser = require('body-parser');

process.env.NODE_ENV = 'production';

// config variables
const config = require('./config.js');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
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
    //res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
    res.json(global.gConfig);
});

require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(global.gConfig.node_port, () => {
    //console.log("Server is listening on port 3000");
    console.log(`${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`);
});