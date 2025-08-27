import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';

function Contact() {
  let navigate = useNavigate();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [message, setMessage] = useState("");
  const token = localStorage.getItem("tokenkey")

  useEffect(() => {
    if (!token) {
      navigate("/login")
      toast.error("Please login")
    }
  }, [])

  function queryhandle(e) {
    e.preventDefault();
    axios.post("http://localhost:2020/query", {
      name,
      email,
      message,
    })
    navigate("/");
    toast.success("Query sent successfully")

  }
  return (
    <div className="contactpage">
      <form onSubmit={queryhandle}>
        <h1>Fill your Query</h1>
        <div className="input-container">
          <label>Name</label>
          <input type="text" placeholder="Enter your good name" onChange={(e) => { setName(e.target.value) }} />
        </div>
        <div className="input-container">
          <label>Email address</label>
          <input type="email" placeholder="name@example.com" onChange={(e) => { setEmail(e.target.value) }} />
        </div>
        <div className="input-container">
          <label>Message</label>
          <textarea rows="6" onChange={(e) => { setMessage(e.target.value) }} ></textarea>
        </div>
        <div className="input-container">
          <button type="submit" className="btnclass">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Contact
