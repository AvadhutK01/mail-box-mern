import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoint';

const usePreviousRecipients = () => {
  const [previousRecipients, setPreviousRecipients] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axiosInstance.get(ENDPOINTS.GET_PREVIOUS_RECIPIENTS);
        setPreviousRecipients(response.data);
      } catch (err) {
        console.error('Failed to fetch recipients', err);
      }
    };
    fetch();
  }, []);

  return { previousRecipients };
};

export default usePreviousRecipients;
