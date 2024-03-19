import React from 'react'
import { buyProduct } from '../../../Services/operations/Payment'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const PaymentModal = ({btnHandler}) => {
    const {token}= useSelector((state)=> state.auth)
    const {user}= useSelector((state)=> state.profile)
    const {productId} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
   
  return (
    <div className=' fixed inset-1 backdrop-blur-sm z-[1000] !mt-0 grid place-items-center'>
    <div className=' p-7 border border-cyan-400 py-14 rounded-lg colorBg2 flex flex-col gap-14 '>
        <button>
            Cash On Delivery
        </button>
        <button onClick={()=>
        buyProduct(token, [productId],navigate, dispatch, user)}>
            Online Payment
        </button>
        <button onClick={()=> btnHandler.btnHandler() }>
            cancel
        </button>
    </div>

    </div>
  )
}

export default PaymentModal