"use client"

import { Header } from "@/components/ui/Header/header";
import { FaArrowRight, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import imagePortfolio from "../public/image/sidePicture1.png"
import Image from "next/image";

const Home = () => {

  return (
    <div className="w-full">
      <Header />
      <div className='bg-[#FFFFFF] py-5 w-[600px] md:w-[90%] mx-auto md:mt-0 md:flex md:justify-between text-[#2F2F2F] md:top-[70px]'>
      <Image 
        src={imagePortfolio} 
        alt=""
        className=' object-cover absolute h-[350px] w-full bottom-0 md:h-screen md: md:static md:w-[30%]'  
      />
      <div className='flex justify-between md:gap-3 mx-auto md:'>
        <div className='hidden md:flex flex-col relative'>
          <p className='h-[50px] w-[50px] bg-[#FFB80E] rounded mb-6'></p>
          <div className='flex flex-col items-center relative'>
            <p className='h-[340px] w-[3px] bg-[#2F2F2F]'></p>
            <p className='h-[3px] w-[15px] bg-[#2F2F2F] absolute bottom-0 right-[10px]'></p>
          </div>
        </div>
        <div className='mx-auto w-[90%] md:w-max md:flex md:flex-col md:gap-6'>
          <h1 className='text-[32px] leading-[48px] font-bold md:leading-[75.2px] md:text-[64px]'>
            BUILD YOUR <br /> PORTFOLIO 
            WITH <br />MORE DETAILS
          </h1>
          <p className='text-[16px] leading-8 md:text-[24px] md:leading-[48px] font-normal'>
            Express your unique creativity and unveil <br />
            your design brilliance with your portfolio.
          </p>
          <button 
            className='bg-[#FFB80E] w-full rounded text-[13px] font-semibold flex items-center justify-center py-3 px-6 gap-[8px] mt-[20px] md:w-[53%]'
          ><span className='group-hover:text-[#FDFDFD]'>Start building your portfolio</span> 
            <FaArrowRight className='group-hover:text-[#FFB80E]' />
          </button>
        </div>
      </div>
      <div className='bg-[#2F2F2F] flex flex-col gap-3 md:gap-2 items-center py-[80px] px-[20px] absolute bottom-0 w-full md:p-0 md:w-0 md:bg-inherit md:static'>
        <p className='text-[#FFFFFF] font-normal text-[16px]'> Lets Work Together</p>
        <p className='h-[7px] w-[55%] mx-auto md:mx-0 md:h-[150px] bg-[#FFB80E] md:w-1 md:mt-[150px]'></p>
        <div className='text-[25px] md:text-[18px] md:bottom-0 flex md:flex-col gap-[40px] md:mt-9 text-[#FDFDFD] md:text-[#2F2F2F]'>
          <FaMessage />
          <FaLinkedin />
          <FaTwitter />
          <FaInstagram />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
