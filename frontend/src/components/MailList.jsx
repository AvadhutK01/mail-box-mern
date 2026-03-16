import { useState, useEffect } from 'react';
import { Spinner, Button, Alert } from 'react-bootstrap';
import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoint';
import MailItem from './MailItem';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

const MailList = ({ folder, onSelectMail, onUpdateUnread }) => {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMails = async (p = page) => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.get(ENDPOINTS.GET_EMAILS, {
        params: { type: folder, page: p, limit: 10 },
      });
      setMails(response.data.emails);
      setTotalPages(response.data.totalPages || 1);
      setPage(response.data.page || 1);
      
      if (onUpdateUnread) {
        onUpdateUnread(response.data.unreadCount || 0);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch emails');
      setMails([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchMails(1);
  }, [folder]);

  useEffect(() => {
    // Only fetch if page changes and it's not the initial load for page 1
    // or if totalPages has been updated and we need to re-fetch for the current page
    if (page > 1 || totalPages > 1) {
      fetchMails(page);
    }
  }, [page, folder]); // Added folder to dependencies as fetchMails uses it

  const handleNext = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  if (loading && mails.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column h-100 bg-white border rounded shadow-sm overflow-hidden">
      <div className="p-2 p-md-3 border-bottom d-flex justify-content-between align-items-center bg-light">
        <h6 className="mb-0 text-capitalize fw-bold">{folder === 'received' ? 'Inbox' : 'Sent'}</h6>
        <div className="d-flex align-items-center gap-1 gap-md-2">
          <small className="text-muted small me-2 d-none d-sm-inline">Page {page} of {totalPages}</small>
          <Button 
            variant="outline-secondary" 
            size="sm" 
            disabled={page === 1} 
            onClick={handlePrev}
            className="border-0 rounded-circle p-1 d-flex align-items-center"
          >
            <IoChevronBack size={18} />
          </Button>
          <Button 
            variant="outline-secondary" 
            size="sm" 
            disabled={page === totalPages} 
            onClick={handleNext}
            className="border-0 rounded-circle p-1 d-flex align-items-center"
          >
            <IoChevronForward size={18} />
          </Button>
        </div>
      </div>

      <div className="flex-grow-1 overflow-auto custom-scrollbar">
        {error && <Alert variant="danger" className="m-3 p-2 small">{error}</Alert>}
        {!loading && mails.length === 0 && !error && (
          <div className="text-center mt-5 text-muted px-3">
            <p className="small">No messages found in {folder === 'received' ? 'Inbox' : 'Sent'}</p>
          </div>
        )}
        {mails.map((mail) => (
          <MailItem key={mail._id} mail={mail} type={folder} onSelect={() => onSelectMail(mail)} />
        ))}
      </div>
    </div>
  );
};

export default MailList;
