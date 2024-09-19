const express = require('express');
const { sequelize } = require('./database/database');
const userRoutes = require('./routes/usuarios');
const homeRoutes = require('./routes/home');
const app = express();

app.use(express.json());

app.use('/usuarios', userRoutes);
app.use('/', homeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Banco de Dados conectado');
  } catch (error) {
    console.error('Erro ao conectar no banco de dados:', error);
  }
});
