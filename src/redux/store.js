import { configureStore } from "@reduxjs/toolkit";
import postReducer from './slices/postSlice'
import authReducer from './slices/authSlice'
import sortReducer from './slices/sortSlice'

export const store = configureStore({
    reducer: {
        posts: postReducer,
        auth: authReducer,
        sort: sortReducer
    }
})