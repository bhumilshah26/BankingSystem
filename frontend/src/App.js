import './App.css';
import LandingPage from './pages/landingpage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import DashBoard from './pages/dashboard';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
          <DashBoard />
          </ProtectedRoute>
          } />
      </Routes>
    </Router>
  );
}

export default App;
