import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Services/operations/AuthAPI";
import loginImage from "../Assets/FrontPage/login.png"

const Login = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setformData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <div className="h-[calc(100vh-4.999rem)] flex justify-between">
        <div className=" text-white w-[50%] flex justify-center items-center h-[100%] flex-col gap-3">
          <form onSubmit={handleSubmit} className=" flex flex-col gap-10 items-center justify-center  bgBlur p-28">
            <div className=" flex flex-col gap-10">
              <div className=" flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your Email here"
                  id="email"
                  value={email}
                  onChange={changeHandler}
                  className=" text-white w-[300px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"
                />
              </div>
              <div className=" flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Enter your password here"
                  id="password"
                  value={password}
                  onChange={changeHandler}
                  className=" text-white w-[300px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"
                />
              </div>
            </div>
            <button
              type="submit"
              className="p-3 border border-white rounded-2xl btnColor font-bold px-5 flex gap-5 items-center w-fit"
            >
              Submit
            </button>
          </form>
          <div>
            <Link to={"/forgot-password"} className=" text-cyan-500">
              Forgot Password
            </Link>
          </div>
        </div>
        <div className=" w-[50%]">
            <img src={loginImage} alt="" />
        </div>
    </div>
  );
};

export default Login;
