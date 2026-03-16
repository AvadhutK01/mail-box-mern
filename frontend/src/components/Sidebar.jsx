import { Nav, Button } from 'react-bootstrap';
import { IoMailOutline, IoSendOutline, IoPencil } from 'react-icons/io5';

const Sidebar = ({ onCompose }) => {
  return (
    <div className="bg-light h-100 p-3" style={{ width: '240px', borderRight: '1px solid #dee2e6' }}>
      <Button 
        variant="primary" 
        className="w-100 mb-4 py-2 shadow-sm d-flex align-items-center justify-content-center" 
        onClick={onCompose}
        style={{ borderRadius: '12px', fontWeight: '500' }}
      >
        <IoPencil className="me-2" />
        Compose
      </Button>
      <Nav variant="pills" className="flex-column gap-1">
        <Nav.Item>
          <Nav.Link 
            active={true}
            className="d-flex align-items-center px-3 py-2 bg-primary text-white shadow-sm"
            style={{ borderRadius: '8px', cursor: 'pointer' }}
          >
            <IoMailOutline size={20} className="me-3" />
            Inbox
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
