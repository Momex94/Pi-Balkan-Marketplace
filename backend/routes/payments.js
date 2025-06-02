// backend/routes/payments.js
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const router = express.Router();

const PI_API_KEY = process.env.PI_API_KEY;
const PI_BASE_URL = 'https://api.minepi.com/v2/payments';

// Odobravanje plaćanja
router.post('/approve', async (req, res) => {
  const { paymentId } = req.body;
  try {
    const response = await fetch(`${PI_BASE_URL}/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        Authorization: `Key ${PI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Greška prilikom odobravanja plaćanja:', error);
    res.status(500).json({ error: 'Neuspešno odobravanje plaćanja' });
  }
});

// Završavanje plaćanja
router.post('/complete', async (req, res) => {
  const { paymentId, txid } = req.body;
  try {
    const response = await fetch(`${PI_BASE_URL}/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        Authorization: `Key ${PI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ txid }),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Greška prilikom završavanja plaćanja:', error);
    res.status(500).json({ error: 'Neuspešno završavanje plaćanja' });
  }
});

module.exports = router;
