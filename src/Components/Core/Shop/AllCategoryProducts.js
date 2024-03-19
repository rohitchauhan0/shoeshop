import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiConnnector } from "../../../Services/ApiConnector";
import { productEndpPoint } from "../../../Services/AllAPI";
import { Link } from "react-router-dom";

const AllCategoryProducts = () => {
  const { GET_ALL_PRODUCT } = productEndpPoint;
  const [allProducts, setallProducts] = useState([]);
  const [productDetails, setproductDetails] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const getallproductlist = async () => {
      setloading(true);

      try {
        const response = await apiConnnector("GET", GET_ALL_PRODUCT);
        if (!response?.data?.success) {
          throw new Error("Could Not Fetch Course Categories");
        }
        setallProducts(response?.data?.data);
      } catch (error) {
        console.log("GET_ALL_CATEGORY_API API ERROR............", error);
        toast.error(error.message);
      }
      setloading(false);
    };
    getallproductlist();
  }, []);
  console.log(allProducts);

  return (
    <div className=" text-white ">
      <div className=" flex  flex-wrap justify-between gap-20">
        {allProducts.map((data) => {
          return data.Product.map((product) => {
            return (
             
              <div key={product.id} className=" w-[250px] flex flex-col justify-between gap-4 border border-cyan-500 rounded-xl p-3 hover:scale-110 transition-all duration-200">
              <Link to={`/shop/category/${product.category}/${product._id}`}>
              <img src={product?.imageUrl} alt=""  className='max-h-[250px] w-[220px]  object-cover rounded-lg'/>
              </Link>
                <p className=" font-bold">{product?.title}</p>
                <p>{product?.description}</p>
                <p className=" flex gap-2 text-yellow-400">₹ <span className=" text-gray-400 line-through"> {product.price *2  }</span>  {product?.price}</p>
              </div>
             
            );
          });
        })}
      </div>
    </div>
  );
};

export default AllCategoryProducts;
