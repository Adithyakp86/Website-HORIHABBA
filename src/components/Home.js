import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBulls, getPasses } from '../utils/dataManager';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBulls: 0,
    totalPasses: 0,
    activeBulls: 0,
    topCount: 0
  });

  useEffect(() => {
    updateStats();
  }, []);

  const updateStats = () => {
    const bulls = getBulls();
    const passes = getPasses();
    
    let totalPasses = 0;
    let activeBulls = 0;
    let topCount = 0;
    
    Object.keys(passes).forEach(bullNumber => {
      const count = passes[bullNumber];
      totalPasses += count;
      if (count > 0) activeBulls++;
      if (count > topCount) topCount = count;
    });
    
    setStats({
      totalBulls: bulls.length,
      totalPasses,
      activeBulls,
      topCount
    });
  };

  const festivalDate = new Date(new Date().getFullYear(), 2, 15).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1>🌾 HoriHabba 2026</h1>
          <p className="subtitle">Bull Tracking & Management System</p>
          <p className="date-info">Festival Date: {festivalDate}</p>
        </div>
      </header>

      <main className="home-main">
        <div className="welcome-card">
          <div className="welcome-icon">🐂</div>
          <h2>Welcome to HoriHabba Bull Tracking</h2>
          <p>Digitally modernize your festival while respecting tradition</p>
        </div>

        <div className="action-cards">
          <div className="action-card" onClick={() => navigate('/add-bull')}>
            <div className="action-icon">➕</div>
            <h3>Add Bull Details</h3>
            <p>Register bulls before the festival</p>
            <span className="badge badge-blue">Setup</span>
          </div>

          <div className="action-card" onClick={() => navigate('/live-counting')}>
            <div className="action-icon">🐂</div>
            <h3>Live Counting</h3>
            <p>Track bull passes in real-time</p>
            <span className="badge badge-green">Active</span>
          </div>

          <div className="action-card" onClick={() => navigate('/results')}>
            <div className="action-icon">📊</div>
            <h3>View Results</h3>
            <p>See rankings and winners</p>
            <span className="badge badge-purple">Results</span>
          </div>
        </div>

        <div className="stats-card">
          <h3>Quick Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value stat-blue">{stats.totalBulls}</div>
              <div className="stat-label">Total Bulls</div>
            </div>
            <div className="stat-item">
              <div className="stat-value stat-green">{stats.totalPasses}</div>
              <div className="stat-label">Total Passes</div>
            </div>
            <div className="stat-item">
              <div className="stat-value stat-orange">{stats.activeBulls}</div>
              <div className="stat-label">Active Today</div>
            </div>
            <div className="stat-item">
              <div className="stat-value stat-purple">{stats.topCount}</div>
              <div className="stat-label">Top Count</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="home-footer">
        <p>&copy; 2026 HoriHabba Festival Committee. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
