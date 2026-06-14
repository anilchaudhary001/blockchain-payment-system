# blockchain-payment-system

A lightweight blockchain-inspired payment system with a merchant frontend, gateway API, and transaction service.

## What is included

- Merchant payment form in the React app
- Gateway API for payment quotes and status checks
- Transaction service for reading and creating transactions
- Basic environment-based configuration for local development

## Quick start

### 1. Install dependencies

```sh
cd apps/gateway-api && npm install
cd ../web-merchant && npm install
cd ../../services/transaction-service && npm install
```

### 2. Run the services

```sh
cd apps/gateway-api && npm run dev
cd apps/web-merchant && npm run dev
cd services/transaction-service && node index.js
```

### 3. Verify the endpoints

```sh
curl http://localhost:5000/api/health
curl http://localhost:4000/health
```

## Suggested next improvements

- Add real wallet signing and blockchain confirmation flow
- Add authentication and payment authorization
- Add rate limiting, request validation, and structured logs
- Add tests and CI for the gateway and transaction service
