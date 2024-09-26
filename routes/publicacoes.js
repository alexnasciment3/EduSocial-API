const express = require("express");
const { Publicacoes, Usuarios } = require("../database/database");

const router = express.Router();

// Criação de uma nova publicação
router.post("/", async (req, res) => {
  const { publicacao, usuario_id } = req.body;

  if (!publicacao || !usuario_id) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  const usuarioExistente = await Usuarios.findByPk(usuario_id);

  if (!usuarioExistente) {
    return res.status(400).json({ erro: "Usuário não encontrado" });
  }

  const novaPublicacao = await Publicacoes.create({
    publicacao,
    usuario_id,
  });

  res.status(201).send({ mensagem_id: novaPublicacao.id });
});

// Listagem de publicações
router.get("/", async (req, res) => {
  const publicacoes = await Publicacoes.findAll({
    include: [
      {
        model: Usuarios,
        attributes: ["id", "nome", "nick", "imagem"],
      },
    ],
  });

  const publicacoesFormatadas = publicacoes.map((publicacao) => {
    return {
      mensagem_id: publicacao.id,
      publicacao: publicacao.mensagem,
      usuario_id: publicacao.Usuario.id,
      nome: publicacao.Usuario.nome,
      nick: publicacao.Usuario.nick,
      imagem: publicacao.Usuario.imagem,
    };
  });

  res
    .status(200)
    .send({ data: publicacoesFormatadas, total: publicacoes.length });
});

module.exports = router;
