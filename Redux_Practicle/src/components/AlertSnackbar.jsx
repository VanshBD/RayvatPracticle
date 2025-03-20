import React from 'react';
import { Snackbar, Alert as MuiAlert, Box, Typography, IconButton } from '@mui/material';
import {
  CheckCircle,
  Error,
  Info,
  Warning,
  Close
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Custom styled Alert component
const StyledAlert = styled(MuiAlert)(({ theme, severity }) => ({
  borderRadius: '12px',
  backdropFilter: 'blur(10px)',
  border: '1px solid',
  display: 'flex',
  alignItems: 'center',
  padding: '10px 16px',
  '& .MuiAlert-icon': {
    fontSize: '24px',
    padding: theme.spacing(0.5),
    borderRadius: '50%',
    marginRight: theme.spacing(2)
  },
  ...(severity === 'success' && {
    background: 'rgba(46, 200, 94, 0.1)',
    borderColor: '#2ec85e',
    '& .MuiAlert-icon': {
      color: '#2ec85e',
      background: 'rgba(46, 200, 94, 0.1)'
    }
  }),
  ...(severity === 'error' && {
    background: 'rgba(255, 82, 82, 0.1)',
    borderColor: '#ff5252',
    '& .MuiAlert-icon': {
      color: '#ff5252',
      background: 'rgba(255, 82, 82, 0.1)'
    }
  }),
  ...(severity === 'warning' && {
    background: 'rgba(255, 152, 0, 0.1)',
    borderColor: '#ff9800',
    '& .MuiAlert-icon': {
      color: '#ff9800',
      background: 'rgba(255, 152, 0, 0.1)'
    }
  }),
  ...(severity === 'info' && {
    background: 'rgba(33, 150, 243, 0.1)',
    borderColor: '#2196f3',
    '& .MuiAlert-icon': {
      color: '#2196f3',
      background: 'rgba(33, 150, 243, 0.1)'
    }
  })
}));

const AlertSnackbar = ({ open, handleClose, message, severity = 'success' }) => {
  const getIcon = (severity) => {
    switch (severity) {
      case 'success':
        return <CheckCircle fontSize="inherit" />;
      case 'error':
        return <Error fontSize="inherit" />;
      case 'warning':
        return <Warning fontSize="inherit" />;
      case 'info':
        return <Info fontSize="inherit" />;
      default:
        return <Info fontSize="inherit" />;
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        mt: 2,
        mr: 2
      }}
    >
      <StyledAlert
        severity={severity}
        icon={getIcon(severity)}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      >
        <Box sx={{ mr: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: severity === 'success' ? '#2ec85e' :
                     severity === 'error' ? '#ff5252' :
                     severity === 'warning' ? '#ff9800' : '#2196f3'
            }}
          >
            {severity.charAt(0).toUpperCase() + severity.slice(1)}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mt: 0.5
            }}
          >
            {message}
          </Typography>
        </Box>
      </StyledAlert>
    </Snackbar>
  );
};

export default AlertSnackbar;
