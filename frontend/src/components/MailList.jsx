import { useState, useEffect } from 'react';
import { Spinner, Button, Alert } from 'react-bootstrap';
import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoint';
import MailItem from './MailItem';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

const MailList = ({ folder }) => {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMails = async (p = 1) => {
    setLoading(true);
    setMails([]);
    setError('');
    try {
      const response = await axiosInstance.get(ENDPOINTS.GET_EMAILS, {
        params: { type: folder, page: p, limit: 12 },
      });
      setMails(response.data.emails);
      setTotalPages(response.data.pages);
      setPage(response.data.page);
    } catch (err) {
      setError('Failed to load emails. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchMails(1);
  }, [folder]);

  const handleNext = () => {
    if (page < totalPages) {
      fetchMails(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      fetchMails(page - 1);
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
    <div className="d-flex flex-column h-100 bg-white shadow-sm border rounded overflow-hidden">
      <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light">
        <h5 className="mb-0 text-capitalize">{folder === 'received' ? 'Inbox' : 'Sent'}</h5>
        <div className="d-flex align-items-center gap-2">
          <small className="text-muted">Page {page} of {totalPages}</small>
          <Button 
            variant="outline-secondary" 
            size="sm" 
            disabled={page === 1} 
            onClick={handlePrev}
            className="border-0 rounded-circle p-1 d-flex align-items-center"
          >
            <IoChevronBack size={20} />
          </Button>
          <Button 
            variant="outline-secondary" 
            size="sm" 
            disabled={page === totalPages} 
            onClick={handleNext}
            className="border-0 rounded-circle p-1 d-flex align-items-center"
          >
            <IoChevronForward size={20} />
          </Button>
        </div>
      </div>

      <div className="flex-grow-1 overflow-auto custom-scrollbar">
        {error && <Alert variant="danger" className="m-3">{error}</Alert>}
        {!loading && mails.length === 0 && !error && (
          <div className="text-center mt-5 text-muted">
            <p>No messages found in {folder === 'received' ? 'Inbox' : 'Sent'}</p>
          </div>
        )}
        {mails.map((mail) => (
          <MailItem key={mail._id} mail={mail} type={folder} />
        ))}
      </div>
    </div>
  );
};

export default MailList;
