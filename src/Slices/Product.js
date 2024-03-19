import { createSlice } from "@reduxjs/toolkit";

const initialState={
        product:null,
        editProduct:false,
        paymentLoading:false,

}


const productSlice = createSlice({
    name:"product",
    initialState:initialState,
    reducers:{
        setProduct: (state, value)=>{
                state.product = value.payload
        },
        setEditProduct:(state, value)=>{
            state.editProduct = value.payload
        },
        setPaymentLoading :(state, value)=>{
            state.paymentLoading = value.payload
        }
    }
})

export const {setProduct, setEditProduct, setPaymentLoading}= productSlice.actions
export default productSlice.reducer