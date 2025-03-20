const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload?.user || null,
        token: action.payload?.token || null,
        isAuthenticated: !!action.payload?.token,
        error: null
      };
    
    case 'LOGIN_FAILURE':
      return { ...state, error: action.payload };
    case 'REGISTER_SUCCESS':
      return { ...state, user: action.payload, error: null };
    case 'REGISTER_FAILURE':
      return { ...state, error: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null, token: null };
    default:
      return state;
  }
};

export default authReducer;
