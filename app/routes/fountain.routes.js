module.exports = (app) => {
    const fountains = require('../controllers/fountain.controller.js');
    
    app.get('/fountains', fountains.findAll);
    app.get('/fountains/:fountainId', fountains.findOne);
}