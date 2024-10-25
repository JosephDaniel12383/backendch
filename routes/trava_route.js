const express = require("express");
const Trava = require("../models/trava_model");
const TravaRouter = express.Router();

// Endpoint para criar uma nova trava
TravaRouter.post("/api/trava", async (req, res) => {
    const { trava } = req.body;

    // Verifica se o trava é um booleano
    if (typeof trava !== 'boolean') {
        return res.status(400).json({ message: 'O campo "trava" deve ser um valor booleano.' });
    }

    try {
        const horaAtual = new Date();
        horaAtual.setHours(horaAtual.getHours() - 3); // Ajuste para GMT-3 se necessário

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

// Endpoint para obter todas as travas
TravaRouter.get("/api/trava", async (req, res) => {
    try {
        const travas = await Trava.find(); // Busca todas as travas no banco de dados
        res.status(200).json(travas); // Retorna as travas como JSON
    } catch (error) {
        console.error(error); // Log do erro para depuração
        res.status(500).json({ message: 'Erro ao buscar travas', error: error.message });
    }
});

module.exports = TravaRouter;

