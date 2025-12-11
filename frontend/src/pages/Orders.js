import React, { useState, useEffect } from 'react';
import { orderAPI } from '../config/api';
import '../styles/pages.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await orderAPI.get('/orders');
      setOrders(response.data);
    } catch (err) {
      setError('Failed to fetch orders: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Orders Management</h1>
        <p>View and manage customer orders</p>
      </div>

      <div className="list-section">
        <h2>Orders List</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {orders.length === 0 && !loading && <p>No orders found</p>}
        <div className="list">
          {orders.map((order) => (
            <div key={order.id} className="list-item">
              <h4>Order #{order.id}</h4>
              <p>Status: {order.status || 'Pending'}</p>
              <p>Total: ${order.total || '0.00'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
