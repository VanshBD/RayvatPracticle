import axios from 'axios';

export const login = (email, password, navigate, showAlert) => async (dispatch) => {
  try {
    const { data: users } = await axios.get('http://localhost:5000/users');
    const user = users.find(user => user.email === email);

    if (!user) {
      showAlert('User not found.', 'error');
      dispatch({ type: 'LOGIN_FAILURE', payload: 'User not found.' });
      return;
    }

    if (user.password !== password) {
      showAlert('Invalid email or password.', 'error');
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials.' });
      return;
    }

    const token = 'dummy-jwt-token'; 

    const expirationTime = new Date().getTime() + 60 * 60 * 1000;
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiry', expirationTime);

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { ...user, token }
    });

    showAlert('Login successful!', 'success');
    navigate('/');
  } catch (error) {
    showAlert('Login failed. Please try again.', 'error');
    dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
  }
};


export const register = (username, password, email, navigate, showAlert) => async (dispatch) => {
  if (!username || !email || !password) {
    showAlert('All fields are required.', 'error');
    return;
  }

  try {
    const response = await axios.post('http://localhost:5000/users', {
      username,
      password,
      email
    });

    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
    showAlert('Registration successful! Please log in.', 'success');
    navigate('/login');
  } catch (error) {
    showAlert('Registration failed. Please try again.', 'error');
    dispatch({ type: 'REGISTER_FAILURE', payload: error.message });
  }
};


export const checkAuth = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    dispatch({ type: 'LOGIN_SUCCESS', payload: null }); 
  }
};