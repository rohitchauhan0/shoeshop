import React from "react";
import ContactFrom from "../Components/Core/Contact/ContactFrom";

const ContactUs = () => {

  return (
    <div className=" w-full h-[calc(100vh-4.999rem)] text-white flex">
      <div className=" w-[50%] flex items-center justify-center">
        <div className=" flex flex-col items-center justify-between  border border-white w-fit p-20 gap-10  rounded-xl colorBg1">
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-lg font-semibold text-yellow-400 ">
              Chat on us
            </h2>
            <p className="font-medium">Our friendly team is here to help.</p>
            <p className="font-semibold">shoeshop8979@gmai.com</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-lg font-semibold text-yellow-400 ">Visit us</h2>
            <p className="font-medium">Come and say hello at our office HQ.</p>
            <p className="font-semibold">Baghpat, U.P. 250609</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-lg font-semibold text-yellow-400 ">Call us</h2>
            <p className="font-medium">Mon - Fri From 8am to 5pm</p>
            <p className="font-semibold">+123 456 7869</p>
          </div>
        </div>
      </div>
      <div className=" w-[50%] h-fit">
        <ContactFrom />
      </div>
    </div>
  );
};

export default ContactUs;
