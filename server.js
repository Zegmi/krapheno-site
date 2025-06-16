const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Use CORS middleware
app.use(cors());

// File path resolved relative to this file's location
const logFilePath = path.join(__dirname, 'KshanaLog.aud');

// API to read the log file
app.get('/api', (req, res) => {
  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('🛑 Error reading the log file:', err.message);
      return res.status(500).json({ error: 'Unable to read KshanaLog.aud' });
    }

    try {
      const logs = JSON.parse(data);
      res.json(logs);
    } catch (parseError) {
      console.error('⚠️ Failed to parse log file:', parseError.message);
      res.status(500).json({ error: 'Corrupted log file' });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✨ Krudi Memory API running on http://localhost:${PORT}`);
});
