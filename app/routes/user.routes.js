module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    app.post('/user/signUp', users.signUp);
    app.post('/user/signIn', users.signIn);
    app.post('/user/favourites/:fountainId', users.addOrRemoveToFavourites);
    app.get('/user/favourites', users.favourites);
}