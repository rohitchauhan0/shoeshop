import React, { useState } from "react";
import { ACCOUNT_TYPE } from "../Utils/Constants";
import Tab from "../Components/Core/Auth/Tab";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setSignupData } from "../Slices/AuthSlice";
import { sendotp } from "../Services/operations/AuthAPI";

const SignUp = () => {
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { firstName, lastName, email, password, confirmPassword } = formData;
  const [accountType, setaccountType] = useState(ACCOUNT_TYPE.CUSTOMER);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changleHandler = (e) => {
    setformData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
      return;
    }

    const signUpData = {
      ...formData,
      accountType,
    };
    dispatch(setSignupData(signUpData));
    dispatch(sendotp(formData.email, navigate));
    setformData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setaccountType(ACCOUNT_TYPE.CUSTOMER);
  };

  console.log(formData)
  const tabData = [
    {
      id: 1,
      title: "Customer",
      Type: ACCOUNT_TYPE.CUSTOMER,
    },
    {
      id: 2,
      title: "Seller",
      Type: ACCOUNT_TYPE.SELLER,
    },
  ];

  return (
    <div className=" h-[calc(100vh-4.999rem)] text-white justify-center flex  mx-auto colorBg2">
      <div className=" text-white bgBlur h-[80%] mt-5 w-[50%] p-8">
        <div className=" h-[90%]">
         <div className=" w-[50%] mx-auto"> <Tab
            tabData={tabData}
            accountType={accountType}
            setaccountType={setaccountType}
          /></div>
          <form
            onSubmit={submitHandler}
            className=" h-[100%] flex flex-col justify-between items-center mt-5"
          >
            <div className=" flex justify-between gap-10">
              <div className=" flex flex-col gap-2">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter first name"
                  required
                  value={firstName}
                  onChange={changleHandler}
                  className=" text-white w-[300px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"
                />
              </div>
              <div className=" flex flex-col gap-2">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter last name"
                  required
                  value={lastName}
                  onChange={changleHandler}
                  className=" text-white w-[300px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"
                />
              </div>
            </div>
            <div className=" flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={changleHandler}
                className=" text-white w-[300px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"
              />
            </div>
            <div className=" flex gap-8">
              <div className=" flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={changleHandler}
                  className=" text-white w-[300px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"
                />
              </div>
              <div className=" flex flex-col gap-2">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Enter Confirm password"
                  required
                  value={confirmPassword}
                  onChange={changleHandler}
                  className=" text-white w-[300px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"
                />
              </div>
            </div>
            <div className=" flex items-center justify-center">
              <button
                type="submit"
                className="p-3 border border-white rounded-2xl btnColor font-bold px-5 flex gap-5 items-center"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
