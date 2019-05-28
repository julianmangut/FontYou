module.exports = (app) => {
    const fountains = require('../controllers/fountain.controller.js');

    // Retrieve all Notes
    app.get('/fountains', fountains.findAll);

    // Retrieve a single Note with noteId
    app.get('/fountains/:fountainId', fountains.findOne);
}