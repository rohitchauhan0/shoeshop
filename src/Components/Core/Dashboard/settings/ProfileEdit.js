import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../../../Services/operations/ProfileAPI";
import { setUser } from "../../../../Slices/Profile";

const ProfileEdit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  console.log(user)

  const onSubmit = async(data)=>{
        try {
            dispatch(editProfile(token, data))
            
        } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
        }
  }


  return (
    <div className=" w-full  border border-cyan-800 px-28 py-14 rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  gap-10 items-center">
        <div className=" flex justify-between w-full ">
          <div className=" flex flex-col gap-2">
            <label htmlFor="firstName" className=" text-lg font-bold text-cyan-500">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter your first name"
              {...register("firstName", { required: true })}
              defaultValue={user?.firstName}
              className=" text-white w-[300px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"

            />
          </div>
          <div className=" flex flex-col gap-2">
            <label htmlFor="lastName" className=" text-lg font-bold text-cyan-500">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter your last name"
              {...register("lastName", { required: true })}
              defaultValue={user?.lastName}
              className=" text-white w-[300px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"

            />
          </div>
        </div>
        <div className=" flex justify-between w-full ">
          <div className=" flex flex-col gap-2">
            <label htmlFor="email" className=" text-lg font-bold text-cyan-500">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              defaultValue={user?.email}
              className=" text-white w-[300px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"

            />
          </div>
          <div className=" flex flex-col gap-2">
            <label htmlFor="phoneNum" className=" text-lg font-bold text-cyan-500">Contact number</label>
            <input
              type="text"
              id="phoneNum"
              placeholder="Enter your contact number"
              {...register("phoneNum", { required: true })}
              defaultValue={
                user?.additionalDetails?.phoneNum
                  ? user?.additionalDetails?.phoneNum
                  : ""
              }
              className=" text-white w-[300px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"

            />
          </div>
        </div>
        <div className=" flex justify-between w-full ">
          <div className=" flex flex-col gap-2">
            <label htmlFor="address" className=" text-lg font-bold text-cyan-500">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Enter your address"
              {...register("address", { required: true })}
              defaultValue={
                user?.additionalDetails?.address
                  ? user?.additionalDetails?.address
                  : ""
              }
              className=" text-white w-[300px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"

            />
          </div>
          <div className=" flex flex-col gap-2">
            <label htmlFor="gender" className=" text-lg font-bold text-cyan-500">Gender</label>
            <input
              type="text"
              id="gender"
              placeholder="Enter your gender"
              {...register("gender", { required: true })}
              defaultValue={
                user?.additionalDetails?.gender
                  ? user?.additionalDetails?.gender
                  : ""
              }
              className=" text-white w-[300px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"

            />
          </div>
        </div>
        <div>
          <button
            className="  p-3 border border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-150"
            type="submit"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
