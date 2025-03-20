const defaultProductState = {
  productList: [],
  fetchError: null
};

const productReducer = (state = defaultProductState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_SUCCESS':
      return { 
        ...state, 
        productList: action.payload, 
        fetchError: null 
      };
    case 'FETCH_PRODUCTS_FAILURE':
      return { 
        ...state, 
        fetchError: action.payload 
      };
    default:
      return state;
  }
};

export default productReducer;
