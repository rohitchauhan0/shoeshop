import React, { useEffect, useState } from 'react'
import { getAllCategory } from '../../../Services/operations/Product'
import { useDispatch } from 'react-redux'
import { apiConnnector } from '../../../Services/ApiConnector';
import { productEndpPoint } from '../../../Services/AllAPI';
import toast from 'react-hot-toast';
import { Link, matchPath, useLocation } from 'react-router-dom';

const SidebarLinks = () => {
    const { GET_ALL_CATEGORY_API} = productEndpPoint;

    const [category, setcategory] = useState([])
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()
    const location = useLocation()
    useEffect(() => {
      const getallcategories = async()=>{
        setloading(true);

        try {
          const response = await apiConnnector("GET", GET_ALL_CATEGORY_API);
          if (!response?.data?.success) {
            throw new Error("Could Not Fetch Course Categories");
          }
          setcategory(response?.data?.data);
        } catch (error) {
          console.log("GET_ALL_CATEGORY_API API ERROR............", error);
          toast.error(error.message);
          
        }
        setloading(false);
    
      }
      getallcategories()
    }, [])
    const matchRoute = (route)=>{
      return matchPath({path:route}, location.pathname)
  }
    
  return (
    <div className='min-w-[220px] border-r border-white  h-[calc(100vh-4.999rem)]  text-white py-3 px-8'>
        <div className=' flex flex-col gap-8'>
            <Link to={"/shop/all"} >
                <p>All</p>
            </Link>
            {
              category.map((data)=>{
                return <Link to={`/shop/category/${data._id}`}>
                    {data.name}
                </Link>
              })
            }

        </div>
    </div>
  )
}

export default SidebarLinks