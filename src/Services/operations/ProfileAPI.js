import toast from "react-hot-toast"
import { apiConnnector } from "../ApiConnector"
import { settingsEndPoint } from "../AllAPI"
const {
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API
} = settingsEndPoint

export function editProfile (token, data){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading....")
        try {
            const response = await apiConnnector("PUT", UPDATE_PROFILE_API, data, {
                Authorization : `Bearer ${token}`
            } )
            if (!response.data.success) {
                throw new Error(response.data.message)
              }

              toast.success("Profile updated successfully")
        } catch (error) {
            console.log("UPDATE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Update Profile")
        }
        toast.dismiss(toastId)
    }
}


export function updatePassword (token, data){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading....")
        try {
            const response = await apiConnnector("POST", CHANGE_PASSWORD_API, data, {
                "Authorization":`Bearer ${token}`
            })
            if (!response.data.success) {
                throw new Error(response.data.message)
              }

              toast.success("Password updated successfully")
              
            
        } catch (error) {
            console.log("CHANGE_PASSWORD_API API ERROR............", error)
            toast.error("Could Not Change Password Profile")
        }
        toast.dismiss(toastId)

    }
}

