import React, { useState } from 'react'
import { NavbarLinks } from '../Data/NavbarLinks'
import { Link, NavLink, matchPath, useLocation, useNavigate } from 'react-router-dom'
import ShoeShopLogo from "../Assets/FrontPage/shoesjoplogo.png"
import {BiSolidUserCircle} from "react-icons/bi"
import {AiOutlineShoppingCart} from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Services/operations/AuthAPI'
import { ACCOUNT_TYPE } from '../Utils/Constants'

const Navbar = () => {
    const location = useLocation()
    const matchRoute = (route)=>{
        return matchPath({path: route}, location.pathname)
    }
    
    const {token} = useSelector((state)=> state.auth)
    const {user}= useSelector((state)=> state.profile)
    const {cart, totalItems}= useSelector((state)=> state.Productcart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

  return (
    <div className=' w-full bg-transparent text-white'>
        <div className=' w-11/12 bg-transparent mx-auto lg:flex justify-between items-center z-10 py-2 hidden'>
            <img className=' bg- w-[17%]' src={ShoeShopLogo} alt="" />
            <div className=' flex  gap-6'>
                {
                    NavbarLinks.map((nav, index)=>{
                        return <ul>
                            <NavLink to={nav.path}>
                                <li className=' text-md'>{nav.title}</li>
                            </NavLink>
                        <div className={`w-full h-[2px] mt-3 transition-all duration-100 bg-white ${matchRoute(nav.path) ? " opacity-100":" opacity-0"} `}></div>
                        </ul>
                    })
                }
            </div>
            <div className=' text-white'>
                {
                     token === null &&(<div className=' flex gap-6'>
                           <Link to={"/login"}>
                           <button className=' text-white border border-white p-2 px-4 rounded-lg'>
                                LOGIN
                            </button>
                           </Link>
                            <Link to={"/signup"}>
                           <button className=' text-white border border-white p-2 px-4 rounded-lg'>
                                SIGN UP
                            </button>
                           </Link>
                    </div>)
                }
                {
                    token !== null &&(<div className=' flex gap-5 '>
                        {
                           user && user.accountType === ACCOUNT_TYPE.CUSTOMER &&(
                            <Link to={"/dashboard/cart"} className='relative'>
                            <AiOutlineShoppingCart className=' text-3xl text-cyan-700 '/>
                            <div className=' absolute -top-3 -right-2  bg-yellow-600 text-white px-2  rounded-full text-sm'>{totalItems}</div>
                           </Link>
                           )
                        }
                        {
                           <Link to={"/dashboard/my-profile"}>
                           <BiSolidUserCircle className=' text-3xl text-cyan-700'/>
                           </Link>
                        }
                        {
                           <button className=' text-white border border-white p-2 px-4 rounded-lg' onClick={()=> dispatch(logout(navigate))}>
                                Logout
                            </button>
                        }
                    </div>)
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar