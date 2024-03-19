import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { apiConnnector } from "../../../Services/ApiConnector";
import { contactusEndpoint } from "../../../Services/AllAPI";
import toast from "react-hot-toast";

const ContactFrom = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitSuccessful },
    getValues,
  } = useForm();
  const [Loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onSumbit = async (data) => {
    try {
      setLoading(true);
      const response = await apiConnnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );
      toast.success("Message send successfully")
      console.log(response);
      setLoading(false);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(isSubmitSuccessful){
        reset({
            firstName: "",
                lastName: "",
                email: "",
                message: "",
                phoneNum: "",
        })
    }
    
  }, [reset, isSubmitSuccessful])
  

  return (
    <div>
      <form onSubmit={handleSubmit(onSumbit)} className=" flex flex-col items-center  gap-4 px-5 ">
        <div className=" flex  items-center  gap-3">
          <div className=" flex items-start flex-col gap-3">
            <label htmlFor="firstName" className=" text-xl ">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              {...register("firstName", { required: true })}
              placeholder="Enter Your First Name here"
              className=" text-white w-[300px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"
            />
            {errors.firstName && <span>Please enter Your name</span>}
          </div>
          <div className=" flex items-start flex-col gap-3">
            <label htmlFor="lastName" className=" text-xl ">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              {...register("lastName", { required: true })}
              placeholder="Enter Your Last Name here"
              className=" text-white w-[300px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"
            />
          </div>
        </div>
        <div className=" flex  flex-col  gap-3">
          <label htmlFor="email" className=" text-xl ">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            {...register("email", { required: true })}
            placeholder="Enter Your Email here"
            className=" text-white w-[500px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"
          />
          {errors.email && <span>Please enter Email </span>}
        </div>
        <div className=" flex  flex-col gap-3">
          <label htmlFor="phoneNum" className=" text-xl ">
            Phone number
          </label>
          <input
            type="text"
            name="phoneNum"
            id="phoneNum"
            {...register("phoneNum", { required: true })}
            placeholder="Enter Your Phone number here"
            className=" text-white w-[500px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"
          />
          {errors.phoneNum && <span>Please enter Phone number </span>}
        </div>
        <div className=" flex  flex-col gap-3">
          <label htmlFor="message" className=" text-xl ">
            Enter your message
          </label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            placeholder="Enter Your message here"
            {...register("message", { required: true })}
            className=" text-white w-[500px] min-h-[220px] px-3 py-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"
          />
          {errors.message && <span>PLease enter your message.</span>}
        </div>
            <div className=" w-full flex items-center justify-center">
            <button type="submit" className="p-3 border border-white rounded-2xl btnColor font-bold px-5 flex gap-5 items-center">
                Send message
            </button>
            </div>

      </form>
    </div>
  );
};

export default ContactFrom;
