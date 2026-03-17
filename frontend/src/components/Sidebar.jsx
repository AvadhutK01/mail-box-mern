import { Nav, Button, Badge } from 'react-bootstrap';
import { IoMailOutline, IoSendOutline, IoPencil } from 'react-icons/io5';

const Sidebar = ({ onCompose, unreadCount, currentFolder, onFolderChange }) => {
  return (
    <div className="h-100 p-3 bg-white">
      <Button 
        variant="primary" 
        className="w-100 mb-4 py-2 shadow-sm d-flex align-items-center justify-content-center border-0" 
        onClick={onCompose}
        style={{ borderRadius: '8px', fontWeight: '600' }}
      >
        <IoPencil className="me-2" />
        Compose
      </Button>
      <Nav variant="pills" className="flex-column gap-1">
        <Nav.Item>
          <Nav.Link 
            active={currentFolder === 'received'}
            onClick={() => onFolderChange('received')}
            className="d-flex align-items-center px-3 py-2"
            style={{ borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
          >
            <IoMailOutline size={20} className="me-3" />
            <span className="flex-grow-1 text-start">Inbox</span>
            {unreadCount > 0 && (
              <Badge pill bg="light" text="primary" className="ms-2">
                {unreadCount}
              </Badge>
            )}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            active={currentFolder === 'sent'}
            onClick={() => onFolderChange('sent')}
            className="d-flex align-items-center px-3 py-2"
            style={{ borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
          >
            <IoSendOutline size={20} className="me-3" />
            <span className="flex-grow-1 text-start">Sent</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
