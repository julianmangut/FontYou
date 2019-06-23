const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./openapi.json');
var cors = require('cors');

process.env.NODE_ENV = 'production';
const port=process.env.PORT || 3000;

// config variables
const config = require('./config.js');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // Here we define front-end directory

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
require('./app/routes/user.routes.js')(app);

// listen for requests
app.listen(port, () => {
    console.log(`${global.gConfig.app_name} listening on port ${port}`);
});