import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './navbar';
import Home from './pages/home';
import Weightlifting from './pages/weightlifting';
import WLstats from './pages/stats-weightlifting';
import EditExercise from './pages/edit-exercise'
import SignUp from './pages/new-user';
import Login from './pages/login'

function App() {
  return (
    <div>
      <NavigationBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weightlifting" element={<Weightlifting />} />
          <Route path="/new-user" element={<SignUp />} />
          <Route path="/edit-exercise/:id" element={<EditExercise />} />
          <Route path="/wl-stats" element={<WLstats />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
