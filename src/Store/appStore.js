import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Slice/userSlice'
import feedReducer from './Slice/feedSlice'
import connectionReducer from './Slice/connectionSlice'

const appStore=configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connection:connectionReducer
    },
})
export default appStore;