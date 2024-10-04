"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const usuarios = [
      {
        id: "550e8400-e29b-41d4-a716-446655440000",
        nome: "Jon Snow",
        email: "jon.snow@got.com",
        nick: "LordCommander",
        senha: "password",
        nascimento: "1992-01-01",
      },
      {
        id: "c5f16a9e-2b93-48fa-9d16-98b9e0c3450d",
        nome: "Daenerys Targaryen",
        email: "daenerys.targaryen@got.com",
        nick: "MotherOfDragons",
        senha: "password",
        nascimento: "1990-11-12",
      },
      {
        id: "b78f7a67-9c34-4adf-8c9b-123b45e6f789",
        nome: "Tyrion Lannister",
        email: "tyrion.lannister@got.com",
        nick: "TheImp",
        senha: "password",
        nascimento: "1981-06-05",
      },
      {
        id: "d2a4c530-7eaf-4f91-912a-62a0efb6f04c",
        nome: "Arya Stark",
        email: "arya.stark@got.com",
        nick: "NoOne",
        senha: "password",
        nascimento: "1999-03-15",
      },
      {
        id: "e1c2b3d4-5678-4e90-1234-56789abcdefg", // Corrigido
        nome: "Sansa Stark",
        email: "sansa.stark@got.com",
        nick: "LadyOfWinterfell",
        senha: "password",
        nascimento: "1995-07-14",
      },
      {
        id: "a9fbc8d1-efb0-4e5b-8a57-3f15c9a97cdd",
        nome: "Cersei Lannister",
        email: "cersei.lannister@got.com",
        nick: "QueenOfWesteros",
        senha: "password",
        nascimento: "1975-10-28",
      },
      {
        id: "1e8b5e6f-27f4-44b6-9c37-f1d15e6bcdaf",
        nome: "Jaime Lannister",
        email: "jaime.lannister@got.com",
        nick: "Kingslayer",
        senha: "password",
        nascimento: "1975-10-28",
      },
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        nome: "Bran Stark",
        email: "bran.stark@got.com",
        nick: "ThreeEyedRaven",
        senha: "password",
        nascimento: "2000-12-02",
      },
      {
        id: "9b2d62b4-45a7-4d2b-9f3d-8a6a3e6f0407",
        nome: "Theon Greyjoy",
        email: "theon.greyjoy@got.com",
        nick: "Reek",
        senha: "password",
        nascimento: "1985-04-09",
      },
      {
        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        nome: "Jorah Mormont",
        email: "jorah.mormont@got.com",
        nick: "FriendZoneKnight",
        senha: "password",
        nascimento: "1965-02-25",
      },
    ];

    await queryInterface.bulkInsert("Usuarios", usuarios, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Usuarios", null, {});
  },
};
