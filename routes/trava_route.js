const express = require("express");
const Trava = require("../models/trava_model");
const TravaRouter = express.Router(); 

TravaRouter.post("/api/trava", async (req, res) => {
    const { trava } = req.body;

    // Verifica se o trava é um booleano
    if (typeof trava !== 'boolean') {
        return res.status(400).json({ message: 'O campo "trava" deve ser um valor booleano.' });
    }

    try {
        const horaAtual = new Date();
        horaAtual.setHours(horaAtual.getHours() - 3);
        const novaTrava = new Trava({
            trava,
            hora: horaAtual,

        });

        await novaTrava.save();
        res.status(201).json({ message: 'Trava salva com sucesso!' });
    } catch (error) {
        console.error(error); // Log do erro para depuração
        res.status(500).json({ message: 'Erro ao salvar a trava', error: error.message });
    }
});

module.exports = TravaRouter;
