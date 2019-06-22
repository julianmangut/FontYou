const mongoose = require('mongoose');

const FountainSchema = mongoose.Schema({
    codigo: String,
    zona: String,
    distrito: String,
    direccion: String,
    complemento: String,
    coord_x: String,
    coord_y: String,
    sistema_coordenadas: String,
    estado: String,
    observacion: String,
    fecha: Date,
    longitud: String,
    latitud: String    
},{
    strict: false
});

module.exports = mongoose.model('Fountain', FountainSchema);