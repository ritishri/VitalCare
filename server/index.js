import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'


// app config

const app = express()
const port  = process.env.PORT || 4000


// middlware

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// express.json act as middleware, whenever we will make any request first it passed to this method
app.use(cors()) //it will allow to connect frontend with the backend


// Mongodb connection 
const mongoURL = 'mongodb://localhost:27017/vitalCare'
mongoose.connect(mongoURL)
const db = mongoose.connection

db.on('connected',()=>{
    console.log('Connected to mongodb successfully');
    
})

db.on('error',(err)=>{
    console.error('MongoDb connection error: ',err)
})

connectCloudinary()


// api end points

app.use('/api/admin',adminRouter)
// localhost:4000/api/admin
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)



app.get('/', (req,res)=>{
    res.send("API WORKING")
})
 
app.listen(port,()=>
    console.log("Server Started at port:",port)
)