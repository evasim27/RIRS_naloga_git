import React, { useState, useEffect } from 'react';
import { paymentAPI } from '../config/api';
import '../styles/pages.css';

function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    card_number: '',
    card_holder: '',
    expiry_date: '',
    cvv: '',
    amount: ''
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await paymentAPI.get('/payments');
      setPayments(response.data);
    } catch (err) {
      setError('Failed to fetch payments: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await paymentAPI.post('/payments', formData);
      setFormData({ card_number: '', card_holder: '', expiry_date: '', cvv: '', amount: '' });
      fetchPayments();
      alert('Payment processed successfully!');
    } catch (err) {
      alert('Failed to process payment: ' + err.message);
      console.error(err);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Payments Management</h1>
        <p>Process and manage payments</p>
      </div>

      <div className="content-grid">
        <div className="form-section">
          <h2>Process Payment</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="card_number"
              placeholder="Card Number"
              value={formData.card_number}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="card_holder"
              placeholder="Card Holder Name"
              value={formData.card_holder}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="expiry_date"
              placeholder="MM/YY"
              value={formData.expiry_date}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleInputChange}
              step="0.01"
              required
            />
            <button type="submit">Process Payment</button>
          </form>
        </div>

        <div className="list-section">
          <h2>Payment Transactions</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {payments.length === 0 && !loading && <p>No payments found</p>}
          <div className="list">
            {payments.map((payment) => (
              <div key={payment.id} className="list-item">
                <h4>Payment #{payment.id}</h4>
                <p>Amount: ${payment.amount || '0.00'}</p>
                <p>Status: {payment.status || 'Pending'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payments;
