const express = require('express');
const { sequelize } = require('./models');
const userRoutes = require('./routes/usuarios');
const homeRoutes = require('./routes/home');
const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/', homeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
