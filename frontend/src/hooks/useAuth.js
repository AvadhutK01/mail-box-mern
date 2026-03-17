import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoint';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async ({ email, password }) => {
    setError('');
    setLoading(true);
    try {
      const response = await axiosInstance.post(ENDPOINTS.LOGIN, { email, password });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        return true;
      }
      return false;
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({ email, password, confirmPassword }) => {
    setError('');
    setLoading(true);
    try {
      const response = await axiosInstance.post(ENDPOINTS.SIGNUP, {
        email,
        password,
        confirmPassword,
      });
      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        return true;
      }
      return false;
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, signup, loading, error };
};

export default useAuth;
