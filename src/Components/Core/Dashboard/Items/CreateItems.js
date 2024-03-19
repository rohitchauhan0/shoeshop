import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createProduct,
} from "../../../../Services/operations/Product";
import { apiConnnector } from "../../../../Services/ApiConnector";
import { productEndpPoint } from "../../../../Services/AllAPI";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../../../Slices/Product";
import { useNavigate } from "react-router-dom";



const CreateItems = () => {
  const { GET_ALL_CATEGORY_API} = productEndpPoint;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();
  const [loading, setloading] = useState(false);
  const [productcategory, setcategory] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const getCategories = async () => {
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

  };

  useEffect(() => {
    getCategories();
  }, []);

  const onSubmit = async(data)=>{
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("price", data.price)
    formData.append("category", data.category)
    formData.append("thumbnailImage", data.image)
    
    
    setloading(true)
    try {
      const result = await createProduct(formData, token)
      console.log("result", result)
      if(result){
        dispatch(setProduct(result))
        navigate("/dashboard/your-items")
      }
      
    } catch (error) {
      console.log(error)
    }
    setloading(false)


  }

  return (
    <div className=" w-full ">
    <h1 className=" text-4xl font-bold">Create a new product</h1>
      <div className="flex justify-between items-center mt-7">
        {/* left */}
        <div className=" border border-cyan-400 p-7 rounded-xl w-[50%]">
          <form onSubmit={(handleSubmit(onSubmit))} className=" flex flex-col gap-8">
            <div className=" flex flex-col gap-2">
              <label htmlFor="title">Product name</label>
              <input
                type="text"
                name="title"
                id="title"
                {...register("title", { required: true })}
                placeholder="Enter Product Name"
                className=" text-white h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"
              />
              {errors?.title && <span>Product Name is required</span>}
            </div>
            <div
            className=" flex flex-col gap-2">
            <label htmlFor="description">Product description</label>

              <input
                type="text"
                name="description"
                id="description"
                {...register("description", { required: true })}
                placeholder="Enter Product description"
                className=" text-white  h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"
              />
              {errors?.description && (
                <span>Product description is required</span>
              )}
            </div>
            <div className=" flex flex-col gap-2">
            <label htmlFor="price">Product price</label>

              <input
                type="text"
                name="price"
                id="price"
                {...register("price", { required: true })}
                placeholder="Enter Product price"
                className=" text-white h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"
              />
              {errors?.price && <span>Product price is required</span>}
            </div>
            <div className=" flex flex-col gap-2">
            <label htmlFor="category">Product price</label>

              <select
                name="category"
                id="category"
                defaultValue={""}
                {...register("category", { required: true })}
                className=" text-white h-10 px-3 rounded-lg bg-transparent border border-cyan-700 shadow-md shadow-cyan-700"
              >
                <option value={""} disabled className="text-black">
                  choose a Category
                </option>
                {productcategory?.map((data, index) => {
                  return (
                    <option key={index} value={data?._id} className=" text-cyan-700 bg-black">
                      {data?.name}
                    </option>
                  );
                })}
              </select>

              {errors?.category && <span>Product category is required</span>}

            </div>
            <div>
            <ImageUpload name="image" setValue={setValue} register={register} errors={errors}/>
            </div>
              <button type="submit"
            className="  p-3 border border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-150"
              >
                submit
              </button>
          </form>
        </div>
        <div></div>
        {/* right */}
        <div>

        </div>
      </div>
    </div>
  );
};

export default CreateItems;
