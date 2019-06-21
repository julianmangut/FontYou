module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    app.get('/user/', users.getUsers);
    app.post('/user/favourites/:fountainId', users.addOrRemoveToFavourites);
    app.get('/user/favourites/:fountainId', users.addOrRemoveToFavourites);
    app.get('/user/favourites', users.getUserFavourites);
}