const Fountain = require('../models/fountain.model.js');

// Retrieve and return all notes from the database.

/* 
QUERYING: 
Fountain.find({
        "direccion": /P/i
    });

Fountain.find({
    "distrito": "RETIRO" 
})
const params = {
        distrito: "RETIRO"
    }
*/
exports.findAll = (req, res) => {
    const params = {
        
    }
    Fountain.find(
        params
    )
    .then(fountains => {
        res.send(fountains);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Fountain.findById(req.params.fountainId)
    .then(fountain => {
        if(!fountain) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(fountain);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};

