import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resestPasswordToken } from "../Services/operations/AuthAPI";

const ForgotPassword = () => {
    const {loading}=useSelector((state)=> state.auth)
    const [sentMail, setsentMail] = useState(false)
    const [email, setemail] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(resestPasswordToken(email, setsentMail))
    }

  return (
    <div className=" text-white h-screen w-full flex items-center justify-center">
      <div className=" w-[40%] border border-cyan-400 rounded-lg colorBg2 items-center">
        {
            loading ? (<div className=" text-white text-3xl w-full flex items-center p-3">Loading.....</div>): (<div className=" flex flex-col gap-5  bgBlur items-center p-4">
                <h1 className=" font-bold text-3xl text-cyan-800">
                    {
                        !sentMail ? "Reset your password": "Check your email"
                    }
                </h1>
                <p className=" text-lg ">
                    {
                        !sentMail ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent reset mail to ${email}`
                    }
                </p>
                <form onSubmit={handleSubmit} className=" flex flex-col gap-7 p-2 items-center">
                    {
                        !sentMail && (<div className=" flex flex-col gap-2">
                            <label>Email Address </label>
                            <input type="text" name="email" id="email" value={email} onChange={(e)=> setemail(e.target.value)} placeholder="Please enter your email"
                  className=" text-white w-[300px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"
                             />
                        </div>)
                    }

                        <button
              className="p-3 border border-white rounded-2xl btnColor font-bold px-5 flex gap-5 items-center w-fit"
                        >
                                {
                                    !sentMail ? "Reset password" :"Resend email"
                                }
                        </button>

                </form>
                <div className=" text-cyan-600">
                    <Link to={"/login"}>
                            Back To Login
                    </Link>
                </div>
            </div>)
        }
      </div>
    </div>
  );
};

export default ForgotPassword;
