import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'

function Appointment() {
  
  const {docId} = useParams() //get doc_id
  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']

  //get the doc info (all data) from context
  const {doctors,currencySymbol} = useContext(AppContext)
  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () =>{
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
    console.log(docInfo);
    
  }

  const getAvailableSlots = async () =>{
     setDocSlots([])

     //getting current date
     let today = new Date()
     let allSlots = []

     for(let i=0; i<7; i++){
       //getting date with index
       let currentDate = new Date(today)
       currentDate.setDate(today.getDate() + i)

       //setting end time of the date with index

       let endTime = new Date()
       endTime.setDate(today.getDate() + i)
       endTime.setHours(21,0,0,0)

        //setting hours

        if(today.getDate() === currentDate.getDate()){
          currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
        }else{
          currentDate.setHours(10)
          currentDate.setMinutes(0)
        }
          
        let timeSlots = []

        while(currentDate < endTime){
          let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

          //add slots to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })

          //Increment current time by 30 minutes
          currentDate.setMinutes(currentDate.getMinutes() + 30)
        }
       
        // setDocSlots(prev=>([...prev,timeSlots]))
        allSlots.push({
          date: currentDate.toDateString(),
          slots: timeSlots
        })
      }

      setDocSlots(allSlots);
   }



   useEffect(()=>{
    fetchDocInfo()
   },[doctors,docId])
 //when any one of either doctors or docId changes it will call fetchDocInfo()...this function compare the selected id with the info id and insert it in docInfo

 useEffect(()=>{
  if (docInfo) {
    getAvailableSlots();
  }
 },[docInfo])

 useEffect(()=>{
  console.log(docSlots);
 },[docSlots])

  return docInfo &&(
    <div>
       
       {/* ++++++Doctors details++++ */}

       <div className='flex flex-col sm:flex-row gap-4'>
          <div>
            <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image}/>
          </div>

          <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            {/* ++++++ DocInfo+++++ */}

            <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
              {docInfo.name} 
              <img className='w-4' src={assets.verified_icon} alt="" />
            </p>

            <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button className='py-0.5 px-2 border border-gray-500 text-xs rounded-full'>{docInfo.experience}</button>
            </div>
             {/* ++++Doc About++++ */}
             <div>
              <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
                About 
                <img src={assets.info_icon}/>
              </p>
              <p className='text-sm text-gray-500 mt-1'>{docInfo.about}</p>
             </div>

             <p className='text-gray-500 font-medium mt-4'>Appointment Fee:    <span className='text-gray-600'>{currencySymbol} {docInfo.fees}</span>
             </p>
          </div>
            

       </div>

       {/* ++++++Booking Slots++++ */}

       <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
          <p>
            Booking Slots
          </p>
          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4' >
              {
              docSlots.length > 0 ? (docSlots.map((item, index) => (
                <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>

                {/* Display the date */}
                  <p>{daysOfWeek[new Date(item.date).getDay()]}</p>
                 <p>{new Date(item.date).getDate()}</p>

                  {/* Display the slots
                  {item.slots.map((slot, slotIndex) => (
                 <p key={slotIndex}>{slot.time}</p>
                  ))} */}
            </div>
          ))
       ) : (
              <p>No slots available</p>
       )}
    </div>

    <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
  {
    docSlots.length > 0 && docSlots[slotIndex]?.slots.map((item, index) => (
      <p onClick={()=> setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
        {item.time.toLowerCase()}
      </p>
    ))
  }
</div>

<button className='bg-primary text-white gap-3 text-sm font-light px-14 py-3 rounded-full my-6'>
  Book an Appointment
</button>


   </div>

   {/* ++++++ listing related doc */}
   <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
</div>
  )
}

export default Appointment