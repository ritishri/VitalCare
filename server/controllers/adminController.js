import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay';
import userModel from '../models/userModel.js'




// Api for adding doctors

const addDoctor  = async(req,res) =>{

    try {
        
        const {name,email, password, speciality, degree, experience, about, fees, address} = req.body
        const imageFile = req.file
    


        console.log({name, email, password, speciality, degree, experience, about, fees, address},imageFile);


        // Checking for all data to add doctors
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false, message: "Missing Details"})
        }

        // Validating email format

        if(!validator.isEmail(email)){
            return res.json({success:false, message: "Please enter a valid email"}) 
        }

        // validating strong password

        if(password.length < 8){
            return res.json({success:false, message: "Please enter a strong password"})  
        }

        if (!imageFile) {
            return res.json({ success: false, message: "Please upload an image" });
        }


        // Generating salt to hash the password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        const doctorData  = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true, message:"Doctor added"})
    
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}


// Api for admin login

const loginAdmin = async(req,res) =>{
    try {
        const {email,password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ){
            
            // const token  = jwt.sign(email + //password,process.env.JWT_SECRET)
            const token = jwt.sign({ email: process.env.ADMIN_EMAIL }, process.env.JWT_SECRET, { expiresIn: '1h' });


            res.json({success:true, token})
        }else{
            res.json({success:false,message:"Invalid Credential"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
       
    }
}

//API to get all doctor list for admin panel

const allDoctors = async (req,res) =>{
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// API to get all appointment list

const appointmentsAdmin = async(req, res) =>{
    
    try {
        
        const appointments = await appointmentModel.find({})
        res.json({success:true, appointments})

    } catch (error) {
        console.log(error);
        res.json({succcess:false,message:error.message})
        
    }
}

//API to cancel the appointments

const appointmentCancel = async (req, res) => {
    try {
      const {appointmentId } = req.body;
  
      const appointmentData = await appointmentModel.findById(appointmentId);

  
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
  
      // Releasing doc slot
  
      const { docId, slotDate, slotTime } = appointmentData;
  
      const doctorData = await doctorModel.findById(docId);
  
      let slots_booked = doctorData.slots_booked;
  
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (e) => e !== slotTime
      );
  
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
  
      res.json({ success: true, message: "Appointments Cancelled" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
  const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  
  // API to make payment of appointment using razorpay
  
  const paymentRazorPay = async (req, res) => {
    try {
      const { appointmentId } = req.body;
      const appointmentData = await appointmentModel.findById(appointmentId);
  
      if (!appointmentData || appointmentData.cancelled) {
        return res.json({
          success: false,
          message: "Appointment cancelled or not found",
        });
      }
  
      //Creating options for razorpay payment
  
      const options = {
        amount: appointmentData.amount * 100,
        currency: process.env.CURRENCY,
        receipt: appointmentId,
      };
  
      //Creation of an Order
  
      const order = await razorpayInstance.orders.create(options);
  
      res.json({ success: true, order });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };


  //API to get dashboard data for admin panel

  const adminDashboard = async (req,res) =>{

    try {
      
      const doctors = await doctorModel.find({})
      const users = await userModel.find({})
      const appointments = await appointmentModel.find({})

      const dashData = {
        doctors: doctors.length,
        appointments : appointments.length,
        patients: users.length,
        latestAppointments: appointments.reverse().slice(0,5)

      }

      res.json({success:true,dashData})


    } catch (error) {
      console.log(error)
    }
  }



export {addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel,adminDashboard}