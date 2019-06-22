module.exports = (app) => {
    const fountains = require('../controllers/fountain.controller.js');
    
    app.get('/fountains', fountains.findAll);
    app.get('/fountains/districts', fountains.getDistricts);
    app.get('/fountains/:fountainId', fountains.findOne);
    
}