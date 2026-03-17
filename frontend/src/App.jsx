import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ComposeMail from './components/ComposeMail';
import Sidebar from './components/Sidebar';
import MailList from './components/MailList';
import MailDetail from './components/MailDetail';
import useMailActions from './hooks/useMailActions';
import { Button, Container, Navbar, Offcanvas, Row, Col } from 'react-bootstrap';
import { IoMailOutline, IoMenuOutline } from 'react-icons/io5';

const Home = () => {
  const [showCompose, setShowCompose] = useState(false);
  const [selectedMail, setSelectedMail] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentFolder, setCurrentFolder] = useState('received');
  const { markAsRead, deleteMail } = useMailActions();
  const navigate = useNavigate();

  const handleFolderChange = (folder) => {
    setCurrentFolder(folder);
    setSelectedMail(null);
    setShowSidebar(false);
  };

  const handleSelectMail = async (mail) => {
    setSelectedMail(mail);
    setShowSidebar(false);
    if (!mail.isRead && currentFolder === 'received') {
      try {
        await markAsRead(mail._id);
        setUnreadCount(prev => Math.max(0, prev - 1));
      } catch (err) {
        console.error('Failed to mark mail as read', err);
      }
    }
  };

  const handleDeleteMail = async (mailId) => {
    try {
      await deleteMail(mailId);
      setSelectedMail(null);
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      console.error('Failed to delete email', err);
      alert('Failed to delete email');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className="vh-100 d-flex flex-column bg-light overflow-hidden">
      <Navbar bg="white" className="border-bottom px-3 py-2 flex-shrink-0 sticky-top">
        <Container fluid className="px-0">
          <div className="d-flex align-items-center">
            <Button 
              variant="light" 
              className="d-lg-none border-0 me-2" 
              onClick={() => setShowSidebar(true)}
            >
              <IoMenuOutline size={24} />
            </Button>
            <Navbar.Brand className="fw-bold text-primary d-flex align-items-center mb-0">
              <IoMailOutline className="me-2" size={28} />
              <span className="d-none d-sm-inline">MailBox</span>
            </Navbar.Brand>
          </div>
          
          <div className="ms-auto d-flex align-items-center gap-2 gap-md-3">
            <span className="text-muted small d-none d-md-block fw-medium">
              {localStorage.getItem('userEmail')}
            </span>
            <Button variant="outline-danger" size="sm" onClick={handleLogout} className="px-3 rounded-pill fw-medium">
              Logout
            </Button>
          </div>
        </Container>
      </Navbar>

      <Container fluid className="flex-grow-1 p-0 overflow-hidden">
        <Row className="h-100 g-0">
          <Col lg={3} xl={2} className="d-none d-lg-block border-end bg-white">
            <Sidebar
              onCompose={() => { setShowCompose(true); setShowSidebar(false); }}
              unreadCount={unreadCount}
              currentFolder={currentFolder}
              onFolderChange={handleFolderChange}
            />
          </Col>

          <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} className="d-lg-none">
            <Offcanvas.Header closeButton className="border-bottom bg-light">
              <Offcanvas.Title className="fw-bold text-primary d-flex align-items-center">
                <IoMailOutline className="me-2" size={24} />
                MailBox
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="p-0">
              <Sidebar
                onCompose={() => { setShowCompose(true); setShowSidebar(false); }}
                unreadCount={unreadCount}
                currentFolder={currentFolder}
                onFolderChange={handleFolderChange}
              />
            </Offcanvas.Body>
          </Offcanvas>

          <Col lg={9} xl={10} className="h-100 position-relative">
            <main className="h-100 p-0 p-md-4 d-flex flex-column overflow-hidden">
              {selectedMail ? (
                <MailDetail
                  mail={selectedMail}
                  onBack={() => setSelectedMail(null)}
                  onDelete={handleDeleteMail}
                />
              ) : (
                <MailList 
                  folder={currentFolder}
                  onSelectMail={handleSelectMail} 
                  onUpdateUnread={setUnreadCount}
                  refreshKey={refreshKey}
                />
              )}
            </main>
          </Col>
        </Row>
      </Container>

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
