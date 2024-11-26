import express from "express";
import sequelize from "./database/database.js";
import rotasUsuarios from "./src/routes/usuarios.js";
import rotasPublicacoes from "./src/routes/publicacoes.js";
import rotasComentarios from "./src/routes/comentarios.js";
import rotasCurtidas from "./src/routes/curtidas.js";
import rotasSeguidores from "./src/routes/seguidores.js";

const app = express();

app.use(express.json());
app.use("/usuarios", rotasUsuarios);
app.use("/publicacoes", rotasPublicacoes);
app.use("/comentarios", rotasComentarios);
app.use("/curtidas", rotasCurtidas);
app.use("/seguidores", rotasSeguidores);

const PORT = process.env.PORT || 3002;

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta:${PORT}`);
  try {
    sequelize.sync().then(() => {
      console.log("Banco de dados sincronizado!");
    });
  } catch (error) {
    console.error("Erro ao conectar no banco de dados:", error);
  }
});
