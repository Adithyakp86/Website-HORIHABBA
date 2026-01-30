import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import AddBull from './components/AddBull';
import LiveCounting from './components/LiveCounting';
import Results from './components/Results';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-bull" element={<AddBull />} />
          <Route path="/live-counting" element={<LiveCounting />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
