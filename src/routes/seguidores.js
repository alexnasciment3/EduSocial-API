import express from "express";
import Usuarios from "../models/Usuarios.js";
import Seguidores from "../models/Seguidores.js";

const router = express.Router();

// Seguir um usuário
router.post("/", async (req, res) => {
  const { usuario_id, usuario_a_seguir_id } = req.body;
  if (!usuario_id || !usuario_a_seguir_id) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  if (usuario_id === usuario_a_seguir_id) {
    return res.status(400).json({ erro: "Você não pode seguir a si mesmo" });
  }

  const seguidorExistente = await Seguidores.findOne({
    where: {
      seguidor_id: usuario_id,
      usuario_id: usuario_a_seguir_id,
    },
  });

  if (seguidorExistente) {
    return res.status(400).json({ erro: "Você já segue este usuário" });
  }

  const usuarioExistente = await Usuarios.findByPk(usuario_id);
  if (!usuarioExistente) {
    return res.status(400).json({ erro: "Usuário não encontrado" });
  }

  const usuarioSeguindo = await Usuarios.findByPk(usuario_a_seguir_id);
  if (!usuarioSeguindo) {
    return res
      .status(400)
      .json({ erro: "Usuário a ser seguido não encontrado" });
  }

  await Seguidores.create({
    seguidor_id: usuario_id,
    usuario_id: usuario_a_seguir_id,
  });

  res.status(201).send({ seguidor_id: usuario_a_seguir_id });
});

// Deixar de seguir um usuário
router.delete("/", async (req, res) => {
  const { usuario_id, usuario_a_seguir_id } = req.body;
  if (!usuario_id || !usuario_a_seguir_id) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  if (usuario_id === usuario_a_seguir_id) {
    return res
      .status(400)
      .json({ erro: "Você não pode deixar de seguir a si mesmo" });
  }

  const usuarioExistente = await Usuarios.findByPk(usuario_id);
  if (!usuarioExistente) {
    return res.status(400).json({ erro: "Usuário não encontrado" });
  }

  const usuarioSeguindo = await Usuarios.findByPk(usuario_a_seguir_id);
  if (!usuarioSeguindo) {
    return res
      .status(400)
      .json({ erro: "Usuário a ser deixado de seguir não encontrado" });
  }

  const seguidorExistente = await Seguidores.findOne({
    where: {
      seguidor_id: usuario_id,
      usuario_id: usuario_a_seguir_id,
    },
  });

  if (!seguidorExistente) {
    return res.status(400).json({ erro: "Você não segue este usuário" });
  }

  await seguidorExistente.destroy();

  res.status(200).send({ seguidor_id: usuario_a_seguir_id });
});

// Listagem de seguidores de um usuário
router.get("/:usuario_id", async (req, res) => {
  const { usuario_id } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const offset = (page - 1) * limit;

  try {
    const { count, rows: seguidores } = await Seguidores.findAndCountAll({
      where: { usuario_id },
      include: [
        {
          model: Usuarios,
          as: "Usuario",
          attributes: ["id", "nome", "nick", "imagem"],
        },
      ],
      limit,
      offset,
    });
    const seguidoresFormatados = seguidores.map((seguidor) => {
      return {
        seguidor_id: seguidor.Usuario.id,
        nome: seguidor.Usuario.nome,
        nick: seguidor.Usuario.nick,
        imagem: seguidor.Usuario.imagem,
      };
    });

    res.status(200).send({
      data: seguidoresFormatados,
      total: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: "Erro ao buscar seguidores" });
  }
});

// Listagem de usuários que um usuário segue
router.get("/seguindo/:usuario_id", async (req, res) => {
  const { usuario_id } = req.params;
  if (!usuario_id) {
    return res.status(400).json({ erro: "Usuário não informado" });
  }

  try {
    const seguindo = await Seguidores.findAll({
      where: { seguidor_id: usuario_id },
      include: [
        {
          model: Usuarios,
          as: "Usuario",
          attributes: ["id", "nome", "nick", "imagem"],
        },
      ],
    });

    const seguindoFormatados = await Promise.all(
      seguindo.map(async (seguido) => {
        const usuario_Seguido = await Usuarios.findByPk(seguido.usuario_id);
        return {
          usuario_id: usuario_Seguido.id,
          nome: usuario_Seguido.nome,
          nick: usuario_Seguido.nick,
          imagem: usuario_Seguido.imagem,
        };
      })
    );

    res.status(200).send({ data: seguindoFormatados, total: seguindo.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: "Erro ao buscar usuários seguidos" });
  }
});

export default router;
