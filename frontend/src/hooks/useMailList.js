import { useState, useEffect, useRef } from 'react';
import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoint';

const useMailList = (folder, refreshKey, onUpdateUnread) => {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageRef = useRef(page);
  useEffect(() => { pageRef.current = page; }, [page]);

  const fetchMails = async (p) => {
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
  }, [folder, refreshKey]);

  useEffect(() => {
    if (page > 1 || totalPages > 1) {
      fetchMails(page);
    }
  }, [page, folder]);

  useEffect(() => {
    const toFingerprint = (list) =>
      list.map(m => `${m._id}:${m.isRead}`).join(',');

    const poll = setInterval(async () => {
      try {
        const response = await axiosInstance.get(ENDPOINTS.GET_EMAILS, {
          params: { type: folder, page: pageRef.current, limit: 10 },
        });
        const fetched = response.data.emails || [];
        const fetchedUnread = response.data.unreadCount ?? 0;
        const fetchedTotalPages = response.data.totalPages || 1;

        setMails(prev => {
          if (toFingerprint(fetched) !== toFingerprint(prev)) {
            setTotalPages(fetchedTotalPages);
            return fetched;
          }
          return prev;
        });

        if (onUpdateUnread) {
          onUpdateUnread(fetchedUnread);
        }
      } catch {
      }
    }, 2000);

    return () => clearInterval(poll);
  }, [folder, onUpdateUnread]);

  const handleNext = () => {
    if (page < totalPages) setPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  return { mails, loading, error, page, totalPages, handleNext, handlePrev };
};

export default useMailList;
