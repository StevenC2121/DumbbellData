import React from 'react';
import { Route, Routes } from 'react-router-dom';

import NavigationBar from './navbar';
import Home from './pages/home';
import Cardio from './pages/cardio';
import Weightlifting from './pages/weightlifting';
import WLstats from './pages/stats-weightlifting';
import CardioStats from './pages/stats-cardio';
import EditExercise from './pages/edit-exercise'
import Account from './pages/new-user';

function App() {
  return (
    <div>
      <NavigationBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weightlifting" element={<Weightlifting />} />
          <Route path="/cardio" element={<Cardio />} />
          <Route path="/new-user" element={<Account />} />
          <Route path="/edit-exercise" element={<EditExercise />} />
          <Route path="/wl-stats" element={<WLstats />} />
          <Route path="/cardio-stats" element={<CardioStats />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
