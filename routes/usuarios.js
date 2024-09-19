const express = require("express");
const { Usuarios } = require("../database/database");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const axios = require("axios");

const router = express.Router();

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

  const emailExistente = await Usuarios.findOne({ where: { email } });
  if (emailExistente)
    return res.status(400).send({ erro: "Email já está em uso" });

  const nickExistente = await Usuarios.findOne({ where: { nick } });
  if (nickExistente)
    return res.status(400).send({ erro: "Nick já está em uso" });

  await axios
    .get("https://picsum.photos/200")
    .then(async (response) => {
      const imageURL = response.request.res.responseUrl;
      const senhaHashed = await bcrypt.hash(senha, 10);

      const novoUsuario = await Usuarios.create({
        nome,
        email,
        nick,
        senha: senhaHashed,
        imagem: imageURL,
        nascimento: dataNascimento,
      });
      res.status(201).send(novoUsuario);
    })
    .cacth((error) => {
      console.log(error);
      res.status(500).send({ erro: "Erro ao criar usuário" });
    });
});

module.exports = router;
