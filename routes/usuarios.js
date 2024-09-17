const express = require('express');
const { User } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = await User.create({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Error creating user' });
  }
});

module.exports = router;
