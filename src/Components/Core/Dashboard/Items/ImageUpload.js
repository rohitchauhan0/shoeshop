import React, { useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const ImageUpload = ({setValue, errors,name, register}) => {
    const [preview, setpreview] = useState("")
    const [selectedFile, setselectedFile] = useState(null)

    const inputRef = useRef()

    const onDrop = (acceptedFile)=>{
        const file = acceptedFile[0]
        if(file){
            previewFile(file)
            setselectedFile(file)
        }
    }

    const {getRootProps, getInputProps}= useDropzone({
          accept: {
              'image/png': ['.png'], 
              'image/jpeg': ['.jpg', '.jpeg'] 
            },
        onDrop
    })
     

    const previewFile = (file)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = ()=>{
            setpreview(reader.result)
        }
    }

    useEffect(() => {
      register(name, {required : true})
    }, [register])
    
    useEffect(() => {
     setValue(name, selectedFile)
    }, [selectedFile, setValue])
    

  return (
    <div className=' w-full flex flex-col items-center justify-center'>
        <div>
        {
            preview ? (<div className='flex flex-col justify-between p-4'>
              <div className='border border-cyan-300 rounded-xl'>
              <img src={preview} className=' w-full object-cover max-h-[300px]'/>
              </div>
                <button type='button' onClick={()=> {
                    setpreview("")
                    setselectedFile(null)
                    setValue(name, null)
                }}>Cancel</button>
            </div>) : (
                <div {...getRootProps()} className=' w-[400px] h-[300px] flex items-center justify-center border border-cyan-500 rounded-lg'>
                    <input type='file' id={name} name={name} {...register(name, {required:true})} {...getInputProps()} ref={inputRef}/>
                    <div className=' p-2 border-y-cyan-400 bg-cyan-700 w-fit text-black rounded-xl cursor-pointer'>Upload a file</div>
                </div>
            )
        }
        {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          Product Image is required
        </span>
      )}


        </div>
    </div>
  )
}

export default ImageUpload