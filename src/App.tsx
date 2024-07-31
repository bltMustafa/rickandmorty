import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import SeasonList from './Components/SeasonList';
import SeasonDetail from './Components/SeasonDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SeasonList />} />
        <Route path="/season/:seasonNumber" element={<SeasonDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
