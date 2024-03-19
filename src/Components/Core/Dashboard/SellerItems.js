import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteProduct, getSellerItems } from '../../../Services/operations/Product'
import { productEndpPoint } from '../../../Services/AllAPI'
import { apiConnnector } from '../../../Services/ApiConnector'
import toast from 'react-hot-toast'

const SellerItems = () => {
    const {DELETE_PRODUCT} = productEndpPoint
    const {token}= useSelector((state)=> state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [product, setproduct] = useState([])
    const [loading, setloading] = useState(false)
    
    const handleDelete = async(productId)=>{
        setloading(true)
        try {
            await apiConnnector("DELETE", DELETE_PRODUCT, {productId}, {
                Authorization : `Bearer ${token}`
            })
            toast.success("Product deleted")
          } catch (error) {
            console.log(error)
            toast.error("Could not delete")
          }
          setloading(true) 
    }

    useEffect(() => {
      const getSellerProducts = async()=>{
        const result = await getSellerItems(token)
        if(result){
            setproduct(result)
        }
        console.log(result)
      }
      getSellerProducts()
    }, [])
    

    
    


  return (
    <div className=' text-white'>
        <div className=' flex flex-col gap-5 '>
            {
                product.map((data)=>{
                    return <div className=' flex flex-row items-center gap-8 justify-between border border-cyan-500 px-4 rounded-lg p-3' key={ data._id}>
                        <img src={data.imageUrl} alt="seller image" className='max-h-[250px] w-[220px]  object-cover rounded-lg' />
                        <div className=' flex flex-col gap-7' >
                            <p className=' text-xl text-red-600'>{data?.title}</p>
                            <p className=' text-sm'>{data?.description}</p>
                            <p className=' text-xl'>  <span className=' text-yellow-400'>₹ </span>{data?.price}</p>
                            <p className=' text-xl font-bold'>{data?.category?.name}</p>
                        </div>
                        <div className=' flex gap-8'>
                            <button className=' w-fit p-2 rounded-xl bg-yellow-500 px-4 '>Edit</button>
                            <button className=' w-fit p-2 rounded-xl bg-red-500 px-4 ' 
                            onClick={()=> handleDelete(data._id)}
                            >Delete</button>
                        </div>
                    </div>
                })
            }
        </div>

    </div>
  )
}

export default SellerItems