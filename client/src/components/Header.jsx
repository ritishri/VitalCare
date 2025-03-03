import React from 'react'
import { assets } from '../assets/assets'

function Header() {
  return (
    <div className='flex md:flex-row flex-wrap bg-primary rounded-lg px-10 md:px-10 lg:px-20 h-[500px] overflow-hidden items-center justify-between'>
        {/* ...leftside..*/}

        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-20 m-auto md:py-[10w] md:mb-[-30px]'>
            <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                Book Appointment <br/> With Trusted Doctors 
            </p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                <img src={assets.group_profiles} alt=""/>
                <p className='pb-18'>
                  Simply browse through our extensive list of trusted doctors,<br className='hidden sm:block'/> schedule your appointment hassle-free.  
                </p>
            </div>
            <a className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 ' href="#speciality">Book Appointment <img className='w-3' src={assets.arrow_icon}/> </a>
        </div>

        {/* ...rightside */}

        <div className='md:w-1/2 relative h-full'>
           <img className='w-full absolute bottom-0 h-auto rounded-lg object-cover' src={assets.header_img}/>
        </div>
    </div>
  )
}

export default Header