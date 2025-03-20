import React, { useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  IconButton,
  Box,
  Paper
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Add, Remove, ShoppingCart } from '@mui/icons-material';

const CheckoutPage = ({ showAlert }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
  );

  const handleQuantityChange = (itemId, change) => {
    const newQuantities = { ...quantities, [itemId]: Math.max(1, (quantities[itemId] || 1) + change) };
    setQuantities(newQuantities);
  };

  const totalAmount = cartItems.reduce((acc, item) => 
    acc + item.price * (quantities[item.id] || 1), 0
  );

  const handleCheckout = () => {
    if (!paymentMethod) {
      showAlert('Please select a payment method.', 'error');
      return;
    }

    showAlert(`Order Placed Successfully via ${paymentMethod === 'cash' ? 'Cash on Delivery' : 'Debit Card'}!`, 'success');
    dispatch({ type: 'CLEAR_CART' });
    setOpenDialog(false);
    navigate('/');
  };

  return (
    <Container sx={{ py: 4, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Checkout
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Review your cart items and proceed to payment
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <List>
          {cartItems.map((item) => (
            <div key={item.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={item.thumbnail} alt={item.title} />
                </ListItemAvatar>
                <ListItemText 
                  primary={item.title} 
                  secondary={`Price: $${item.price} | Quantity: ${quantities[item.id] || 1}`} 
                />
                <IconButton onClick={() => handleQuantityChange(item.id, -1)}>
                  <Remove />
                </IconButton>
                <Typography>{quantities[item.id] || 1}</Typography>
                <IconButton onClick={() => handleQuantityChange(item.id, 1)}>
                  <Add />
                </IconButton>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>

        <Typography variant="h6" sx={{ mt: 2, textAlign: 'right' }}>
          Total: ${totalAmount.toFixed(2)}
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ShoppingCart />}
          onClick={() => dispatch({ type: 'CLEAR_CART' })} 
        >
          Clear Cart
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
        >
          Proceed to Payment
        </Button>
      </Box>

      {/* Payment Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Select Payment Method</DialogTitle>
        <DialogContent>
          <RadioGroup 
            value={paymentMethod} 
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel value="cash" control={<Radio />} label="Cash on Delivery" />
            <FormControlLabel value="card" control={<Radio />} label="Debit Card" />
          </RadioGroup>

          {paymentMethod === 'card' && (
            <TextField
              label="Card Number"
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              placeholder="XXXX-XXXX-XXXX-XXXX"
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCheckout} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CheckoutPage;