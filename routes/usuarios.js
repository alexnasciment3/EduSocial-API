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

export default router;
