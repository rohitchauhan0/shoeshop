import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../../../Slices/CartSlice";

const Cart = () => {
  const { cart, total } = useSelector((state) => state.Productcart);
  const dispatch = useDispatch()
  console.log(cart);
  return (
    <div className=" flex justify-between">
      {
        cart.length > 0 ? (
            <div className=" flex  flex-wrap justify-between gap-20 w-[60%]">
        {
            cart.map((cart)=>{
                return <div className=" w-[250px] flex flex-col justify-between gap-1 border border-cyan-500 rounded-xl p-1 py-2 items-center hover:scale-110 transition-all duration-200">
          <Link to={`/shop/category/${cart.category}/${cart._id}`}>
            <img
              src={cart?.imageUrl}
              alt=""
              className="max-h-[220px] w-[200px]  object-cover rounded-lg"
            />
          </Link>
          <p className=" font-bold">{cart?.title}</p>
          <p>{cart?.description}</p>
          <p className=" flex gap-2 text-yellow-400">
            ₹{" "}
            <span className=" text-gray-400 line-through">
              {" "}
              {cart?.price * 2}
            </span>{" "}
            {cart?.price}
          </p>
          <div className=" flex flex-col gap-6 w-fit">
                <Link to={`/shop/category/${cart.category}/${cart._id}`}>
                <button className=" px-4 p-2 bg-yellow-500 rounded-lg text-black" >Buy now</button>
                </Link>
                {
                <button className=" px-4 p-2 bg-gray-600 rounded-lg text-white"
                onClick={()=>{
                    dispatch(removeFromCart(cart))
                }}
                >Remove from cart</button>
                }
            </div>
        </div>
            })
        }
      </div>

        ): (<div>No item in cart</div>)
      }
    </div>
  );
};

export default Cart;
