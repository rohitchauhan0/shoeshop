import React, { useState } from 'react'
import { dashboardLinks } from '../../../Data/DashboardLinks'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, matchPath, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../../Services/operations/AuthAPI'
import Modal from '../../Common/Modal'

const SideBar = () => {
    const { user }= useSelector((state)=> state.profile)
    const location = useLocation()
    const [confirmationModal, setconfirmationModal] = useState(null)

    const matchRoute = (route)=>{
        return matchPath({path:route}, location.pathname)
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()

    
    
  return (
    <>
    <div className='min-w-[220px] border-r border-white  h-[calc(100vh-4.999rem)]  text-white py-3 px-2'>
        <div className=' flex flex-col gap-3'>
            {
                dashboardLinks.map((link)=>{
                    if (user && user?.accountType !== link.accountType) return null
                    
                            return  <div className=' text-white' key={ link.id}>
                                <NavLink to={link.path}>
                                <div>
                                    <p className={`${matchRoute(link.path)? "sidebarBg text-white":" text-white"} p-1`}>{link.name}</p>
                                </div>

                                </NavLink>
                            </div>
                        
                })
            }
            <div className=' h-[1px] w-full bg-white'></div>
            <div>
                <NavLink to={"/dashboard/settings"}>
                <p>Settings</p>
                </NavLink>
                <button className=' mt-4'
                    onClick={()=>{
                        setconfirmationModal({
                            text1:"Are you sure?",
                            text2:"You will be logged out of your account.",
                            btn1Text:"Logout",
                            btn2Text:"cancel",
                            btn1Handler:()=> dispatch(logout(navigate)),
                            btn2Handler:()=> setconfirmationModal(null)
                        })
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    </div>
        {confirmationModal && <Modal modalData={confirmationModal}/>}
    </>
  )
}

export default SideBar