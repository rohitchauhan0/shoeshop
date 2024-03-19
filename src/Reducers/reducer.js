import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Slices/AuthSlice";
import profileReducer from "../Slices/Profile";
import productReducer from "../Slices/Product";
import CartSlice from "../Slices/CartSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer, 
    product: productReducer,
    // cart : cartReducer,
    Productcart: CartSlice,
})

export default rootReducer