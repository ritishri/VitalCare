import React from 'react'
import { assets } from '../assets/assets'

function About() {
  return (
    <div>
       
       <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
       </div>

       <div className='my-10 flex flex-col md:flex-row gap-12'>
         <img className='w-80 h-80 rounded-md shadow-md ' src={assets.about_image}/>
         {/* try___object-cover */}
         <div className='flex flex-col justify-center gap-4 md:w-2/4 text-sm text-gray-600'>
           <p>Welcome to VitalCare. Your Trusted Partner in Managing Your Healthcare Needs Conveniently And Efficiently. At VitalCare , We Understand Individual Face When Its Comes To Scheduling Doctor Appointments And Managing Their Health Records.</p>
           <p>VitalCare Is Commited To Excellence In Helthcare Technology. We Continuously Strive To Enhance And Deliver Superior Service.Whether You're Booking Your First Appointment Or Managing Ongoing Care. VitalCare is Here To Support You In Every Step Of The Way.</p>
           <b className='text-gray-800'>Our Vision</b>
           <p>Our Vision At VitalCare Is To Create A Seamless Healthcare Experience For Every User. We Aim To Bridge The Gap Between Patients And Healthcare Providers.Making It Easier For You To Access The Care You Need. When You Need It.</p>
         </div>
       </div>
    </div>
  )
}

export default About