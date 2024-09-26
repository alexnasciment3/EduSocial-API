const express = require("express");
const { sequelize } = require("./database/database");
const rotasUsuarios = require("./routes/usuarios");
const rotasPublicacoes = require("./routes/publicacoes");
const app = express();

app.use(express.json());

app.use("/usuarios", rotasUsuarios);
app.use("/publicacoes", rotasPublicacoes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Banco de Dados conectado");
  } catch (error) {
    console.error("Erro ao conectar no banco de dados:", error);
  }
});
