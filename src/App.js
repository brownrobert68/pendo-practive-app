import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';

// Authentication Context
const AuthContext = createContext(null);

// Mock user database with different roles
const MOCK_USERS = [
  { username: 'admin', password: 'admin123', role: 'admin', name: 'Admin User' },
  { username: 'manager', password: 'manager123', role: 'manager', name: 'Manager User' },
  { username: 'user', password: 'user123', role: 'user', name: 'Regular User' },
  { username: 'viewer', password: 'viewer123', role: 'viewer', name: 'Viewer User' }
];

// Login Component
function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = MOCK_USERS.find(
      u => u.username === credentials.username && u.password === credentials.password
    );

    if (user) {
      login(user);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login to Pendo Practice App</h1>
        <p className="login-subtitle">Choose a demo account to explore different roles</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" id="login-btn" className="login-btn">
            Log In
          </button>
        </form>

        <div className="demo-accounts">
          <h3>Demo Accounts:</h3>
          <div className="account-list">
            <div className="account-item">
              <strong>Admin:</strong> admin / admin123
              <span className="role-badge admin">Full Access</span>
            </div>
            <div className="account-item">
              <strong>Manager:</strong> manager / manager123
              <span className="role-badge manager">Manage & View</span>
            </div>
            <div className="account-item">
              <strong>User:</strong> user / user123
              <span className="role-badge user">Standard Access</span>
            </div>
            <div className="account-item">
              <strong>Viewer:</strong> viewer / viewer123
              <span className="role-badge viewer">Read Only</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Protected Route Component
function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return (
      <div className="page">
        <div className="access-denied">
          <h1>🚫 Access Denied</h1>
          <p>Your role ({currentUser.role}) does not have permission to access this page.</p>
          <p>Required roles: {allowedRoles.join(', ')}</p>
        </div>
      </div>
    );
  }

  return children;
}

// Home Page Component
function Home() {
  const { currentUser } = useContext(AuthContext);
  const [count, setCount] = useState(0);
  
  return (
    <div className="page">
      <div className="welcome-header">
        <h1>Welcome back, {currentUser.name}!</h1>
        <span className={`role-badge ${currentUser.role}`}>
          Role: {currentUser.role.toUpperCase()}
        </span>
      </div>
      <p>This is a sample application to help you practice Pendo analytics tracking with role-based access.</p>
      
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
  const { currentUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Role-based feature access
  const canViewAnalytics = ['admin', 'manager'].includes(currentUser.role);
  const canGenerateReports = ['admin', 'manager'].includes(currentUser.role);
  const canExportData = ['admin'].includes(currentUser.role);
  
  return (
    <div className="page">
      <h1>Dashboard</h1>
      <p className="role-info">Viewing as: <span className={`role-badge ${currentUser.role}`}>{currentUser.role}</span></p>
      
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
          onClick={() => canViewAnalytics && setActiveTab('analytics')}
          id="tab-analytics"
          disabled={!canViewAnalytics}
          title={!canViewAnalytics ? 'Admin or Manager role required' : ''}
        >
          Analytics {!canViewAnalytics && '🔒'}
        </button>
        <button 
          className={activeTab === 'reports' ? 'active' : ''}
          onClick={() => canGenerateReports && setActiveTab('reports')}
          id="tab-reports"
          disabled={!canGenerateReports}
          title={!canGenerateReports ? 'Admin or Manager role required' : ''}
        >
          Reports {!canGenerateReports && '🔒'}
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
            {canExportData ? (
              <button id="export-data">Export Data</button>
            ) : (
              <button id="export-data" disabled title="Admin role required">
                Export Data 🔒
              </button>
            )}
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

// Admin Settings Page Component
function AdminSettings() {
  const { currentUser } = useContext(AuthContext);
  const [settings, setSettings] = useState({
    siteName: 'Pendo Practice App',
    maintenanceMode: false,
    allowRegistration: true,
    maxUsers: 100
  });

  const handleSettingChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value
    });
  };

  return (
    <div className="page">
      <h1>⚙️ Admin Settings</h1>
      <p className="role-info">Admin-only area</p>

      <div className="settings-panel">
        <div className="setting-item">
          <label htmlFor="site-name">Site Name:</label>
          <input
            type="text"
            id="site-name"
            value={settings.siteName}
            onChange={(e) => handleSettingChange('siteName', e.target.value)}
          />
        </div>

        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              id="maintenance-mode"
              checked={settings.maintenanceMode}
              onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
            />
            Enable Maintenance Mode
          </label>
        </div>

        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              id="allow-registration"
              checked={settings.allowRegistration}
              onChange={(e) => handleSettingChange('allowRegistration', e.target.checked)}
            />
            Allow New User Registration
          </label>
        </div>

        <div className="setting-item">
          <label htmlFor="max-users">Maximum Users:</label>
          <input
            type="number"
            id="max-users"
            value={settings.maxUsers}
            onChange={(e) => handleSettingChange('maxUsers', parseInt(e.target.value))}
            min="1"
            max="1000"
          />
        </div>

        <button id="save-settings" className="save-btn">
          Save Settings
        </button>
      </div>

      <div className="user-management">
        <h2>User Management</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map(user => (
              <tr key={user.username}>
                <td>{user.username}</td>
                <td><span className={`role-badge ${user.role}`}>{user.role}</span></td>
                <td>{user.name}</td>
                <td>
                  <button className="small-btn" id={`edit-${user.username}`}>Edit</button>
                  <button className="small-btn danger" id={`delete-${user.username}`}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Contact Form Component
function Contact() {
  const { currentUser } = useContext(AuthContext);
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
  const [currentUser, setCurrentUser] = useState(null);

  const login = (user) => {
    setCurrentUser(user);
    // In a real app, you'd also update Pendo here with user info
    if (window.pendo) {
      window.pendo.identify({
        visitor: {
          id: user.username,
          role: user.role,
          name: user.name
        }
      });
    }
  };

  const logout = () => {
    setCurrentUser(null);
    // Clear Pendo identification
    if (window.pendo) {
      window.pendo.clearSession();
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      <Router>
        <div className="App">
          {currentUser && (
            <nav className="navbar">
              <div className="nav-brand">Pendo Practice</div>
              <ul className="nav-links">
                <li><Link to="/" id="nav-home">Home</Link></li>
                <li><Link to="/dashboard" id="nav-dashboard">Dashboard</Link></li>
                {['admin'].includes(currentUser.role) && (
                  <li><Link to="/admin" id="nav-admin">Admin</Link></li>
                )}
                <li><Link to="/contact" id="nav-contact">Contact</Link></li>
              </ul>
              <div className="user-info">
                <span className="user-name">{currentUser.name}</span>
                <button onClick={logout} id="logout-btn" className="logout-btn">
                  Logout
                </button>
              </div>
            </nav>
          )}
          
          <main className="main-content">
            <Routes>
              <Route path="/login" element={
                currentUser ? <Navigate to="/" replace /> : <Login />
              } />
              
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminSettings />
                </ProtectedRoute>
              } />
              
              <Route path="/contact" element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} replace />} />
            </Routes>
          </main>
          
          {currentUser && (
            <footer className="footer">
              <p>&copy; 2024 Pendo Practice App. Built for analytics tracking practice.</p>
            </footer>
          )}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
