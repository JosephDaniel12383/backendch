const express = require('express');
const ReworkMaterial = require('../models/rework_material_model'); // Importa o modelo de ReworkMaterial
const { authenticateToken } = require('../middleware/auth'); // Middleware de autenticação
const ReworkMaterialRouter = express.Router();

//! Rota para salvar o material retrabalhado
ReworkMaterialRouter.post('/api/rework', authenticateToken, async (req, res) => {
    const { peso, opcaoSelecionada } = req.body;

    try {
        // Cria um novo registro de material com os dados do usuário autenticado
        const novoMaterial = new ReworkMaterial({
            peso,
            opcaoSelecionada,
            hora: new Date(), // Data e hora atuais
            userID: req.user.id, // ID do usuário autenticado no token
        });

        await novoMaterial.save(); // Salva no banco de dados

        res.status(201).json({ message: 'Material retrabalhado salvo com sucesso!' });
    } catch (error) {
        console.error(error); // Log do erro para depuração
        res.status(500).json({ message: 'Erro ao salvar o material retrabalhado', error: error.message });
    }
});

//! Rota para obter perdas agrupadas por data e material
ReworkMaterialRouter.get('/api/rework', authenticateToken, async (req, res) => {
    try {
        const reworkData = await ReworkMaterial.aggregate([
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$hora" } },
                        material: "$opcaoSelecionada"
                    },
                    totalPeso: { $sum: "$peso" },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.date",
                    materials: {
                        $push: {
                            material: "$_id.material",
                            quantidade: "$count",
                            pesoTotal: "$totalPeso"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    materials: 1
                }
            },
            { $sort: { date: 1 } }
        ]);

        res.status(200).json(reworkData);
    } catch (error) {
        console.error('Erro ao obter as perdas diárias:', error);
        res.status(500).json({ message: 'Erro ao obter as perdas diárias', error: error.message });
    }
});

module.exports = ReworkMaterialRouter;
