require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = Number(process.env.PORT || 5000);

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'gateway-api', uptime: process.uptime().toFixed(2) });
});

app.post('/api/transactions/quote', (req, res) => {
  const amount = Number(req.body.amount);
  const currency = req.body.currency || 'USD';

  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ ok: false, message: 'amount must be a positive number' });
  }

  const reference = `PAY-${Date.now()}`;

  return res.json({
    ok: true,
    reference,
    amount,
    currency,
    status: 'pending',
    merchant: req.body.merchant || 'Demo Merchant'
  });
});

app.use((_req, res) => {
  res.status(404).json({ ok: false, message: 'Route not found' });
});

app.listen(PORT, () => console.log(`Gateway API running on port ${PORT}`));
