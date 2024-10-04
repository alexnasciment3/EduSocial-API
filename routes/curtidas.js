import Publicacoes from "../models/Publicacoes.js";
import express from "express";

const router = express.Router();

// Adiciona uma curtida em uma Publicação
router.post("/", async (req, res) => {
  const { publicacao_id } = req.body;
  console.log(publicacao_id);
  if (!publicacao_id) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  const publicacaoExistente = await Publicacoes.findByPk(publicacao_id);
  if (!publicacaoExistente) {
    return res.status(400).json({ erro: "Publicação não encontrada" });
  }

  publicacaoExistente.qtd_likes++;
  await publicacaoExistente.save();

  res.status(200).send({ qtd_likes: publicacaoExistente.qtd_likes });
});

export default router;
