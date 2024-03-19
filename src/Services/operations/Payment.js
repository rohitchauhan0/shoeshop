import toast from "react-hot-toast";
import { apiConnnector } from "../ApiConnector";
import { productEndpPoint } from "../AllAPI";
import logo from "../../Assets/FrontPage/shoesjoplogo.png"
import { setPaymentLoading } from "../../Slices/Product";


const {CAPTURE_PAYMENT_API,VERIFY_PAYMENT_API } = productEndpPoint

const loadScript = (src)=>{
        return new Promise((resolve)=>{
            const script = document.createElement('script')
            script.src = src
            script.onload = ()=>{
                resolve(true)
            }
            script.onerror = ()=>{
                resolve(false)
            }
            document.body.appendChild(script)
        })
}


export async function buyProduct(token, productId, navigate, dispatch, userDetails){
    console.log(productId)
    console.log(typeof(productId))
    const toastId = toast.loading("Loading.....")
    try {
        const res = await loadScript(`https://checkout.razorpay.com/v1/checkout.js`)
        if(!res){
            toast.error("Razorpay SDk failed to load")
            return
        }

        const orderResponse = await apiConnnector("POST", CAPTURE_PAYMENT_API, {productId}, {
            Authorization : `Bearer ${token}`
        })
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message)
        }
        const options = {
            key : process.env.RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id : orderResponse.data.message.id,
            name: "ShoeShop",
            description : "Thank you for purchasing the course",
            image:logo,
            prefill:{
                    name:`${userDetails.firstName}`,
                    email:`${userDetails.email}`
            },
            handler : function(response){
                verifyPayment({...response, productId}, token, navigate, dispatch)
            }
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
        paymentObject.on("Payment Failed", function(response){
            toast.error("Oops, Payment failed")
        })


        
    } catch (error) {
        console.log("PAYMENT API ERROR.....", error)
        toast.error("Could not make payment")
    }
    toast.dismiss(toastId)
}


async function verifyPayment(bodydata, token, navigate, dispatch){
    console.log(bodydata)
    console.log(token)
    const toastId = toast.loading("Verify Payment.....")
    dispatch(setPaymentLoading(true))
    try {
        const response = await apiConnnector("POST", VERIFY_PAYMENT_API, bodydata, {
            Authorization : `Bearer ${token}`
        })
        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/purchasedItem")
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}