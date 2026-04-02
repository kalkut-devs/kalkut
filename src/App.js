import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KalKutPremiumPortfolio from './KalKutPremiumPortfolio';
import ProjectDetail from './ProjectDetail';
import BlogDetail from './BlogDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<KalKutPremiumPortfolio />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;