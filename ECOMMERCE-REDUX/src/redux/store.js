import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import {thunk} from "redux-thunk"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});
