import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api';

const KrudiAgentDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [formData, setFormData] = useState({
    agent: 'Krudi',
    intent: '',
    action: '',
  });
  const [message, setMessage] = useState('');

  // Fetch memory on mount
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setLogs(data))
      .catch(() => setMessage('⚠️ Failed to fetch logs'));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit new memory log
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    if (res.ok) {
      setMessage('✅ Kṣhaṇa logged');
      setLogs([...logs, { ...formData, timestamp: new Date().toISOString() }]);
      setFormData({ agent: 'Krudi', intent: '', action: '' });
    } else {
      setMessage(`⚠️ Error: ${result.error}`);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '1rem' }}>
      <h2>🌀 Krudi Agent Dashboard</h2>
      <p>Log kṣhaṇa memory and view sacred interactions below.</p>

      <form onSubmit={handleSubmit}>
        <input
          name="intent"
          placeholder="Intent (e.g., sacred test)"
          value={formData.intent}
          onChange={handleChange}
          required
        />
        <input
          name="action"
          placeholder="Action (e.g., heartbeat)"
          value={formData.action}
          onChange={handleChange}
          required
        />
        <button type="submit">Log Kṣhaṇa</button>
      </form>

      {message && <p>{message}</p>}

      <hr />
      <h3>📜 Logged Kṣhaṇas</h3>
      <ul>
        {logs.map((log, idx) => (
          <li key={idx}>
            <strong>{log.agent}</strong>: {log.intent} → {log.action}<br />
            <small>{new Date(log.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KrudiAgentDashboard;
