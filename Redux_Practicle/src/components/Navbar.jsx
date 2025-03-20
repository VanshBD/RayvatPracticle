import React, { useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Badge, 
  IconButton, 
  Button,
  Box,
  Container,
  Stack
} from '@mui/material';
import { 
  ShoppingCart,
  Home,
  Login,
  PersonAdd,
  Logout,
  Store
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../redux/actions/authActions';

const Navbar = () => {
  const cartCount = useSelector((state) => state.cart.cartItems.length);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Store 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              mr: 1,
              color: 'primary.main' 
            }} 
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center'
            }}
            component={Link}
            to="/"
          >
            E-Commerce App
          </Typography>

          <Stack 
            direction="row" 
            spacing={1}
            alignItems="center"
          >
            <Button
              component={Link}
              to="/"
              startIcon={<Home />}
              sx={{
                color: 'text.primary',
                '&:hover': {
                  background: 'rgba(33, 150, 243, 0.1)',
                }
              }}
            >
              Home
            </Button>

            {!isAuthenticated ? (
              <>
                <Button
                  component={Link}
                  to="/login"
                  startIcon={<Login />}
                  sx={{
                    color: 'text.primary',
                    '&:hover': {
                      background: 'rgba(33, 150, 243, 0.1)',
                    }
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  startIcon={<PersonAdd />}
                  sx={{
                    color: 'text.primary',
                    '&:hover': {
                      background: 'rgba(33, 150, 243, 0.1)',
                    }
                  }}
                >
                  Register
                </Button>
              </>
            ) : (
              <Button
                onClick={handleLogout}
                startIcon={<Logout />}
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    background: 'rgba(255, 82, 82, 0.1)',
                    color: '#ff5252'
                  }
                }}
              >
                Logout
              </Button>
            )}

            <Box 
              sx={{ 
                ml: 2,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                borderRadius: '50%',
                padding: '4px'
              }}
            >
              <IconButton
                component={Link}
                to="/checkout"
                sx={{
                  color: 'white',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                  transition: 'transform 0.2s'
                }}
              >
                <Badge 
                  badgeContent={cartCount} 
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      background: 'linear-gradient(45deg, #FF5252 30%, #FF1744 90%)',
                      border: '2px solid white'
                    }
                  }}
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Box>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
  