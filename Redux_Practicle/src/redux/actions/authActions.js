import axios from 'axios';

export const login = (email, password, navigate, showAlert) => 
  async (dispatch) => {
    try {
      const { data: users } = await axios.get('http://localhost:5000/users')
      const user = users.find(
        user => user.email === email
      )

      if (!user) {
        showAlert('Authentication error: Email not registered', 'error')
        dispatch({ 
          type: 'LOGIN_FAILURE', 
          payload: 'Authentication error: Email not registered' 
        })
        return
      }

      if (user.password !== password) {
        showAlert('Access denied: Please check your credentials', 'error')
        dispatch({ 
          type: 'LOGIN_FAILURE', 
          payload: 'Access denied: Invalid credentials' 
        })
        return
      }

      const token = 'dummy-jwt-token'
      const expirationTime = new Date().getTime() + 60 * 60 * 1000
      
      localStorage.setItem('token', token)
      localStorage.setItem('tokenExpiry', expirationTime)

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { ...user, token }
      })

      showAlert('Welcome back! Authentication successful', 'success')
      navigate('/')
    } catch (error) {
      showAlert('System error: Unable to process login request', 'error')
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error.message 
      })
    }
  }


export const register = (username, password, email, navigate, showAlert) => async (dispatch) => {
  // Validate that all required fields are provided
  if (!username || !email || !password) {
    showAlert('Registration Error: Missing required information', 'error');
    return;
  }

  try {
    // Attempt to create new user account
    const response = await axios.post('http://localhost:5000/users', {
      username,
      password,
      email
    });

    // Dispatch success action with user data
    dispatch({ 
      type: 'REGISTER_SUCCESS', 
      payload: response.data 
    });

    // Notify user of successful account creation
    showAlert('Account created successfully! Please proceed to login', 'success');
    navigate('/login');
  } catch (error) {
    // Handle registration failure
    showAlert('Account creation failed: Please verify your information', 'error');
    dispatch({ 
      type: 'REGISTER_FAILURE', 
      payload: error.message 
    });
  }
};


export const checkAuth = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    dispatch({ type: 'LOGIN_SUCCESS', payload: null }); 
  }
};