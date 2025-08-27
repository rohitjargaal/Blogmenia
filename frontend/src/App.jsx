import React from 'react'
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import "./index.css"
import "./responsive.css"
import Homepage from "./Landingpage/Pages/Homepage"
import About from "./Landingpage/Pages/About"
import Contact from "./Landingpage/Pages/Contact"
import Signup from "./Signup"
import Login from "./Login"
import Dashbaord from "./Dashboard/pages/Dashbaord"
import Addnewvlog from "./Dashboard/pages/Addnewvlog"
import Myvlog from "./Dashboard/pages/Myvlog"
import VlogDetail from "./Dashboard/pages/VlogDetail"
import EditVlog from "./Dashboard/pages/EditVlog"
import Editprofile from "./Dashboard/pages/Editprofile"
import Navbar from './compnents/Navbar'
import Footer from './compnents/Footer'
import axios from 'axios'
axios.defaults.withCredentials = true;



function App() {
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return (
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    )
  } else {
    return (
      <>
        <Navbar />
        <div className="body-elements">
          <Routes>
            <Route path='/' element={<Navigate to="/login" replace />} />
            <Route path='/home' element={<Homepage />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/dashboard' element={<Dashbaord />} />
            <Route path='/create' element={<Addnewvlog />} />
            <Route path='/myvlog' element={<Myvlog />} />
            <Route path="/vlogs/:id/" element={<VlogDetail />} />
            <Route path="/vlogs/:id/edit" element={<EditVlog />} />
            <Route path="/editprofile" element={<Editprofile />} />
          </Routes>
        </div>
        <Footer />
      </>
    )
  }

}

export default App
