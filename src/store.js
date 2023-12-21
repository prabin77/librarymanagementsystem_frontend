import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./pages/reducers/user.reducer";


const store = configureStore({
    reducer:{
        User:userReducer
    }
})
export default store;