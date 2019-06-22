const User = require('../models/user.model');
const Fountain = require('../models/fountain.model');

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
    const email = req.query.email;
    res.status(200).json({
        txt: "get "+email+ " favourite's fountains"
    });
}

exports.addOrRemoveToFavourites = async (req, res) => {
    const email = req.query.email;
    const fountainId = req.params.fountainId;
    
    var user = await User.findOne({email});
    if(user.favourites.includes(fountainId)){
        await User.updateOne({email},{$pull:{favourites: fountainId}});
    }
    else await User.updateOne({email},{$push:{favourites: fountainId}});

    user = await User.findOne({email});
    res.status(200).json({
        user
    })
}