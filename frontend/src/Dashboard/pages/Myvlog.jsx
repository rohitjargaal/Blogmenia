import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Backendapi } from '../../Api.jsx';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';


function Myvlog() {
  const [userVlogs, setUserVlogs] = useState([]);
  const navigate = useNavigate()
    const token = localStorage.getItem("tokenkey")

 useEffect(() => {
    if (!token) {
      navigate("/login")
      toast.error("Please login")
    }
  }, [])

  useEffect(() => {
    axios.get(`${Backendapi}/vlogs/my`, {
     headers: { Authorization: `Bearer ${token}`}}
    )
    .then((res) => {
        console.log(res)
        setUserVlogs(res.data.vlogs)
      }).catch((err) => {
        console.log("error is here", err)
      })
  }, [])
  return (
    <div className="myvlog">
      <h2 style={{ textAlign: "center" }}>My Vlogs</h2>
      {userVlogs.length == 0 ?
        <img className='vlognotfound' src='media/images/vlognotfound.png' />
        :
        <div className="card-group">
          {userVlogs.map((vlog) => (
            <a href={`/vlogs/${vlog._id}`} key={vlog._id} className='card-links'>
              <div className="card">
                <img src={vlog.image.url} className="card-image " alt="image error" />
                <div className="card-content">
                  <p>{vlog.title}</p>
                  <p>Location : {vlog.location}</p>
                </div>
              </div>
            </a>
          ))}
        </div>}
    </div>


  )
}

export default Myvlog
