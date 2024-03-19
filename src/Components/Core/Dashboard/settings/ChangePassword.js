import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword } from '../../../../Services/operations/ProfileAPI'

const ChangePassword = () => {
    const {register, handleSubmit, setValue, formState, getValues}= useForm()
    const {token} = useSelector((state)=> state.auth)
    const dispatch = useDispatch()

    const onSubmit = async(data)=>{
        try {
            dispatch(updatePassword(token, data))
            
        } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
            
        }
    }


  return (
    <div className=" w-full  border border-cyan-800 px-28 py-14 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  gap-10 items-center">
        <div className=" flex justify-between w-full ">
        <div className=" flex flex-col gap-2">
        <label htmlFor="oldPassword">Old Password</label>
            <input
              type="text"
              id="oldPassword"
              placeholder="Enter your first name"
              {...register("oldPassword", { required: true })}
              className=" text-white w-[300px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"

            />
          </div>
          <div className=" flex flex-col gap-2">
        <label htmlFor="newPassword">New Password</label>
            <input
              type="text"
              id="newPassword"
              placeholder="Enter your first name"
              {...register("newPassword", { required: true })}
              className=" text-white w-[300px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"

            />
          </div>
        </div>
          <button
            className="  p-3 border border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-150"
            type="submit"
          >
            Update Password
          </button>
        </form>
    </div>
  )
}

export default ChangePassword