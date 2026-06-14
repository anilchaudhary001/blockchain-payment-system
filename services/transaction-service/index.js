require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');
const redis = require('redis');

const app = express();
const PORT = Number(process.env.PORT || 4000);

app.use(express.json());

const db = new Pool({
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'pass',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'crypto',
  port: Number(process.env.DB_PORT || 5432)
});

const cache = redis.createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });

cache.on('error', (error) => console.error('Redis error:', error.message));

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'transaction-service' });
});

app.get('/tx', async (_req, res) => {
  try {
    const result = await db.query('SELECT * FROM transactions ORDER BY id DESC LIMIT 20');
    res.json({ ok: true, rows: result.rows });
  } catch (error) {
    console.error('Transaction query failed:', error.message);
    res.status(503).json({ ok: false, message: 'Transaction database unavailable', error: error.message });
  }
});

app.post('/tx', async (req, res) => {
  const amount = Number(req.body.amount);
  const recipient = req.body.recipient;

  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ ok: false, message: 'amount must be a positive number' });
  }

  if (!recipient || typeof recipient !== 'string' || recipient.trim().length < 3) {
    return res.status(400).json({ ok: false, message: 'recipient must be a valid string' });
  }

  try {
    const result = await db.query(
      'INSERT INTO transactions (amount, currency, recipient, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [amount, req.body.currency || 'USD', recipient.trim(), req.body.status || 'created']
    );

    await cache.connect().catch(() => null);
    await cache.set(`tx:${result.rows[0].id}`, JSON.stringify(result.rows[0]));
    await cache.quit().catch(() => null);

    return res.status(201).json({ ok: true, transaction: result.rows[0] });
  } catch (error) {
    console.error('Transaction creation failed:', error.message);
    return res.status(503).json({ ok: false, message: 'Unable to create transaction', error: error.message });
  }
});

app.listen(PORT, () => console.log(`Transaction service running on port ${PORT}`));
