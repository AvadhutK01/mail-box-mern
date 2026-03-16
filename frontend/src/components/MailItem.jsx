import { Badge } from 'react-bootstrap';
import { IoMailOutline, IoMailOpenOutline } from 'react-icons/io5';

const MailItem = ({ mail, type, onSelect }) => {
  const { sender, receivers, subject, createdAt, isRead } = mail;
  const date = new Date(createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' });

  return (
    <div
      className={`d-flex align-items-center p-2 p-md-3 border-bottom ${!isRead ? 'bg-white fw-bold shadow-sm' : 'bg-light text-muted opacity-75'}`}
      style={{ cursor: 'pointer' }}
      onClick={onSelect}
    >
      <div className="me-2 me-md-3 text-secondary d-none d-sm-block">
        {isRead ? <IoMailOpenOutline size={18} /> : <IoMailOutline size={18} className="text-primary" />}
      </div>
      <div className="flex-grow-1 overflow-hidden">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="text-dark text-truncate small fw-bold" style={{ maxWidth: '150px' }}>{sender}</span>
          <small className="text-muted smaller" style={{ fontSize: '0.75rem' }}>{date}</small>
        </div>
        <div className="text-truncate small" style={{ color: '#5f6368' }}>
          {subject}
        </div>
      </div>
    </div>
  );
};

export default MailItem;
