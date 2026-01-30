import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBulls, getPasses, incrementPassCount } from '../utils/dataManager';
import './LiveCounting.css';

const LiveCounting = () => {
  const navigate = useNavigate();
  const [bullNumber, setBullNumber] = useState('');
  const [currentBull, setCurrentBull] = useState(null);
  const [passCount, setPassCount] = useState(0);
  const [bullsWithPasses, setBullsWithPasses] = useState([]);

  useEffect(() => {
    refreshTable();
    const interval = setInterval(refreshTable, 5000);
    return () => clearInterval(interval);
  }, []);

  const searchBull = () => {
    if (!bullNumber) {
      alert('Please enter a bull number');
      return;
    }

    const bulls = getBulls();
    const bull = bulls.find(b => b.number === bullNumber);

    if (!bull) {
      alert('Bull number not found! Please register the bull first.');
      setBullNumber('');
      setCurrentBull(null);
      return;
    }

    setCurrentBull(bull);
    const passes = getPasses();
    setPassCount(passes[bull.number] || 0);
    setBullNumber('');
  };

  const handleIncrement = () => {
    if (!currentBull) return;

    incrementPassCount(currentBull.number);
    const passes = getPasses();
    setPassCount(passes[currentBull.number] || 0);
    refreshTable();

    // Play sound (optional)
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGWi77+efTRAMUKfj8LZjHAY4kdfyzHksBSR3x/DdkEAKFF606euoVRQKRp/g8r5sIQUrgc7y2Yk2CBlou+/nn00QDFCn4/C2YxwGOJHX8sx5LAUkd8fw3ZBAC');
      audio.play().catch(() => {});
    } catch (e) {}
  };

  const quickIncrement = (bullNum) => {
    const bulls = getBulls();
    const bull = bulls.find(b => b.number === bullNum);
    if (bull) {
      setCurrentBull(bull);
      incrementPassCount(bullNum);
      const passes = getPasses();
      setPassCount(passes[bullNum] || 0);
      refreshTable();
    }
  };

  const refreshTable = () => {
    const bulls = getBulls();
    const passes = getPasses();

    const bullsWithCounts = bulls
      .filter(bull => {
        const count = passes[bull.number] || 0;
        return count > 0;
      })
      .map(bull => ({
        ...bull,
        count: passes[bull.number] || 0
      }))
      .sort((a, b) => b.count - a.count);

    setBullsWithPasses(bullsWithCounts);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchBull();
    }
  };

  return (
    <div className="live-counting-container">
      <header className="live-counting-header">
        <div className="header-content">
          <button className="nav-btn" onClick={() => navigate('/')}>
            ← Home
          </button>
          <h1>🐂 Live Bull Counting</h1>
          <button className="nav-btn" onClick={() => navigate('/results')}>
            Results →
          </button>
        </div>
      </header>

      <main className="live-counting-main">
        <div className="input-card">
          <div className="input-header">
            <div className="input-icon">🔢</div>
            <h2>Enter Bull Number</h2>
          </div>

          <div className="input-section">
            <input
              type="number"
              value={bullNumber}
              onChange={(e) => setBullNumber(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bull-number-input"
              placeholder="Enter Bull Number"
              autoFocus
            />
            <button onClick={searchBull} className="search-btn">
              🔍 Search Bull
            </button>
          </div>
        </div>

        {currentBull && (
          <div className="bull-details-card">
            <div className="bull-display">
              <div className="bull-icon">🐂</div>
              <h3 className="bull-name-display">{currentBull.name}</h3>
              <p className="bull-owner-display">
                Owner: <span>{currentBull.owner}</span>
              </p>
              <p className="bull-village-display">
                Village: <span>{currentBull.village}</span>
              </p>
              <p className="bull-number-display">Bull #{currentBull.number}</p>

              <div className="count-display">
                <p className="count-label">Current Pass Count</p>
                <p className="count-value">{passCount}</p>
              </div>

              <button onClick={handleIncrement} className="increment-btn">
                ➕ Bull Passed!
              </button>
            </div>
          </div>
        )}

        <div className="table-card">
          <div className="table-header">
            <h3>📊 Live Count Table</h3>
            <button onClick={refreshTable} className="refresh-btn">
              🔄 Refresh
            </button>
          </div>

          {bullsWithPasses.length === 0 ? (
            <div className="empty-table">
              <p>No passes recorded yet. Start counting!</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="count-table">
                <thead>
                  <tr>
                    <th>Bull No</th>
                    <th>Bull Name</th>
                    <th>Owner</th>
                    <th>Pass Count</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bullsWithPasses.map(bull => (
                    <tr key={bull.number}>
                      <td className="bull-num-cell">#{bull.number}</td>
                      <td>{bull.name}</td>
                      <td>{bull.owner}</td>
                      <td>
                        <span className="count-badge">{bull.count}</span>
                      </td>
                      <td>
                        <button
                          onClick={() => quickIncrement(bull.number)}
                          className="quick-increment-btn"
                        >
                          +1
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LiveCounting;
