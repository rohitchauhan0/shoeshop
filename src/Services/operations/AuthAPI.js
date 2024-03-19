import toast from "react-hot-toast";
import { setLoading, setToken } from "../../Slices/AuthSlice";
import { apiConnnector } from "../ApiConnector";
import { authEndPoint } from "../AllAPI";
import { setUser } from "../../Slices/Profile";

const { SEND_OTP, SIGNUP_API, LOGIN_API,RESET_PASSWORD_TOKEN_API,RESET_PASSWORD_API } = authEndPoint;

export function sendotp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading....");
    dispatch(setLoading(true));
    try {
      const response = await apiConnnector("POST", SEND_OTP, {
        email,
        checkUserPresent: true,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("OTP send successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signup(
  firstName,
  lastName,
  email,
  password,
  confirmPassowrd,
  accountType,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading....");
    dispatch(setLoading(true));
    try {
      const response = await apiConnnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassowrd,
        accountType,
        otp,
      });
      console.log(response);
      if (!response.data.message) {
        throw new Error(response.data.message);
      }
      toast.success("Sign up successfully");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));
    try {
      const response = await apiConnnector("POST", LOGIN_API, {
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login successfully");
      dispatch(setToken(response.data.token));
      dispatch(setUser({ ...response.data.user }))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}


export function logout(navigate){
  return async(dispatch)=>{
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    toast.success("Logout successfully")
    navigate("/")

  }
}

export function resestPasswordToken (email, setsentMail){
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnnector("POST", RESET_PASSWORD_TOKEN_API, {
        email
      })
      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Sent")
    setsentMail(true)
    } catch (error) {
      console.log("RESETPASSTOKEN ERROR............", error)
      toast.error("Failed To Send Reset Email")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function resetPassword (password, confirmPassowrd, token, navigate){
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
      try {
        const response = await apiConnnector("POST", RESET_PASSWORD_API, {
          password, confirmPassowrd, token
        })
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Password Reset Successfully")
      navigate("/login")

        
      } catch (error) {
        console.log("RESETPASSWORD ERROR............", error)
        toast.error("Failed To Reset Password")
      }
      toast.dismiss(toastId)
      dispatch(setLoading(false))
  }
}