import express from "express";
import Usuario from "../models/Usuarios.js";
import bcrypt from "bcryptjs";
import moment from "moment";
import axios from "axios";
import { Op } from "sequelize";

const router = express.Router();

// Criação de um novo usuário
router.post("/", async (req, res) => {
  const { nome, email, senha, nascimento, nick } = req.body;

  if (!nome || !email || !senha || !nascimento || !nick) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  const dataNascimento = moment(nascimento);
  const idade = moment().diff(dataNascimento, "years");

  if (idade < 16) {
    return res.status(400).json({ erro: "A idade deve ser maior que 16 anos" });
  }

  const emailExistente = await Usuario.findOne({ where: { email } });
  if (emailExistente)
    return res.status(400).send({ erro: "Email já está em uso" });

  const nickExistente = await Usuario.findOne({ where: { nick } });
  if (nickExistente)
    return res.status(400).send({ erro: "Nick já está em uso" });

  await axios
    .get("https://picsum.photos/200")
    .then(async (response) => {
      const imageURL = response.request.res.responseUrl;
      const senhaHashed = await bcrypt.hash(senha, 10);

      const novoUsuario = await Usuario.create({
        nome,
        email,
        nick,
        senha: senhaHashed,
        imagem: imageURL,
        nascimento: dataNascimento,
      });
      res.status(201).send(novoUsuario);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ erro: "Erro ao criar usuário" });
    });
});

// Listagem de usuários
router.get("/", async (req, res) => {
  const usuarios = await Usuario.findAll({
    where: req.query.search
      ? {
          [Op.or]: [
            { nome: { [Op.like]: `%${req.query.search}%` } },
            { nick: { [Op.like]: `%${req.query.search}%` } },
          ],
        }
      : {},
  });
  res.status(200).send(usuarios);
});

// Detalhes de um usuário
router.get("/:usuario_id", async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.usuario_id);
  if (!usuario) {
    return res.status(404).send({ erro: "Usuário não encontrado" });
  }
  res.status(200).send({
    nome: usuario.nome,
    email: usuario.email,
    nick: usuario.nick,
    imagem: usuario.imagem,
    nascimento: usuario.nascimento,
  });
});

// Atualização de um usuário
router.patch("/:usuario_id", async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.usuario_id);
  if (!usuario) {
    return res.status(404).send({ erro: "Usuário não encontrado" });
  }

  const { nome, email, nick } = req.body;

  if (!nome && !email && !nick) {
    return res.status(400).json({
      erro: "Pelo menos um campo deve ser fornecido para atualização",
    });
  }

  if (email && email !== usuario.email) {
    const emailExistente = await Usuario.findOne({
      where: { email, id: { [Op.ne]: req.params.usuario_id } },
    });
    if (emailExistente) {
      return res.status(400).send({ erro: "Email já está em uso" });
    }
  }

  if (nick && nick !== usuario.nick) {
    const nickExistente = await Usuario.findOne({
      where: { nick, id: { [Op.ne]: req.params.usuario_id } },
    });
    if (nickExistente) {
      return res.status(400).send({ erro: "Nick já está em uso" });
    }
  }

  try {
    const camposParaAtualizar = {};
    if (nome) camposParaAtualizar.nome = nome;
    if (email) camposParaAtualizar.email = email;
    if (nick) camposParaAtualizar.nick = nick;

    await usuario.update(camposParaAtualizar);
    res.status(200).send(usuario);
  } catch (error) {
    res.status(500).send({ erro: "Erro ao atualizar usuário" });
  }
});

export default router;
