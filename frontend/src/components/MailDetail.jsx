import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { IoArrowBackOutline, IoPersonCircleOutline, IoTrashOutline } from 'react-icons/io5';

const MailDetail = ({ mail, onBack, onDelete }) => {
  const [deleting, setDeleting] = useState(false);
  const { sender, receivers, subject, body, createdAt } = mail;
  const date = new Date(createdAt).toLocaleString([], { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this email?')) return;
    setDeleting(true);
    await onDelete(mail._id);
    setDeleting(false);
  };

  return (
    <div className="d-flex flex-column h-100 bg-white border-0 border-md-1 rounded-0 rounded-md shadow-sm overflow-hidden">
      <div className="p-2 p-md-3 border-bottom d-flex align-items-center bg-white sticky-top">
        <Button 
          variant="light" 
          size="sm" 
          onClick={onBack}
          className="border-0 rounded-pill px-3 d-flex align-items-center fw-medium"
        >
          <IoArrowBackOutline size={18} className="me-2" />
          Back
        </Button>

        {onDelete && (
          <div className="ms-auto">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleDelete}
              disabled={deleting}
              className="border-0 rounded-pill px-3 d-flex align-items-center"
              title="Delete email"
            >
              <IoTrashOutline size={18} className="me-1" />
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        )}
      </div>

      <div className="flex-grow-1 overflow-auto p-3 p-md-4 custom-scrollbar bg-white">
        <h5 className="mb-4 fw-bold text-dark" style={{ lineHeight: '1.4' }}>{subject}</h5>
        
        <div className="d-flex align-items-start mb-4">
          <div className="bg-light rounded-circle p-2 me-3 d-none d-sm-block">
            <IoPersonCircleOutline size={32} className="text-secondary" />
          </div>
          <div className="flex-grow-1 overflow-hidden">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-1 mb-1">
              <span className="fw-bold text-dark text-truncate d-block" style={{ maxWidth: '100%' }}>{sender}</span>
              <small className="text-muted smaller">{date}</small>
            </div>
            <div className="text-muted small text-truncate">
              to {receivers.join(', ')}
            </div>
          </div>
        </div>

        <div 
          className="mail-body pt-4 border-top"
          dangerouslySetInnerHTML={{ __html: body }}
          style={{ lineHeight: '1.7', color: '#3c4043', fontSize: '0.95rem' }}
        ></div>
      </div>
    </div>
  );
};

export default MailDetail;
