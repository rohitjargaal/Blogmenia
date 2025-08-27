import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backendapi } from "../../Api.jsx"
import { useNavigate } from "react-router";


function Dashbaord() {
  let [person, setperson] = useState({})
  let [vloglength, setvloglength] = useState("");
  const navigate = useNavigate()

  const token = localStorage.getItem("tokenkey")

  useEffect(() => {
    if (!token) {
      navigate("/login")
      toast.error("Please login")
    }
  }, [])

  useEffect(() => {
    axios.get(`${Backendapi}/vlogs/profile`,  {
     headers: { Authorization: `Bearer ${token}`}})
      .then((res) => {
        setperson(res.data.user)
        setvloglength(res.data.vloglength)
      }).catch((err) => {
        console.log("error", err);
      })
  }, [])

  function editprofilehandle() {
    navigate("/editprofile")
  }

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <h1 style={{ marginBottom: "2rem" }}>User Details</h1>
        <img src={person.userDP?.url} class="dashboard-image" style={{ objectFit: "cover" }} />
        <div class="content">
          <p>Username : {person.username}</p>
          <p>Email : {person.email}</p>
          <p><span><b>My vlogs :</b> {vloglength}</span></p>
          <button className="btnclass" onClick={editprofilehandle}>Edit Profile</button>
        </div>
      </div>
    </div>
  )
}
export default Dashbaord
