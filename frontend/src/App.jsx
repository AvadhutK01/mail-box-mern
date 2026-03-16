import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ComposeMail from './components/ComposeMail';
import Sidebar from './components/Sidebar';
import MailList from './components/MailList';
import { Button, Container, Navbar } from 'react-bootstrap';
import { IoMailOutline } from 'react-icons/io5';

const Home = () => {
  const [showCompose, setShowCompose] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className="vh-100 d-flex flex-column bg-light">
      <Navbar bg="white" className="border-bottom px-4 py-2 flex-shrink-0">
        <Container fluid>
          <Navbar.Brand className="fw-bold text-primary d-flex align-items-center">
            <IoMailOutline className="me-2" size={28} />
            MailBox
          </Navbar.Brand>
          <div className="ms-auto d-flex align-items-center gap-3">
            <span className="text-muted small d-none d-md-block">
              {localStorage.getItem('userEmail')}
            </span>
            <Button variant="outline-danger" size="sm" onClick={handleLogout} className="px-3 rounded-pill">
              Logout
            </Button>
          </div>
        </Container>
      </Navbar>

      <div className="flex-grow-1 d-flex overflow-hidden">
        <Sidebar
          onCompose={() => setShowCompose(true)}
        />
        <main className="flex-grow-1 p-4 overflow-hidden d-flex flex-column">
          <MailList folder="received" />
        </main>
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
