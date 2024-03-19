import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { resetPassword } from '../Services/operations/AuthAPI'

const UpdatePassword = () => {
    const {loading }= useDispatch((state)=> state.auth)
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formdata, setformdata] = useState({
        password:"",
        confirmPassword:""
    })

    const {password, confirmPassword} = formdata
    const handlechange = (e)=>{
        setformdata((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    
    const handleSubmit = (e)=>{
            e.preventDefault()
            let token = location.pathname.split("/").at(-1)
            dispatch(resetPassword(password, confirmPassword, token, navigate))
    }


  return (
    <div className=" text-white h-screen w-full flex items-center justify-center">
        <div className=" w-[40%] border border-cyan-400 rounded-lg colorBg2 items-center">
            {
                loading ? (<div className=" text-white text-3xl w-full flex items-center p-3">Loading</div>) : (<div className=" flex flex-col gap-5  bgBlur items-center p-4">
                        <h1 className=" font-bold text-3xl text-cyan-800">Choose a new password</h1>
                        <p className=" text-lg ">Almost Done. Enter your new password</p>
                        <form className=" flex flex-col gap-7 p-2 items-center" onSubmit={handleSubmit}>
                            <div className=" flex flex-col gap-2">
                            <p>Password</p>
                            <input type="password" name='password' id='password' value={password} onChange={handlechange}
                            className=" text-white w-[300px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"
                             />
                            </div>
                            <div className=" flex flex-col gap-2">
                            <p>Confirm Password</p>
                            <input type="password" name='confirmPassword' id='confirmPassword' value={confirmPassword} onChange={handlechange}
                            className=" text-white w-[300px] h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"
                             />
                            </div>
                            <button
              className="p-3 border border-white rounded-2xl btnColor font-bold px-5 flex gap-5 items-center w-fit"
                        >
                                Update Password
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
  )
}

export default UpdatePassword