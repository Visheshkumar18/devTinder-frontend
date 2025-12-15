import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Slice/userSlice'
import feedReducer from './Slice/feedSlice'
import connectionReducer from './Slice/connectionSlice'
import requestReducer from './Slice/requestSlice'

const appStore=configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connection:connectionReducer,
        request:requestReducer,
    },
})
export default appStore;