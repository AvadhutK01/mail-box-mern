import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoint';

const useMailActions = () => {
  const markAsRead = async (mailId) => {
    await axiosInstance.patch(ENDPOINTS.MARK_AS_READ.replace(':id', mailId));
  };

  const deleteMail = async (mailId) => {
    await axiosInstance.delete(ENDPOINTS.DELETE_EMAIL.replace(':id', mailId));
  };

  return { markAsRead, deleteMail };
};

export default useMailActions;
