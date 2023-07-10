import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './navbar';
import Home from './pages/home';
import Weightlifting from './pages/weightlifting';
import WLstats from './pages/stats-weightlifting';
import CardioStats from './pages/stats-cardio';
import EditExercise from './pages/edit-exercise'
import Signup from './pages/signup';
import Login from './pages/login'


function App() {
  return (
    <div>
      <NavigationBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/weightlifting" element={<Weightlifting />} />
          <Route path="/new-user" element={<Signup />} />
          <Route path="/edit-exercise/:id" element={<EditExercise />} />
          <Route path="/wl-stats" element={<WLstats />} />
          <Route path="/cardio-stats" element={<CardioStats />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
