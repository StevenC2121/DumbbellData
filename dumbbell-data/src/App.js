import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './navbar';
import Home from './pages/home';
import Cardio from './pages/cardio';
import Weightlifting from './pages/weightlifting';
import WLstats from './pages/stats-weightlifting';
import CardioStats from './pages/stats-cardio';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1 }}>
        <NavigationBar />
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weightlifting" element={<Weightlifting />} />
            <Route path="/cardio" element={<Cardio />} />
            <Route path="/wl-stats" element={<WLstats />} />
            <Route path="/cardio-stats" element={<CardioStats />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
