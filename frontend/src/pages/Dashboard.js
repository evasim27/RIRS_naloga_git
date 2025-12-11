import React from 'react';
import '../styles/pages.css';

function Dashboard() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome to the Microservices Platform</p>
      </div>

      <div className="cards-grid">
        <div className="card">
          <h3>Users Service</h3>
          <p>Manage user accounts and authentication</p>
        </div>
        <div className="card">
          <h3>Merchants Service</h3>
          <p>Manage merchants and locations</p>
        </div>
        <div className="card">
          <h3>Orders Service</h3>
          <p>Track and manage orders</p>
        </div>
        <div className="card">
          <h3>Offers Service</h3>
          <p>Create and manage special offers</p>
        </div>
        <div className="card">
          <h3>Payments Service</h3>
          <p>Process and track payments</p>
        </div>
        <div className="card">
          <h3>Notifications Service</h3>
          <p>Send and manage notifications</p>
        </div>
      </div>

      <div className="info-section">
        <h2>Platform Overview</h2>
        <p>
          This is a microservices-based platform with separate services for users, merchants, orders, offers, payments, and notifications.
          Use the navigation menu to access each service's management interface.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
