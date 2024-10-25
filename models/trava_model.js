const mongoose = require("mongoose");

const travaSchema = mongoose.Schema({
    trava: {
        type: Boolean,
        required: true
    },
    hora: {
        type: Date,
        default: Date.now
    },
});

const Trava = mongoose.model("Trava", travaSchema);
module.exports = Trava;