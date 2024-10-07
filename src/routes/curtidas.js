import Publicacoes from "../models/Publicacoes.js";
import Comentarios from "../models/Comentarios.js";
import express from "express";

const router = express.Router();

// Adiciona uma curtida em uma Publicação
router.post("/publicacao", async (req, res) => {
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

// Remove uma curtida em uma Publicação
router.delete("/publicacao", async (req, res) => {
  const { publicacao_id } = req.body;
  console.log(publicacao_id);
  if (!publicacao_id) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  const publicacaoExistente = await Publicacoes.findByPk(publicacao_id);
  if (!publicacaoExistente) {
    return res.status(400).json({ erro: "Publicação não encontrada" });
  }

  publicacaoExistente.qtd_likes--;
  await publicacaoExistente.save();

  res.status(200).send({ qtd_likes: publicacaoExistente.qtd_likes });
});

// Adiciona uma curtida a um comentário
router.post("/comentario", async (req, res) => {
  const { comentario_id } = req.body;
  console.log(comentario_id);
  if (!comentario_id) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  const comentarioExistente = await Comentarios.findByPk(comentario_id);
  if (!comentarioExistente) {
    return res.status(400).json({ erro: "Comentário não encontrado" });
  }

  comentarioExistente.qtd_likes++;
  await comentarioExistente.save();

  res.status(200).send({ qtd_likes: comentarioExistente.qtd_likes });
});

// Remove uma curtida de um comentário
router.delete("/comentario", async (req, res) => {
  const { comentario_id } = req.body;
  console.log(comentario_id);
  if (!comentario_id) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  const comentarioExistente = await Comentarios.findByPk(comentario_id);
  if (!comentarioExistente) {
    return res.status(400).json({ erro: "Comentário não encontrado" });
  }

  comentarioExistente.qtd_likes--;
  await comentarioExistente.save();

  res.status(200).send({ qtd_likes: comentarioExistente.qtd_likes });
});

export default router;
