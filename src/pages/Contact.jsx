import React from 'react'
import { assets } from '../assets/assets'

function Contact() {
  return (
    <div>
      
      <div className='text-center text-2xl pt-1 text-gray-500'>
        <p>CONTACT<span className='text-gray-700 font-semibold'> US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image}/>

        <div className='flex flex-col justify-center item-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>Our Office</p>
          <p className='text-gray-500'>C68 Tulsi Nagar <br/>Korba,Chhattisgarh</p>
          <p className='text-gray-500'>Tel: (+91) 72739-73618<br/>pshri0084@gmail.com</p>
          <p className='font-semibold text-lg text-gray-600'>Careers at VITALCARE</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 '>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact