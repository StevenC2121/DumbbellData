import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './navbar';
import Home from './components/home';
import Cardio from './components/cardio';
import Weightlifting from './components/weightlifting';
import WLstats from './components/stats-weightlifting';
import CardioStats from './components/stats-cardio';

function App() {
  return (
    <>
      <NavigationBar />
      <div className="container">
        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path="/weightlifting" element={<Weightlifting />} />
          <Route path="/cardio" element={<Cardio />} />
          <Route path="/wl-stats" element={<WLstats />} />
          <Route path="/cardio-stats" element={<CardioStats />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
