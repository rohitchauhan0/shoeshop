import toast from "react-hot-toast";

const { createSlice } = require("@reduxjs/toolkit");


const initialState ={
    cart: localStorage.getItem("Productcart") ? JSON.parse(localStorage.getItem("Productcart")) :[],
    total: localStorage.getItem("Producttotal") ? JSON.parse(localStorage.getItem("Producttotal")) :0,
    totalItems: localStorage.getItem("ProducttotalItems") ? JSON.parse(localStorage.getItem("ProducttotalItems")) :0
}


const cartSlice = createSlice({
    name:"Productcart",
    initialState:initialState,
    reducers:{
        addToCart: (state, action)=>{
            const product = action.payload
            const index = state.cart.findIndex((item)=> item._id === product._id)

            if(index>=0){
                toast.error("Item already added to cart")
                return
            }

            state.cart.push(product)
            state.totalItems++
            state.total += product.price

            localStorage.setItem("Productcart", JSON.stringify(state.cart))
            localStorage.setItem("Producttotal", JSON.stringify(state.total))
            localStorage.setItem("ProducttotalItems", JSON.stringify(state.totalItems))
            toast.success("Product added to the cart")
        },
        removeFromCart: (state, action)=>{
            const product = action.payload
            const index = state.cart.findIndex((item)=> item._id === product._id)
            if(index>=0){
                state.totalItems--
                state.total -= product.price
                state.cart.splice(index, 1)
                localStorage.setItem("Productcart", JSON.stringify(state.cart))
                localStorage.setItem("Producttotal", JSON.stringify(state.total))
                localStorage.setItem("ProducttotalItems", JSON.stringify(state.totalItems))
                toast.success("Product remove from cart")
            }
        }

    },



})

export const {addToCart, removeFromCart} = cartSlice.actions
export default cartSlice.reducer