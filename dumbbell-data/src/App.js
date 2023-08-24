import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './navbar';
import Home from './pages/home';
import Weightlifting from './pages/weightlifting';
import WLstats from './pages/stats-weightlifting';
import CardioStats from './pages/stats-cardio';
import EditExercise from './pages/edit-exercise';
import Signup from './pages/signup';
import Login from './pages/login';
import Logout from './pages/logout';
import { useUser } from './UserContext'; // Import the useUser hook

// PrivateRoute component
function PrivateRoute({ element }) {
  const { currentUser } = useUser();

  return currentUser ? element : <Navigate to="/" />;
}

function App() {
  return (
    <div>
      <NavigationBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          

          {/* Protected routes */}
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/weightlifting" element={<PrivateRoute element={<Weightlifting />} />} />
          <Route path="/edit-exercise/:id" element={<PrivateRoute element={<EditExercise />} />} />
          <Route path="/wl-stats" element={<PrivateRoute element={<WLstats />} />} />
          <Route path="/cardio-stats" element={<PrivateRoute element={<CardioStats />} />} />
          <Route path="/logout" element={<PrivateRoute element={<Logout />} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
