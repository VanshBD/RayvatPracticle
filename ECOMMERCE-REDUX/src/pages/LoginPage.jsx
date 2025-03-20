import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper, Snackbar, Alert } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const showAlert = (message, severity) => {
      setAlert({ open: true, message, severity });
    };

    dispatch(login(email, password, navigate, showAlert));  
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, mt: 8, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Login
            </Button>
          </Box>
        </form>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Register here
            </Link>
          </Typography>
        </Box>

        {/* Snackbar Alert */}
        <Snackbar
          open={alert.open}
          autoHideDuration={4000}
          onClose={() => setAlert({ ...alert, open: false })}
        >
          <Alert
            onClose={() => setAlert({ ...alert, open: false })}
            severity={alert.severity}
            sx={{ width: '100%' }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default LoginPage;
