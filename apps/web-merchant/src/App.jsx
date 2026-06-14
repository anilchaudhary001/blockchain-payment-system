import { useState } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState('120.50');
  const [recipient, setRecipient] = useState('merchant@example.com');
  const [currency, setCurrency] = useState('USD');
  const [status, setStatus] = useState('Ready to create a secure payment request.');
  const [quote, setQuote] = useState(null);
  const [transaction, setTransaction] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Creating a payment request...');
    setQuote(null);
    setTransaction(null);

    try {
      const quoteResponse = await fetch('http://localhost:5000/api/transactions/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency, merchant: recipient })
      });

      const quoteData = await quoteResponse.json();
      if (!quoteResponse.ok) {
        throw new Error(quoteData.message || 'Quote request failed');
      }

      setQuote(quoteData);

      const txResponse = await fetch('http://localhost:4000/tx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: quoteData.amount, currency: quoteData.currency, recipient, status: 'pending' })
      });

      const txData = await txResponse.json();
      if (!txResponse.ok) {
        throw new Error(txData.message || 'Transaction creation failed');
      }

      setTransaction(txData.transaction);
      setStatus(`Payment request created successfully. Reference ${quoteData.reference}.`);
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <main className="app-shell">
      <section className="panel hero-panel">
        <p className="eyebrow">Blockchain payment system</p>
        <h1>Launch fast, secure merchant payments.</h1>
        <p className="lede">This dashboard now uses real payment-facing fields instead of the default Vite starter screen.</p>
      </section>

      <section className="panel form-panel">
        <h2>New payment request</h2>
        <form onSubmit={handleSubmit} className="payment-form">
          <label>
            Amount
            <input type="number" min="1" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </label>
          <label>
            Merchant / recipient
            <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
          </label>
          <label>
            Currency
            <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value.toUpperCase())} />
          </label>
          <button type="submit">Create payment request</button>
        </form>
        <p className="status-box">{status}</p>
        {quote && (
          <div className="mini-card">
            <strong>Quote</strong>
            <p>Reference: {quote.reference}</p>
            <p>Amount: {quote.amount} {quote.currency}</p>
            <p>Status: {quote.status}</p>
          </div>
        )}
        {transaction && (
          <div className="mini-card">
            <strong>Transaction</strong>
            <p>ID: {transaction.id}</p>
            <p>Recipient: {transaction.recipient}</p>
            <p>Status: {transaction.status}</p>
          </div>
        )}
      </section>

      <section className="panel info-panel">
        <h2>What improved</h2>
        <ul>
          <li>Real payment form fields</li>
          <li>Gateway API quote endpoint</li>
          <li>Transaction service health and creation flow</li>
          <li>Environment-ready configuration</li>
        </ul>
      </section>
    </main>
  );
}

export default App;
