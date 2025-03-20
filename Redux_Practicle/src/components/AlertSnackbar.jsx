import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const AlertSnackbar = ({ open, handleClose, message, severity = 'success' }) => (
  <Snackbar 
    open={open} 
    autoHideDuration={3000} 
    onClose={handleClose}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
    sx={{ top: '10px' }}  
  >
    <Alert 
      onClose={handleClose} 
      severity={severity} 
      sx={{ width: '100%' }}
    >
      {message}
    </Alert>
  </Snackbar>
);

export default AlertSnackbar;
