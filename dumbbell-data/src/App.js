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
import Admin from './pages/admin';


function App() {
  return (
    <div>
      <NavigationBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/weightlifting" element={<Weightlifting />} />
          <Route path="/new-user" element={<Signup />} />
          <Route path="/edit-exercise/:id" element={<EditExercise />} />
          <Route path="/wl-stats" element={<WLstats />} />
          <Route path="/cardio-stats" element={<CardioStats />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
