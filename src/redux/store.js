import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slice/counterSlice'
import accountSlice from './slice/accountSlice'
import cartSlice from './slice/cartSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        account: accountSlice,
        cart: cartSlice
    },
})