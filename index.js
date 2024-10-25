const express = require('express');
const app = express();
const DB = "mongodb+srv://josephdaniel12383:Radwan25*@cluster0.eqwcx.mongodb.net/";
const port = 3000;
const mongoose = require("mongoose")

//! Moduloes do express.
const cors = require("cors");
const authRouter = require("./routes/auth_user_routes");
const ReworkMaterialRouter = require("./routes/rework_material_route");
const TravaRouter = require("./routes/trava_route");

//! middleware registra e muda rotas.
app.use(express.json());
app.use(cors()); //!ativa o CORS para todas as rotas e origens
app.use(authRouter);
app.use(ReworkMaterialRouter);
app.use(TravaRouter);

//! start no banco de dados do MongoDB.
mongoose.connect(DB).then(() => {
    console.log("mongodb conectado");
});

//! start do servidor e lista a porta especifica.
app.listen(port, "0.0.0.0", () => {
    //! numero de log.
    console.log(`Servidor rodando na porta ${port}`);

});