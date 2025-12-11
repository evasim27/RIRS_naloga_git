import React, { useState, useEffect } from 'react';
import { userAPI } from '../config/api';
import '../styles/pages.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userAPI.get('/users');
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users: ' + err.message);
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
      await userAPI.post('/users', formData);
      setFormData({ username: '', email: '', password: '' });
      fetchUsers();
      alert('User created successfully!');
    } catch (err) {
      alert('Failed to create user: ' + err.message);
      console.error(err);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Users Management</h1>
        <p>Create and manage user accounts</p>
      </div>

      <div className="content-grid">
        <div className="form-section">
          <h2>Create New User</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Create User</button>
          </form>
        </div>

        <div className="list-section">
          <h2>Users List</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {users.length === 0 && !loading && <p>No users found</p>}
          <div className="list">
            {users.map((user) => (
              <div key={user.id} className="list-item">
                <h4>{user.username}</h4>
                <p>Email: {user.email}</p>
                <p>ID: {user.id}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
