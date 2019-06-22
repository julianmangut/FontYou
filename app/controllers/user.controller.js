const User = require('../models/user.model');

exports.signUp = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.create({
        email,
        password
    });

    res.status(200).json({
        user
    });
};

exports.signIn = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email,
        password
    });

    res.status(200).json({
        user
    });
}

exports.favourites = (req, res) => {
    res.status(200).json({
        txt: "get user favourite's fountains"
    });
}

exports.addOrRemoveToFavourites = (req, res) => {
    res.status(200).json({
        txt: "added/removed fountain to favourites"
    })
}