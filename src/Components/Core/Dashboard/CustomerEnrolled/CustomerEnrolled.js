import React, { useEffect, useState } from "react";
import { productEndpPoint } from "../../../../Services/AllAPI";
import { apiConnnector } from "../../../../Services/ApiConnector";

const CustomerEnrolled = () => {
  const { GET_USER_ENROLLED_DETAILS } = productEndpPoint;
  const [userDetails, setuserDetails] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const userEnrolled = async () => {
      setloading(true);
      try {
        const response = await apiConnnector("GET", GET_USER_ENROLLED_DETAILS);
        if (response.data.data) {
          setuserDetails(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    };
    userEnrolled();
  }, []);
  console.log(userDetails);

  return (
    <div className=" text-white">
      <div className=" flex flex-col gap-8">
        {userDetails.map((data) => {
          return (
            <div className=" flex justify-between">
              <div className=" flex items-center">
                <img src={data.imageUrl} alt="" className=" w-[130px]" />
                <p>{data.title}</p>
                <p>{data.price}</p>
              </div>
              <div>
                {data.userEnrolled.map((details) => (
                  <div key={details.id}>
                    <p>
                      {details.firstName} {details.lastName}
                    </p>
                    <p>{details.additionalDetails.address}</p>
                    <p>{details.additionalDetails.phoneNum}</p>
                  </div>
                ))}
              </div>
                <div className=" flex gap-3  items-center justify-center">
                  <button className=" p-2 bg-red-700 rounded-lg h-fit">shipped</button>
                  <button className=" p-2 bg-yellow-700 rounded-lg h-fit">Delivered</button>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerEnrolled;
