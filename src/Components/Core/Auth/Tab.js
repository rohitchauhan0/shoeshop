import React from 'react'

const Tab = ({tabData, accountType,setaccountType}) => {
  return (
    <div className=' flex justify-between px-1 p-1 rounded-full border border-white '>
        {
        tabData.map((data)=>{
                return <div className={` w-100%  px-14 rounded-full py-2 text-center ${accountType === data.Type ? " bg-cyan-800": ""} `} key={data.id}>
                    <button onClick={()=> setaccountType(data.Type)}>
                        {data.title}
                    </button>
                </div>
        })
    }
    </div>
  )
}

export default Tab