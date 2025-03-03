import { useContext } from "react"
import Login from "./pages/login"
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from "./context/AdminContext"
import Navbar from "./components/Navbar"
import SideBar from "./components/SideBar"
import { Routes, Route, Router } from "react-router-dom"
import Dashboard from "./pages/Admin/Dashboard.jsx"
import AllApointment from './pages/Admin/AllAppointment.jsx'
import AddDoctor from "./pages/Admin/AddDoctor.jsx"
import DoctorList from "./pages/Admin/DoctorList.jsx"
import { DoctorContext } from "./context/DoctorContext.jsx"
import DoctorDashboard from "./pages/Doctor/DoctorDashboard.jsx"
import DoctorAppointment from "./pages/Doctor/DoctorAppointment.jsx"
import DoctorProfile from "./pages/Doctor/DoctorProfile.jsx"

function  App() {

  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)
  return aToken || dToken? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer/>
      <Navbar/>
      <div className="flex min-h-screen">
        <SideBar/>
         <Routes>

          {/* Admin Route */}
          <Route path="/" element={<></>}/>
          <Route path="/admin-dashboard" element={<Dashboard/>}/>
          <Route path="/all-appointment" element={<AllApointment/>}/>
          <Route path="/add-doctor" element={<AddDoctor/>}/>
          <Route path="/doctor-list" element={<DoctorList/>}/>

          {/* Doctor ROute */}

          <Route path="/doctor-dashboard" element={<DoctorDashboard/>}/>
          <Route path="/doctor-appointments" element={<DoctorAppointment/>}/>
          <Route path="/doctor-profile" element={<DoctorProfile/>}/>

         </Routes>
        
      </div>
    </div>
  ):(
    <>
     <Login/>
     <ToastContainer/>
    </>
  )
}

export default  App