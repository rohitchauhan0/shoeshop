import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productEndpPoint } from "../../../Services/AllAPI";
import { apiConnnector } from "../../../Services/ApiConnector";
import { useDispatch, useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../../Utils/Constants";
import { addToCart } from "../../../Slices/CartSlice";
import toast from "react-hot-toast";
import PaymentModal from "../Pyament/PaymentModal";

const ProductDetails = () => {
  const { GET_PRODUCT_DETAIL } = productEndpPoint;
  const [loading, setloading] = useState(false);
  const { productId } = useParams();
  const [products, setproduct] = useState("");
  const [confirmationModal, setconfirmationModal] = useState(null)
  const {user}= useSelector((state)=> state.profile)
    const {token} = useSelector((state)=> state.auth)
    const {cart}= useSelector((state)=> state.Productcart)
    const navigate = useNavigate()
    const dispatch = useDispatch()

  useEffect(() => {
    setloading(true);
    const getProductDetails = async () => {
      try {
        const response = await apiConnnector("POST", GET_PRODUCT_DETAIL, {
          productId,
        });
        if (response) {
          setproduct(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    setloading(false);
    getProductDetails();
  }, []);

  const addToCartHandler= (productId)=>{
        if(token && user.accountType === ACCOUNT_TYPE.CUSTOMER){
            dispatch(addToCart(productId))
            return;
        }
  }
  const handleBuyCourse = ()=>{
    if(user && user.accountType === ACCOUNT_TYPE.SELLER){
      toast.error("You are a seller, you cant buy product")
    }
    if(token){
      setconfirmationModal({btnHandler :()=> setconfirmationModal(null)})
    }



  }

  return (
    <div className="h-[calc(100vh-4.999rem)] text-white px-10 py-10">
      <div className=" flex justify-between">
        <div className=" w-[70%]">
          <img
            src={products?.imageUrl}
            alt="Product image"
            className=" w-[500px]"
          />
        </div>
        <div className=" w-[50%] flex flex-col gap-10 justify-between">
            <div className=" flex flex-col gap-3">
                <p className=" text-4xl">{products?.title}</p>
                <p>{products?.description}</p>
                <p className=" flex gap-2 text-yellow-400">₹ <span className=" text-gray-400 line-through"> {products?.price *2  }</span>  {products?.price} <span className=" text-green-400">50% off</span></p>
            </div>
            <div className=" flex flex-col gap-6 w-fit">
                <button className=" px-7 p-3 bg-yellow-500 rounded-lg text-black" onClick={handleBuyCourse}>Buy now</button>
                {
                <button className=" px-7 p-3 bg-gray-600 rounded-lg text-white"
                onClick={()=>{
                    token === null ? (navigate("/login")) : (addToCartHandler(products))
                }}
                >Add to cart</button>
                }
            </div>
            <div >
            <h1 className=" text-gray-400 mb-2 text-xl">Easy Payment Options</h1>
                <li>Cash on Delivery</li>
                <li>Net banking & Credit/ Debit/ ATM card</li>
            </div>
            <div>
                <h1 className=" text-gray-400 mb-2 text-xl ">Seller</h1>
                <p className=" uppercase text-yellow-300">{products?.seller?.firstName} {products?.seller?.lastName}</p>
            </div>
        </div>
      </div>
      {confirmationModal && <PaymentModal btnHandler={confirmationModal} />}
    </div>
  );
};

export default ProductDetails;
