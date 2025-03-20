const defaultState = {
  itemsInCart: []
};

const cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        itemsInCart: [...state.itemsInCart, action.payload]
      };

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        itemsInCart: state.itemsInCart.map(product =>
          product.id === action.payload.id
            ? { ...product, quantity: action.payload.quantity }
            : product
        )
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        itemsInCart: state.itemsInCart.filter(product => product.id !== action.payload)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        itemsInCart: []
      };

    default:
      return state;
  }
};

export default cartReducer;
