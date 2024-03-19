import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import {IoMdArrowRoundBack} from "react-icons/io"
import { sendotp, signup } from "../Services/operations/AuthAPI";
import { Link, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { signupData, loading } = useSelector((state) => state.auth);
  const [otp, setotp] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()
        const {
            firstName,  lastName, email, password, confirmPassword, accountType
        } = signupData

        dispatch(signup(firstName,  lastName, email, password, confirmPassword, accountType, otp, navigate))
    }

    useEffect(() => {

        if(!signupData){
            navigate("/signup")
        }


    }, [])
    


  return (
    <div className=" w-full h-[calc(100vh-4.999rem)] flex justify-center items-center">
      {loading ? (
        <div className=" text-4xl text-white font-bold">Laoding......</div>
      ) : (
        <div className=" flex flex-col gap-4 items-center">
          <h1 className=" text-3xl font-bold text-white">Verify Email</h1>
          <p className=" text-xl text-white leading-[1.6rem]">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleSubmit} className=" flex flex-col items-center justify-center">
            <OTPInput
              value={otp}
              onChange={setotp}
              numInputs={6}
              renderSeparator={<span className=" w-7"> </span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                border: "2px solid #197987",
                borderRadius: "8px",
                width: "54px",
                height: "54px",
                fontSize: "22px",
                color: "black",
                fontWeight: "400",
              }}
              focusStyle={{
                border: "1px solid #197987",
                outline: "none",
              }}
            />

            <button
              type="submit"
              className="mt-6 rounded-[8px] bg-cyan-800 py-[10px] px-[12px] font-medium text-white"
            >
              Verify Email
            </button>
          </form>
          <div className=' flex justify-between'>
            <Link to={"/login"}>
                <div className=' flex gap-3 items-center'>
                <IoMdArrowRoundBack />
                <p>Back To Login</p>
                </div>
            </Link>
            <button onClick={()=> dispatch(sendotp())}>
                Resend Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
