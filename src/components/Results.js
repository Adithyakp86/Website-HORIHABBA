import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBulls, getPasses } from '../utils/dataManager';
import './Results.css';

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    calculateResults();
  }, []);

  const calculateResults = () => {
    const bulls = getBulls();
    const passes = getPasses();

    const resultsData = bulls
      .map(bull => ({
        ...bull,
        count: passes[bull.number] || 0
      }))
      .filter(bull => bull.count > 0)
      .sort((a, b) => b.count - a.count);

    setResults(resultsData);
    setWinner(resultsData.length > 0 ? resultsData[0] : null);
  };

  const exportToCSV = () => {
    if (results.length === 0) {
      alert('No results to export');
      return;
    }

    const headers = ['Rank', 'Bull Number', 'Bull Name', 'Owner', 'Village', 'Pass Count'];
    const rows = results.map((bull, index) => [
      index + 1,
      bull.number,
      bull.name,
      bull.owner,
      bull.village,
      bull.count
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `horihabba-results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const printResults = () => {
    window.print();
  };

  return (
    <div className="results-container">
      <header className="results-header">
        <div className="header-content">
          <button className="nav-btn" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
          <h1>📊 Results & Rankings</h1>
          <div className="spacer"></div>
        </div>
      </header>

      <main className="results-main">
        {winner && (
          <div className="winner-card">
            <div className="winner-badge">🏆</div>
            <h2>Winner</h2>
            <div className="winner-info">
              <div className="winner-name">{winner.name}</div>
              <div className="winner-details">
                <p>Bull #{winner.number}</p>
                <p>Owner: {winner.owner}</p>
                <p>Village: {winner.village}</p>
                <div className="winner-count">
                  <span className="count-label">Total Passes</span>
                  <span className="count-number">{winner.count}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="results-actions">
          <button onClick={calculateResults} className="action-btn refresh-btn">
            🔄 Refresh Results
          </button>
          <button onClick={exportToCSV} className="action-btn export-btn">
            📥 Export to CSV
          </button>
          <button onClick={printResults} className="action-btn print-btn">
            🖨️ Print Results
          </button>
        </div>

        <div className="results-card">
          <h3>Complete Rankings</h3>
          {results.length === 0 ? (
            <div className="empty-results">
              <p>No results available yet. Start counting bulls!</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Bull No</th>
                    <th>Bull Name</th>
                    <th>Owner</th>
                    <th>Village</th>
                    <th>Pass Count</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((bull, index) => (
                    <tr
                      key={bull.number}
                      className={index === 0 ? 'winner-row' : ''}
                    >
                      <td className="rank-cell">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                      </td>
                      <td className="bull-num-cell">#{bull.number}</td>
                      <td className="bull-name-cell">{bull.name}</td>
                      <td>{bull.owner}</td>
                      <td>{bull.village}</td>
                      <td>
                        <span className="count-badge-large">{bull.count}</span>
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

export default Results;
