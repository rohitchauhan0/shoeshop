import React from 'react'

const Modal = ({modalData}) => {
  return (
    <div className=' fixed inset-1 backdrop-blur-sm z-[1000] !mt-0 grid place-items-center  '>
        <div className=' p-7 border border-cyan-400 py-14 rounded-lg colorBg2 flex flex-col gap-14 '>
            <div className=' flex items-center justify-center flex-col gap-2'>
            <p className=' text-2xl text-red-500'>{modalData.text1}</p>
            <p>{modalData.text2}</p>
            </div>
            <div className=' flex justify-between items-center'>
                <button onClick={()=> modalData.btn1Handler()} className=' p-4 border-2 border-cyan-400 rounded-lg bg-black text-white hover:bg-cyan-500 transition-all duration-200'>
                        {modalData.btn1Text}
                </button>
                <button onClick={()=> modalData.btn2Handler()} className=' p-4 border-2 border-cyan-400 rounded-lg hover:bg-cyan-500 transition-all duration-200'>
                                {modalData.btn2Text}
                </button>
            </div>
        </div>
    </div>
  )
}

export default Modal