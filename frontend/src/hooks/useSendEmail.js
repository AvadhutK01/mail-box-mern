import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoint';

const useSendEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendEmail = async ({ receivers, subject, body }) => {
    setError('');
    setLoading(true);
    try {
      const response = await axiosInstance.post(ENDPOINTS.SEND_EMAIL, {
        receivers,
        subject,
        body,
      });
      return response.status === 201;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send email. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { sendEmail, loading, error };
};

export default useSendEmail;
