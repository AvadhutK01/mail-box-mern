import { Badge } from 'react-bootstrap';
import { IoMailOutline, IoMailOpenOutline } from 'react-icons/io5';

const MailItem = ({ mail, type }) => {
  const { sender, receivers, subject, createdAt, isRead } = mail;
  const date = new Date(createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' });

  return (
    <div 
      className={`d-flex align-items-center p-3 border-bottom mail-item-hover ${!isRead && type === 'received' ? 'bg-light font-weight-bold' : ''}`}
      style={{ cursor: 'pointer', transition: 'background 0.2s' }}
    >
      <div className="me-3 text-secondary">
        {isRead ? <IoMailOpenOutline size={20} /> : <IoMailOutline size={20} className="text-primary" />}
      </div>
      <div className="flex-grow-1 overflow-hidden">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="text-truncate fw-bold" style={{ maxWidth: '200px' }}>
            {type === 'sent' ? `To: ${receivers.join(', ')}` : sender}
          </span>
          <small className="text-muted">{date}</small>
        </div>
        <div className="text-truncate text-secondary" style={{ fontSize: '0.9rem' }}>
          <span className="text-dark fw-medium me-2">{subject}</span>
          {/* We'll strip HTML tags if we want to show a preview snippet */}
          - {mail.body.replace(/<[^>]*>?/gm, '').substring(0, 50)}...
        </div>
      </div>
    </div>
  );
};

export default MailItem;
