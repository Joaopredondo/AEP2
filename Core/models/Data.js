const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    id_municipio: Number,
    rede: String,
    diretoria: String,
    id_escola: Number,
    id_escola_sp: Number,
    nivel_socio_economico: Number,
});

module.exports = mongoose.model('Data', dataSchema);
