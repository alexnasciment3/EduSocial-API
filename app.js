import express from "express";
import sequelize from "./database/database.js";
import rotasUsuarios from "./routes/usuarios.js";
import rotasPublicacoes from "./routes/publicacoes.js";
import rotasComentarios from "./routes/comentarios.js";
import rotasCurtidas from "./routes/curtidas.js";

const app = express();

app.use(express.json());
app.use("/usuarios", rotasUsuarios);
app.use("/publicacoes", rotasPublicacoes);
app.use("/comentarios", rotasComentarios);
app.use("/curtidas", rotasCurtidas);

const PORT = process.env.PORT || 3000;

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
