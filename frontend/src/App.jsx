import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ComposeMail from './components/ComposeMail';

const Home = () => {
  const [showCompose, setShowCompose] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="text-center mt-5">
      <h1>Welcome to Mailbox Client!</h1>
      <div className="mt-4">
        <button className="btn btn-primary me-3" onClick={() => setShowCompose(true)}>Compose</button>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      <ComposeMail show={showCompose} handleClose={() => setShowCompose(false)} />
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
