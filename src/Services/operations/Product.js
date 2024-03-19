import toast from "react-hot-toast"
import { apiConnnector } from "../ApiConnector";
import { productEndpPoint } from "../AllAPI";

const {CREATE_PRODUCT_API, GET_ALL_CATEGORY_API,GET_SELLLER_PRODUCT, DELETE_PRODUCT} = productEndpPoint

export const createProduct = async(formData, token)=>{
        let result = []
        const toastId = toast.loading("Loading...")
        try {
          const response = await apiConnnector("POST", CREATE_PRODUCT_API, formData, {
            // 'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          });
          console.log("CREATE_PRODUCT_API RESPONSE............", response)
          if (!response?.data?.success) {
            throw new Error("Could Not Add Product Details")
          }
          toast.success("Product Details Added Successfully")
          result = response?.data?.data
        } catch (error) {
          console.log("CREATE_PRODUCT_API ERROR............", error)
          toast.error(error.message)
        }
        toast.dismiss(toastId)
        return result
    
}


export function getAllCategory (){
    return async(dispatch)=>{
        let result = []
         try {
            const response = await apiConnnector("GET", GET_ALL_CATEGORY_API)
            console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
            if (!response?.data?.success) {
            throw new Error("Could Not Fetch Product Categories")
            }
             result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_CATEGORY_API API ERROR............", error)
    toast.error(error.message)
  }
  return result
    }
}


export const getSellerItems = async(token)=> {
  let result = []
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnnector("GET", GET_SELLLER_PRODUCT,null, {
      Authorization: `Bearer ${token}`
    })
    if(!response?.data.data){
        throw new Error("Could not fetch seller product")
    }
    result = response?.data?.data
    
  } catch (error) {
      console.log("GET_SELLLER_PRODUCT API ERROR...........", error)
      toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
  
}

