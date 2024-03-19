import React from "react";
import mainImage from "../Assets/FrontPage/blackshoerotate.png";
import ColorBtn from "../Components/Common/ColorBtn";
import { AiOutlineArrowRight } from "react-icons/ai";
import colorShoe from "../Assets/FrontPage/colorshoe.png";
import blueShoe from "../Assets/FrontPage/blueshoe.png";
import { motion } from "framer-motion";
import shopImg from "../Assets/FrontPage/user.jpg";

const Home = () => {
  return (
    <div className=" bg-black w-full mt-[20%] lg:mt-0">
      {/* section 1 */}
      <div className=" w-full h-screen text-white flex items-center justify-center">
        <div className=" flex flex-row-reverse flex-wrap lg:flex-nowrap p-3 items-center gap-10 lg:gap-0 justify-center">
          <div className=" relative z-10 ">
            <img src={mainImage} alt="Shoe pic" className="" />
          <div className="absolute colorBg w-[100%] top-28 -z-10  h-[80%]"></div>
          </div>
          <div className=" flex flex-col items-center justify-center gap-20 lg:mt-0">
            <div className="flex flex-col items-center justify-center gap-28">
              <p className=" text-[42px] uppercase font-bold text-center">
                Make your move
                <br /> more{" "}
                <span className=" text-red-400 text-[49px]">comfortable</span>
              </p>
              <p className=" text-6xl uppercase tracking-wide  font-bold textAnimate">
                S h o e S h o p
              </p>
            </div>
            <ColorBtn linkto={"/shop/all"}>
              Shop Now <AiOutlineArrowRight />
            </ColorBtn>
          </div>
        </div>
      </div>

      {/* section 2 */}
      <div className=" w-full h-screen flex flex-wrap lg:flex-nowrap justify-between text-white p-6 ">
        <div className=" h-full flex flex-col justify-between py-8 px-6 items-center">
          <motion.img
            initial={{ x: -50 }}
            whileInView={{ x: 50 }}
            transition={{ duration: 1 }}
            viewport={{ once: false }}
            className=" lg:w-[33vw] object-cover"
            src={colorShoe}
            alt="colorShoe"
          />
          <p className=" text-2xl font-bold mt-20">
            With four pairs of shoes, I can travel the world.
          </p>
          <p className=" text-xl font-bold">You have big shoes to fill.</p>
          <ColorBtn linkto={"/shop/all"} extra={"mt-5"}>
            Shop Now <AiOutlineArrowRight />
          </ColorBtn>
        </div>
        <div className=" flex items-center justify-center flex-col invisible lg:visible">
          <div className=" colorBg w-7 h-5 mt-5 rounded-full"></div>
          <div className=" colorBg w-10  h-6 mt-4 rounded-full"></div>
          <div className=" colorBg w-1 h-3/6"></div>
          <div className=" colorBg w-10  h-6 -mt-10 rounded-full"></div>
          <div className=" colorBg w-7 h-5 mt-5 rounded-full"></div>
        </div>
        <div className="h-full flex flex-col justify-between py-8 px-6 text-center items-center">
          <p className=" text-2xl font-bold">
            Keep your head, heels and standards high.
          </p>
          <p className=" text-xl font-bold">You have big shoes to fill.</p>
          <ColorBtn linkto={"/shop/all"} extra={"mt-5 mb-7"}>
            Shop Now <AiOutlineArrowRight />
          </ColorBtn>
          <motion.img
            initial={{ x: 50 }}
            whileInView={{ x: -50 }}
            transition={{ duration: 1 }}
            viewport={{ once: false }}
            className="lg:w-[30vw] "
            src={blueShoe}
            alt="colorShoe"
          />
        </div>
      </div>

      {/* section 3 */}
      <div className=" w-full h-screen flex justify-between items-center  text-white">
        <div className=" w-[50%] flex flex-col items-center justify-center gap-20">
          <h2 className=" text-[45px] font-bold">
            Good shoes take you good places.
          </h2>
          <p className=" w-[70%]">
            The customer is the most important part of our business.” “You can't
            make everyone happy, but you can please yourself.” “Do what you do
            so well that they will want to see it again and bring their friends.
          </p>
          <ColorBtn linkto={"/shop/all"} extra={"mt-5 mb-7"}>
            Shop Now <AiOutlineArrowRight />
          </ColorBtn>
        </div>
        <div className=" w-[50%] flex items-center justify-center">
          <img src={shopImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
