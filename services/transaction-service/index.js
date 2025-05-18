const express = require('express');
const { Pool } = require('pg');
const redis = require('redis');
const app = express();

const db = new Pool({ user: 'user', password: 'pass', host: 'localhost', database: 'crypto', port: 5432 });
const cache = redis.createClient();

app.get('/tx', async (req, res) => {
  const result = await db.query('SELECT * FROM transactions');
  res.json(result.rows);
});

app.listen(4000, () => console.log('Tx service on 4000'));
