import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles/App.css';

// Pages
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Orders from './pages/Orders';
import Payments from './pages/Payments';
import Offers from './pages/Offers';
import Notifications from './pages/Notifications';
import Merchants from './pages/Merchants';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              Microservices Portal
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/users" className="nav-link">Users</Link>
              </li>
              <li className="nav-item">
                <Link to="/merchants" className="nav-link">Merchants</Link>
              </li>
              <li className="nav-item">
                <Link to="/orders" className="nav-link">Orders</Link>
              </li>
              <li className="nav-item">
                <Link to="/offers" className="nav-link">Offers</Link>
              </li>
              <li className="nav-item">
                <Link to="/payments" className="nav-link">Payments</Link>
              </li>
              <li className="nav-item">
                <Link to="/notifications" className="nav-link">Notifications</Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/merchants" element={<Merchants />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2025 Microservices Platform. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
