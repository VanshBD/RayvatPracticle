import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import Navbar from './components/Navbar';
import AlertSnackbar from './components/AlertSnackbar';
import RegisterPage from './pages/RegisterPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AuthHandler from './components/AuthHandler';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

function App() {
  const [alert, setAlert] = React.useState({ open: false, message: '', severity: 'success' });

  const showAlert = (message, severity = 'success') => {
    setAlert({ open: true, message, severity });
  };

  return (
<>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AuthHandler showAlert={showAlert} />  
          <Navbar />
          <Container sx={{ mt: 4 }}>
            <Routes>
              <Route path="/" element={<HomePage showAlert={showAlert} />} />
              <Route path="/login" element={<LoginPage showAlert={showAlert} />} />
              <Route path="/register" element={<RegisterPage showAlert={showAlert} />} />
              <Route path="/checkout" element={<CheckoutPage showAlert={showAlert} />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
            </Routes>
          </Container>
        </Router>
        <AlertSnackbar
          open={alert.open}
          message={alert.message}
          severity={alert.severity}
          handleClose={() => setAlert({ ...alert, open: false })}
        />
      </ThemeProvider>
  </>
  );
}

export default App;
