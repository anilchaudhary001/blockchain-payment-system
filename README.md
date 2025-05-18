# blockchain-payment-system

A blockchain-based payment system for secure and transparent transactions.

## Features

- Secure peer-to-peer payments
- Transaction history tracking
- Blockchain ledger implementation
- User authentication

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm

### Installation

```sh
npm install

cd ../../apps/gateway-api
npm init -y
npm install express cors body-parser dotenv
npm install nodemon --save-dev

# Create basic index.js
echo "require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => res.send('API running'));
app.listen(5000, () => console.log('Server running on port 5000'));" > index.js

# Add start script
npx npm-add-script -k "dev" -v "nodemon index.js"

# Run it
npm run dev
cd ../../apps/gateway-api
npm init -y
npm install express cors body-parser dotenv
npm install nodemon --save-dev

# Create basic index.js
echo "require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => res.send('API running'));
app.listen(5000, () => console.log('Server running on port 5000'));" > index.js

# Add start script
npx npm-add-script -k "dev" -v "nodemon index.js"

# Run it
npm run dev

curl https://get.ignite.com/cli! | bash

cd ../../blockchain
ignite scaffold chain payx-chain
cd payx-chain
ignite chain serve
cd ../../infra
touch docker-compose.yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: crypto
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7
    ports:
      - "6379:6379"

volumes:
  pgdata:

docker-compose up -d
cd ../services/transaction-service
npm init -y
npm install express pg redis
