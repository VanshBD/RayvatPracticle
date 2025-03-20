import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthHandler = ({ showAlert }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');

    if (token && tokenExpiry && new Date().getTime() > Number(tokenExpiry)) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
      showAlert('Session expired. Please log in again.', 'warning');
      navigate('/login');
    }
  }, [navigate, showAlert]);  

  return null; 
};

export default AuthHandler;