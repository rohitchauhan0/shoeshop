import React from 'react'
import SidebarLinks from "../Components/Core/Shop/SidebarLinks"
import { Outlet } from 'react-router-dom'

const ShopPage = () => {


  return (
    <div className='relative  h-[calc(100vh-4.999rem)] flex text-white'>
        <SidebarLinks/>
    <div className='  h-[calc(100vh-4.999rem)] overflow-auto  flex-1 container'>
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
            <Outlet/>
        </div>
    </div>
</div> 
  )
}

export default ShopPage