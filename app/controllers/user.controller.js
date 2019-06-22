
exports.signUp = (req, res) => {
    res.status(200).json({
        txt: "user sign up"
    });
};

exports.signIn = (req, res) => {
    res.status(200).json({
        txt: "user sign in"
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