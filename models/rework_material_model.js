const mongoose = require("mongoose");
const ReworkMaterialSchema = mongoose.Schema({
    peso: {
        type: Number,
        require: true,
    },
    opcaoSelecionada: {
        type: String,
        require: true,
    },
    hora: Date,
    userID: {
        type: String,
    },

});

const ReworkMaterial = mongoose.model("ReworkMaterial", ReworkMaterialSchema);
module.exports = ReworkMaterial;