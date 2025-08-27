import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

function About() {
  const navigate = useNavigate()
  const token = localStorage.getItem("tokenkey")
  
    useEffect(() => {
      if (!token) {
        navigate("/login")
        toast.error("Please login")
      }
    }, [])
    
  return (
    <div className="aboutpage">
        <h1>About Page</h1>
        <img src='/media/images/img2.png' />
        <h2>This website is for your daily use and i secure your data from hackers and virus be comfortable with us.....</h2><br></br>
        <p>This is end to end encryptions</p>
    </div>
  )
}

export default About
