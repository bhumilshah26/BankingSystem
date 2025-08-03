import './App.css';
import LandingPage from './pages/landingpage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import DashBoard from './pages/dashboard';
import ProtectedRoute from './pages/ProtectedRoute';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
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
