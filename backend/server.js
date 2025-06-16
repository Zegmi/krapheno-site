const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// File path to the Kshana log
const logFilePath = path.join(__dirname, 'KshanaLog.aud');

// Root route (optional greeting)
app.get('/', (req, res) => {
  res.send('🪷 Welcome to Krudi Memory API. Use /api to GET and /api/log to POST.');
});

// GET /api – Read the kṣhaṇa log
app.get('/api', (req, res) => {
  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('🛑 Error reading log file:', err.message);
      return res.status(500).json({ error: 'Unable to read KshanaLog.aud' });
    }

    try {
      const logs = JSON.parse(data);
      res.json(logs);
    } catch (parseError) {
      res.status(500).json({ error: 'Corrupted log file' });
    }
  });
});

// POST /api/log – Add a new kṣhaṇa memory
app.post('/api/log', (req, res) => {
  const newLog = req.body;

  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read log file' });

    let logs = [];
    try {
      logs = JSON.parse(data);
    } catch {
      return res.status(500).json({ error: 'Log file is corrupted' });
    }

    logs.push({ ...newLog, timestamp: new Date().toISOString() });

    fs.writeFile(logFilePath, JSON.stringify(logs, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).json({ error: 'Failed to write log' });
      res.status(201).json({ message: 'Log added successfully' });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✨ Krudi Memory API running on http://localhost:${PORT}`);
});
