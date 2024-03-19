import React, { useEffect, useState } from 'react'
import { productEndpPoint } from '../../../../Services/AllAPI'
import { apiConnnector } from '../../../../Services/ApiConnector'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const PurchasedItems = () => {
    const {GET_PRODUCT_BUY_DETAILS} = productEndpPoint
    const [product, setproduct] = useState([])
    const [loading, setloading] = useState(false)
    const {token} = useSelector((state)=> state.auth)


    useEffect(() => {
        const getProduct = async()=>{
            setloading(true)
            try {
                const response = await apiConnnector("GET", GET_PRODUCT_BUY_DETAILS, null, {
                    Authorization : `Bearer ${token}`
                })
                if(response){
                    setproduct(response?.data?.data)
                }
                
            } catch (error) {
                console.log(error)
            }
            setloading(false)
        }
        getProduct()
    }, [])
    console.log(product)
    
  return (
    <div className=' text-white'>
    <div className=" flex  flex-wrap justify-between gap-20">
        {
            product.map((product)=>{
              return  <div key={product.id} className=" w-[250px] flex flex-col justify-between gap-4 border border-cyan-500 rounded-xl p-3 hover:scale-110 transition-all duration-200">
              <img src={product?.imageUrl} alt=""  className='max-h-[250px] w-[220px]  object-cover rounded-lg'/>
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

export default PurchasedItems