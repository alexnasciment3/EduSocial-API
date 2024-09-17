const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  const uptime = process.uptime(); 
  const status = {
    status: 'Application is running',
    uptime: `${Math.floor(uptime / 60)} minutes and ${Math.floor(uptime % 60)} seconds`,
    timestamp: new Date().toISOString(),
  };
  res.json(status);
});

module.exports = router;
