import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Home Page Component
function Home() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="page">
      <h1>Welcome to Pendo Practice App</h1>
      <p>This is a sample application to help you practice Pendo analytics tracking.</p>
      
      <div className="card">
        <h2>Interactive Counter</h2>
        <p>Current count: {count}</p>
        <button onClick={() => setCount(count + 1)} id="increment-btn">
          Increment
        </button>
        <button onClick={() => setCount(count - 1)} id="decrement-btn">
          Decrement
        </button>
        <button onClick={() => setCount(0)} id="reset-btn">
          Reset
        </button>
      </div>
      
      <div className="card">
        <h2>Quick Actions</h2>
        <button id="action-1">Action 1</button>
        <button id="action-2">Action 2</button>
        <button id="action-3">Action 3</button>
      </div>
    </div>
  );
}

// Dashboard Page Component
function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="page">
      <h1>Dashboard</h1>
      
      <div className="tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
          id="tab-overview"
        >
          Overview
        </button>
        <button 
          className={activeTab === 'analytics' ? 'active' : ''}
          onClick={() => setActiveTab('analytics')}
          id="tab-analytics"
        >
          Analytics
        </button>
        <button 
          className={activeTab === 'reports' ? 'active' : ''}
          onClick={() => setActiveTab('reports')}
          id="tab-reports"
        >
          Reports
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div>
            <h2>Overview</h2>
            <div className="stats">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p className="stat-number">1,234</p>
              </div>
              <div className="stat-card">
                <h3>Active Sessions</h3>
                <p className="stat-number">89</p>
              </div>
              <div className="stat-card">
                <h3>Conversion Rate</h3>
                <p className="stat-number">12.5%</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div>
            <h2>Analytics</h2>
            <p>View detailed analytics and metrics here.</p>
            <button id="export-data">Export Data</button>
          </div>
        )}
        
        {activeTab === 'reports' && (
          <div>
            <h2>Reports</h2>
            <p>Generate and view reports here.</p>
            <button id="generate-report">Generate Report</button>
          </div>
        )}
      </div>
    </div>
  );
}

// Contact Form Component
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <div className="page">
      <h1>Contact Us</h1>
      
      {submitted ? (
        <div className="success-message">
          Thank you for your message! We'll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>
          
          <button type="submit" id="submit-contact">Send Message</button>
        </form>
      )}
    </div>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-brand">Pendo Practice</div>
          <ul className="nav-links">
            <li><Link to="/" id="nav-home">Home</Link></li>
            <li><Link to="/dashboard" id="nav-dashboard">Dashboard</Link></li>
            <li><Link to="/contact" id="nav-contact">Contact</Link></li>
          </ul>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        <footer className="footer">
          <p>&copy; 2024 Pendo Practice App. Built for analytics tracking practice.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
