const express = require('express');
const ReworkMaterial = require('../models/rework_material_model'); //! Importa o modelo criado
const { authenticateToken } = require('../middleware/auth'); //! Middleware para autenticar o token
const ReworkMaterialRouter = express.Router();

//! Rota para salvar o material retrabalhado
ReworkMaterialRouter.post('/api/rework', authenticateToken, async (req, res) => {
    const { peso, opcaoSelecionada } = req.body;

    try {
        //! Cria um novo registro de material com os dados do usuário autenticado
        const novoMaterial = new ReworkMaterial({
            peso,
            opcaoSelecionada,
            hora: new Date(), //! Data e hora atuais
            userID: req.user.id, //! ID do usuário autenticado no token
        });

        await novoMaterial.save(); //! Salva no banco de dados

        res.status(201).json({ message: 'Material retrabalhado salvo com sucesso!' });
    } catch (error) {
        console.error(error); // Log do erro para depuração
        res.status(500).json({ message: 'Erro ao salvar o material retrabalhado', error: error.message });
    }
});

module.exports = ReworkMaterialRouter;