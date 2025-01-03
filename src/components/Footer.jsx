import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div className='md:mx-10'>
       <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        
        {/* ++++++++Left section++++ */}
        <div className='mb-5 w-82'>
           <img src={assets.logo}/>
           <p className='w-full mt-4 md:w-2/3 text-gray-600 leading-6'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus qui temporibus quod labore, aspernatur esse rem, odio placeat reiciendis optio in tenetur? Id exercitationem beatae assumenda omnis accusantium! Assumenda, consectetur?</p>
        </div>

        {/* ++++++++Center section++++ */}
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        {/* ++++++++Right section++++ */}
        <div>
           <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+91 78348 2319</li>
                <li>vitalcare247@gmail.com</li>
            </ul>
        </div>

       </div>

        {/* ++++++++copyright+++++++ */}
       <div>
         <hr/>
         <p className='py-5 text-sm text-center'>Copyright 2024@ Vitalcare- All Right Reserved.</p>
       </div>  
    </div>
  )
}

export default Footer