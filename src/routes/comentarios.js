import Comentarios from "../models/Comentarios.js";
import Publicacoes from "../models/Publicacoes.js";
import Usuarios from "../models/Usuarios.js";

import express from "express";

const router = express.Router();

// Criação de um novo comentário em uma Publicação
router.post("/", async (req, res) => {
  const { publicacao_id, usuario_id, comentario } = req.body;
  if (!publicacao_id || !usuario_id || !comentario) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  const usuarioExistente = await Usuarios.findByPk(usuario_id);
  if (!usuarioExistente) {
    return res.status(400).json({ erro: "Usuário não encontrado" });
  }

  const publicacaoExistente = await Publicacoes.findByPk(publicacao_id);
  if (!publicacaoExistente) {
    return res.status(400).json({ erro: "Publicação não encontrada" });
  }

  const novoComentario = await Comentarios.create({
    publicacao_id,
    usuario_id,
    comentario,
  });

  res.status(201).send({ comentario_id: novoComentario.id });
});

// Listagem de comentários de uma publicação
router.get("/", async (req, res) => {
  const { publicacao_id } = req.query;
  if (!publicacao_id) {
    return res.status(400).json({ erro: "Publicação não informada" });
  }

  const comentarios = await Comentarios.findAll({
    where: { publicacao_id },
    include: [
      {
        model: Usuarios,
        attributes: ["id", "nome", "nick", "imagem"],
      },
    ],
  });

  const comentariosFormatados = comentarios.map((comentario) => {
    return {
      comentario_id: comentario.id,
      comentario: comentario.comentario,
      usuario_id: comentario.Usuario.id,
      nick: comentario.Usuario.nick,
      imagem: comentario.Usuario.imagem,
      // criado_em: comentario.criado_em,
    };
  });
  // .sort((a, b) => a.criado_em - b.criado_em);

  res
    .status(200)
    .send({ data: comentariosFormatados, total: comentarios.length });
});

// Delete um comentário
router.delete("/", async (req, res) => {
  const { comentario_id, usuario_id } = req.body;

  const usuarioExistente = await Usuarios.findByPk(usuario_id);
  if (!usuarioExistente) {
    return res.status(400).json({ erro: "Usuário não encontrado" });
  }

  const comentario = await Comentarios.findByPk(comentario_id);

  if (!comentario) {
    return res.status(400).json({ erro: "Comentário não encontrado" });
  }

  if (comentario.usuario_id !== usuario_id) {
    return res.status(403).json({ erro: "Usuário não autorizado" });
  }

  await comentario.destroy();

  res.status(204).send();
});

export default router;
