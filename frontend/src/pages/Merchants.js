import React, { useState, useEffect } from 'react';
import { merchantAPI } from '../config/api';
import '../styles/pages.css';

function Merchants() {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo_url: ''
  });

  useEffect(() => {
    fetchMerchants();
  }, []);

  const fetchMerchants = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await merchantAPI.get('/merchants');
      setMerchants(response.data);
    } catch (err) {
      setError('Failed to fetch merchants: ' + err.message);
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
      await merchantAPI.post('/merchants', formData);
      setFormData({ name: '', description: '', logo_url: '' });
      fetchMerchants();
      alert('Merchant created successfully!');
    } catch (err) {
      alert('Failed to create merchant: ' + err.message);
      console.error(err);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Merchants Management</h1>
        <p>Create and manage merchant accounts</p>
      </div>

      <div className="content-grid">
        <div className="form-section">
          <h2>Create New Merchant</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Merchant Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <input
              type="url"
              name="logo_url"
              placeholder="Logo URL"
              value={formData.logo_url}
              onChange={handleInputChange}
            />
            <button type="submit">Create Merchant</button>
          </form>
        </div>

        <div className="list-section">
          <h2>Merchants List</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {merchants.length === 0 && !loading && <p>No merchants found</p>}
          <div className="list">
            {merchants.map((merchant) => (
              <div key={merchant.id} className="list-item">
                <h4>{merchant.name}</h4>
                <p>{merchant.description}</p>
                <p>ID: {merchant.id}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Merchants;
