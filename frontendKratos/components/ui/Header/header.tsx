
import Link from 'next/link'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

export const Header = () => {
  const [ clicked, setClicked ] = useState(false)

  const handleClick = () => {
    setClicked(!clicked)
  }
  return (
    <div className='md:bg-[#FDFDFD] md:drop-shadow-lg md:py-3 md:px-3'>
      <div className='flex justify-between items-center w-[90%] mx-auto'>
        <h1 className='flex items-center italic text-[#2F2F2F] font-semibold text-[24px] md:px-2 md:py-2'>
          <span 
            className='bg-[#FFB80E] h-[50px] w-5 inline-block md:hidden'
          ></span>
          <span 
            className='inline-block cursor-pointer'
          >Blinnk</span>
          <span 
            className='bg-[#FFB80E] h-6 w-1 inline-block'
          ></span>
        </h1>

       
        <FaBars
          onClick={handleClick}
          className='md:hidden text-[20px] font-semibold'
        />
         
        <ul 
          className= 'hidden text-[#2F2F2F] md:flex font-normal md:bg-[#FDFDFD] text-[16px] gap-4'
        >
          <li 
            className='hover:bg-[#FDFDFD] mt-[60px] inline-block cursor-pointer md:px-3 md:py-3 md:mt-0'
          >
            <Link href='/login'>Login</Link>
          </li>
          <button 
            className='inline-block cursor-pointer border border-[#FFB80E] rounded-md md:px-3 md:py-3'
          >Create an Account</button>
        </ul>
      </div>
      <ul 
        className={`${clicked ? 'transform translate-x-0' : 'transform translate-x-full' } text-[#2F2F2F] bg-[#FFB80E] z-10 transition-transform ease-in-out duration-300 font-normal flex flex-col text-center absolute top-0 w-[50%] h-screen right-0 md:hidden`}
      >
        <FaTimes 
          className='text-[20px] font-semibold absolute top-4 right-4 md:hidden'
          onClick={handleClick}
        />
        <li className=''><Link href='/login'>Login</Link></li>
        <li className='hover:bg-[#FDFDFD] cursor-pointer'><Link href='/registration'>Register</Link></li>
      </ul>
    </div>
  )
}
