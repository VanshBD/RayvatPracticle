import { useNavigate } from "react-router-dom";

export const addToCart = (product, onShowAlert) => (dispatch, getState) => {
  const token = localStorage.getItem('token'); 

  if (!token) {
    onShowAlert('Please login to add items to your cart', 'warning');
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  const { cart: { cartItems } } = getState();

  const existingProduct = cartItems.find((item) => item.id === product.id);

  if (existingProduct) {
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { id: product.id, quantity: existingProduct.quantity + 1 }
    });
  } else {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity: 1 }
    });
  }
};

export const decreaseQuantity = (productId) => (dispatch, getState) => {
  const { cart: { cartItems } } = getState();

  const product = cartItems.find((item) => item.id === productId);

  if (product && product.quantity > 1) {
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { id: productId, quantity: product.quantity - 1 }
    });
  } else {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: productId
    });
  }
};

export const clearCart = () => ({
  type: 'CLEAR_CART'
});
