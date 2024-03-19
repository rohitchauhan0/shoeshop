import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiConnnector } from '../../../Services/ApiConnector'
import { productEndpPoint } from '../../../Services/AllAPI'
import toast from 'react-hot-toast'

const CategoryPages = () => {
  const {GET_ALL_CATEGORY_PAGE_DETAILS} = productEndpPoint
  console.log(GET_ALL_CATEGORY_PAGE_DETAILS)
    const {categoryId} =  useParams()
    const [loading, setloading] = useState(false)
    const [categorydata, setcategorydata] = useState([])
    console.log("category",categoryId)
    
    useEffect(() => {
      const getcategoryPageData = async()=>{
        setloading(true)
        try {
          const response = await apiConnnector("POST", GET_ALL_CATEGORY_PAGE_DETAILS, {categoryId})
          setcategorydata(response?.data?.data?.Product)
          
        } catch (error) {
            console.log("ERROR IN GET_ALL_CATEGORY_PAGE_DETAILS API", error)
        }
        setloading(false)
      }
      getcategoryPageData()
    }, [categoryId])
    

    // console.log("category", categorydata)
    
    

        
  return (
    <div>
        <div className=" flex  flex-wrap justify-between gap-20">
          {
            categorydata.map((product)=>{
              return <div key={product._id} className=" w-[250px] flex flex-col justify-between gap-4 border border-cyan-500 rounded-xl p-3 hover:scale-110 transition-all duration-200">
              <Link to={`/shop/category/${product.category}/${product._id}`} >
              <img src={product?.imageUrl} alt=""  className='max-h-[250px] w-[220px]  object-cover rounded-lg'/>
              </Link>
                <p className=" font-bold">{product?.title}</p>
                <p>{product?.description}</p>
                <p className=" flex gap-2 text-yellow-400">₹ <span className=" text-gray-400 line-through"> {product.price *2  }</span>  {product?.price}</p>
              </div>
            })
          }
        </div>
    </div>
  )
}

export default CategoryPages