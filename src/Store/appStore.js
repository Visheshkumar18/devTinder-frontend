import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Slice/userSlice'

const appStore=configureStore({
    reducer:{
        user:userReducer
    },
})
export default appStore;