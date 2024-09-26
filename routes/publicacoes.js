const express = require("express");
const { Publicacoes, Usuarios } = require("../database/database");

const router = express.Router();

router.post("/", async (req, res) => {
  const { mensagem, usuario_id } = req.body;

  if (!mensagem || !usuario_id) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  const usuarioExistente = await Usuarios.findByPk(usuario_id);

  if (!usuarioExistente) {
    return res.status(400).json({ erro: "Usuário não encontrado" });
  }

  const novaPublicacao = await Publicacoes.create({
    mensagem,
    usuario_id,
  });

  res.status(201).send({ mensagem_id: novaPublicacao.id });
});

module.exports = router;
