import React, { useState, useEffect } from 'react';
import { notificationAPI } from '../config/api';
import '../styles/pages.css';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    user_id: '',
    title: '',
    message: ''
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await notificationAPI.get('/notifications');
      setNotifications(response.data);
    } catch (err) {
      setError('Failed to fetch notifications: ' + err.message);
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
      await notificationAPI.post('/notifications', formData);
      setFormData({ user_id: '', title: '', message: '' });
      fetchNotifications();
      alert('Notification sent successfully!');
    } catch (err) {
      alert('Failed to send notification: ' + err.message);
      console.error(err);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Notifications Management</h1>
        <p>Send and manage notifications</p>
      </div>

      <div className="content-grid">
        <div className="form-section">
          <h2>Send Notification</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              name="user_id"
              placeholder="User ID"
              value={formData.user_id}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="title"
              placeholder="Notification Title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Send Notification</button>
          </form>
        </div>

        <div className="list-section">
          <h2>Notifications List</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {notifications.length === 0 && !loading && <p>No notifications found</p>}
          <div className="list">
            {notifications.map((notif) => (
              <div key={notif.id} className="list-item">
                <h4>{notif.title}</h4>
                <p>{notif.message}</p>
                <p>User ID: {notif.user_id}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
