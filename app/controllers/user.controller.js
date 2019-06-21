
exports.getUsers = (req, res) => {
    res.status(200).json({
        txt: "get Users"
    });
};

exports.getUserFavourites = (req, res) => {
    res.status(200).json({
        txt: "get user favourites"
    });
}

exports.addOrRemoveToFavourites = (req, res) => {
    res.status(200).json({
        txt: "add or remove from favourites"
    });
}