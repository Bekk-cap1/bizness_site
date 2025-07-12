import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import appReducer from '../features/app/appSlice'
import cartReducer from '../features/cart/cartSlice'


export const store = configureStore({
    reducer:{
        auth: authReducer,
        app: appReducer,
        cart: cartReducer
    }
})