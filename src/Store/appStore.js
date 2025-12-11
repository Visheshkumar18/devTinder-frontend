import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Slice/userSlice'
import feedReducer from './Slice/feedSlice'

const appStore=configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer
    },
})
export default appStore;