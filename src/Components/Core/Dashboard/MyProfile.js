import React from "react";
import { useSelector } from "react-redux";
import logo from "../../../Assets/FrontPage/shoesjoplogo.png";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  console.log(user);
  return (
    <div>
      <div className=" w-full flex flex-col">
        <div className=" w-full flex items-center justify-center ">
          <img src={logo} alt="logo" className=" w-[40%]" />
        </div>
        <div className=" w-full flex flex-col border gap-10 border-cyan-800 px-28 py-14 rounded-lg">
          <div className=" flex justify-between w-full ">
            <div className=" flex flex-col gap-2">
              <p className=" text-lg font-bold text-cyan-500">User Name:</p>
              <div className=" flex gap-3">
                <span>{user?.firstName}</span>
                <span>{user?.lastName ? user?.lastName : ""}</span>
              </div>
            </div>

            <div className=" flex flex-col gap-2">
              <p className=" text-lg font-bold text-cyan-500">Your Email:</p>
              <p>{user?.email}</p>
            </div>
          </div>

          <div className=" flex justify-between w-full">
            <div className=" flex flex-col gap-2">
              <p className=" text-lg font-bold text-cyan-500">Your Contact no:</p>
              <p>{user?.additionalDetails?.phoneNum}</p>
            </div>
            <div>
              <p className=" text-lg font-bold text-cyan-500">Your Address</p>
              <p>{user?.additionalDetails?.address}</p>
            </div>
          </div>
          <div className=" flex flex-col gap-2">
            <p className=" text-lg font-bold text-cyan-500">Gender:</p>
            <p>
                {
                    user?.additionalDetails?.gender
                }
            </p>
          </div>
          <div className=" w-full flex justify-center mt-5">
            <Link to={"/dashboard/settings"}>
                <button className="  p-3 border border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-150">
                    Edit your profile
                </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
