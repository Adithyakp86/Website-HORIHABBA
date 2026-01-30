import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBulls, addBull, removeBull } from '../utils/dataManager';
import './AddBull.css';

const AddBull = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    number: '',
    name: '',
    owner: '',
    village: '',
    color: ''
  });
  const [bulls, setBulls] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadBulls();
  }, []);

  const loadBulls = () => {
    setBulls(getBulls());
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if bull number already exists
    const existingBulls = getBulls();
    if (existingBulls.find(b => b.number === formData.number)) {
      setMessage({ type: 'error', text: 'Bull number already exists! Please use a different number.' });
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      return;
    }

    // Validate required fields
    if (!formData.number || !formData.name || !formData.owner || !formData.village) {
      setMessage({ type: 'error', text: 'Please fill all required fields.' });
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      return;
    }

    // Save bull
    const bull = {
      ...formData,
      registeredAt: new Date().toISOString()
    };

    addBull(bull);
    
    setMessage({ type: 'success', text: '✅ Bull details saved successfully!' });
    setFormData({
      number: '',
      name: '',
      owner: '',
      village: '',
      color: ''
    });
    
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    loadBulls();
  };

  const handleDelete = (bullNumber) => {
    if (window.confirm('Are you sure you want to delete this bull?')) {
      removeBull(bullNumber);
      loadBulls();
    }
  };

  return (
    <div className="add-bull-container">
      <header className="add-bull-header">
        <div className="header-content">
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
          <h1>➕ Add Bull Details</h1>
          <div className="spacer"></div>
        </div>
      </header>

      <main className="add-bull-main">
        <div className="form-card">
          <div className="form-header">
            <div className="form-icon">🐂</div>
            <h2>Register New Bull</h2>
            <p>Enter bull information for festival tracking</p>
          </div>

          <form onSubmit={handleSubmit} className="bull-form">
            <div className="form-group">
              <label htmlFor="number">
                Bull Number <span className="required">*</span>
              </label>
              <input
                type="number"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter unique bull number"
              />
              <p className="form-hint">This number will be used during live counting</p>
            </div>

            <div className="form-group">
              <label htmlFor="name">
                Bull Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter bull name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="owner">
                Owner Name (Farmer) <span className="required">*</span>
              </label>
              <input
                type="text"
                id="owner"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter owner/farmer name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="village">
                Village / Area <span className="required">*</span>
              </label>
              <input
                type="text"
                id="village"
                name="village"
                value={formData.village}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter village or area name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="color">
                Bull Color / Mark (Optional)
              </label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., Brown with white mark"
              />
            </div>

            <button type="submit" className="submit-btn">
              ✅ Save Bull Details
            </button>
          </form>

          {message.text && (
            <div className={`message ${message.type}`}>
              <p>{message.text}</p>
            </div>
          )}
        </div>

        <div className="bulls-list-card">
          <h3>Registered Bulls</h3>
          <div className="bulls-list">
            {bulls.length === 0 ? (
              <p className="empty-message">No bulls registered yet.</p>
            ) : (
              bulls.map(bull => (
                <div key={bull.number} className="bull-item">
                  <div className="bull-info">
                    <span className="bull-number">#{bull.number}</span>
                    <span className="bull-name">{bull.name}</span>
                    <span className="bull-owner">- {bull.owner} ({bull.village})</span>
                  </div>
                  <button
                    onClick={() => handleDelete(bull.number)}
                    className="delete-btn"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddBull;
