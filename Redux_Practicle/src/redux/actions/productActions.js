import axios from 'axios';

export const fetchProducts = (limit = 10, skip = 0) => async (dispatch) => {
  try {
    const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data.products });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
  }
};
