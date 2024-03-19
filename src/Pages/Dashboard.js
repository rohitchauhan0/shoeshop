import React from 'react'
import { useSelector } from 'react-redux'
import SideBar from '../Components/Core/Dashboard/SideBar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    const {loading: profileLoading} = useSelector((state)=> state.profile)
    const {loading: authLoading} = useSelector((state)=> state.auth)
    if(profileLoading || authLoading){
        return (
            <div>
                <div>
                    Loading
                </div>
            </div>
        )
    }
  return (
    <div className='relative  h-[calc(100vh-4.999rem)] flex text-white'>
        <SideBar/>
        <div className='  h-[calc(100vh-4.999rem)] overflow-auto  flex-1 container'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard