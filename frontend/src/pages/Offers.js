import React, { useState, useEffect } from 'react';
import { offerAPI } from '../config/api';
import '../styles/pages.css';

function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discount_percentage: '',
    valid_until: ''
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await offerAPI.get('/offers');
      setOffers(response.data);
    } catch (err) {
      setError('Failed to fetch offers: ' + err.message);
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
      await offerAPI.post('/offers', formData);
      setFormData({ title: '', description: '', discount_percentage: '', valid_until: '' });
      fetchOffers();
      alert('Offer created successfully!');
    } catch (err) {
      alert('Failed to create offer: ' + err.message);
      console.error(err);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Offers Management</h1>
        <p>Create and manage special offers</p>
      </div>

      <div className="content-grid">
        <div className="form-section">
          <h2>Create New Offer</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Offer Title"
              value={formData.title}
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
              type="number"
              name="discount_percentage"
              placeholder="Discount %"
              value={formData.discount_percentage}
              onChange={handleInputChange}
              min="0"
              max="100"
            />
            <input
              type="date"
              name="valid_until"
              value={formData.valid_until}
              onChange={handleInputChange}
            />
            <button type="submit">Create Offer</button>
          </form>
        </div>

        <div className="list-section">
          <h2>Offers List</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {offers.length === 0 && !loading && <p>No offers found</p>}
          <div className="list">
            {offers.map((offer) => (
              <div key={offer.id} className="list-item">
                <h4>{offer.title}</h4>
                <p>{offer.description}</p>
                {offer.discount_percentage && <p>Discount: {offer.discount_percentage}%</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offers;
